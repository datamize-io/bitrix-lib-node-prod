import { Activity, Contact, Item, Lead, Comment } from "../bitrix/index.js";
import { DuplicatedContactsService } from "./services/DuplicatedContactsService.js";
export class WebhookController {
    static setInstance(bitrixInstance) {
        this.bitrixInstance = bitrixInstance;
        return WebhookController;
    }
    static async entry(event) {
        const action = event.parameters.action;
        if (!action) {
            throw new Error("Webhook recebido sem action inserida.");
        }
        const serviceMap = {
            merge_duplicated_contact: "getOrMergeDuplicatedContact",
            check_opened_deals: "checkOpenedDeals",
            on_form_submit: "onFormSubmit",
        };
        const methodName = serviceMap[action];
        if (!methodName || typeof this[methodName] !== "function") {
            throw new Error("Service não encontrado para action " + action);
        }
        return await this[methodName](event.parameters);
    }
    static async getOrMergeDuplicatedContact(parameters) {
        const Service = new DuplicatedContactsService(this.bitrixInstance);
        const contactId = parameters.contact_id?.shift();
        const contactDuplications = await Service.doCheckDuplications(contactId);
        console.log("Duplicatas encontradas para o contato: " + contactDuplications);
        const comment = await this.bitrixInstance.entity(Comment);
        if (contactDuplications.length > 1) {
            await comment.setContact(contactId).setText("[b]Teste de duplicações feito:[/b]\nResultado: existia duplicatas para ele.");
            await Service.doMergeDuplications(contactDuplications);
            return true;
        }
        else {
            await comment.setContact(contactId).setText("[b]Teste de duplicações feito:[/b]\nResultado: nenhum contato encontrado.");
            console.log("Sem duplicações para o contato " + contactId);
        }
    }
    static async checkOpenedDeals(parameters) {
        // Primeiro resolve a duplicação de contatos se tiver
        WebhookController.getOrMergeDuplicatedContact(parameters);
        // Depois verifica se já possui negócios abertos
        const leadId = parameters.lead_id?.shift();
        const lead = await this.bitrixInstance.entity(Lead).get(leadId);
        const contact = await this.bitrixInstance.entity(Contact).get(lead.data.CONTACT_ID);
        const deals = await contact.getOpenedDeals();
        const dealsText = deals.map((deal) => {
            return "[URL=https://smartlink.bitrix24.com.br/crm/deal/details/" + deal.getData().ID + "/]" + deal.getData().TITLE + "[/URL]";
        });
        const textMessage = "Lead descartado pois já possuia [b]" + deals.length + " negócio(s)[/b] abertos durante a revisão: \n- " + dealsText.join("\n- ");
        if (deals.length > 0) {
            this.bitrixInstance.entity(Comment).setLead(leadId).setText(textMessage).insert();
            lead.setNewStatus("JUNK").setJunkReason("6618").update();
            console.log("[LEAD_" + leadId + "] " + textMessage);
        }
        else {
            contact.finishChats();
            lead.setNewStatus("CONVERTED").update();
            console.log("[LEAD_" + leadId + "] " + "Lead convertido.");
        }
    }
    static onFormSubmit(parameters) {
        // Primeiro resolve a duplicação de contatos se tiver
        WebhookController.getOrMergeDuplicatedContact(parameters);
        // Depois verifica se já possui negócios abertos
        const formId = parameters.entity_id?.shift();
        const formSpa = this.bitrixInstance.entity(Item).get(formId);
        const dealFields = this.CONFIG.DEAL_FIELDS;
        // Atribui o contato após resolver duplicação
        const contact = this.bitrixInstance.entity(Contact).get(formSpa.data.item.contactId);
        const deals = contact.getOpenedDeals();
        const activities = this.bitrixInstance.entity(Activity).collect({
            filter: {
                PROVIDER_ID: "CRM_WEBFORM",
                OWNER_ID: formId,
                //  COMPLETED:"N"
            },
        });
        const formResponse = activities.shift();
        const formLink = formResponse.data?.PROVIDER_PARAMS?.FORM?.LINK || null;
        const formResponseView = "https://smartlink.bitrix24.com.br/this.bitrixInstance/components/this.bitrixInstance/crm.activity.planner/slider.php?site_id=s1&sessid=f8a09ded087994169db2d3b0f3234e35&ajax_action=ACTIVITY_VIEW&activity_id=" +
            formResponse.data.ID +
            "&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER";
        const formChangeData = {
            id: formSpa.data.item.id,
            entityTypeId: 1100,
            fields: {
                ufCrm30_1744663291411: formResponseView,
                stageId: "DT1100_58:SUCCESS",
                parentId2: null, // Será preenchido se houver negócios abertos
            },
        };
        if (deals.length > 0) {
            if (formLink.includes("formulario_financiamento")) {
                const deal = deals.shift();
                const today = new Date().toLocaleString("pt-BR");
                deal.setField(dealFields["form_submit_date"], formSpa.data.item.createdTime);
                deal.update();
                console.log(formSpa);
                formChangeData.fields["parentId2"] = deal.data.ID;
                try {
                    const comment = deal.setComment("[b]Formulário recebido:[/b]\n[URL=" + formResponseView + "]" + formResponse.data.SUBJECT + "[/URL]\n[b]Data:[/b] " + today);
                    console.log(comment);
                    comment.setDeal(deal.data.ID).toPin();
                }
                catch (error) {
                    console.log("Erro nos comentários: " + error.stack);
                }
            }
        }
        else {
            formChangeData.fields["stageId"] = "DT1100_58:UC_0NTF9X";
        }
        formSpa.update(formChangeData);
    }
}
WebhookController.CONFIG = {
    STAGES_ANALISE: {
        waiting_form_response: "C2:UC_29EA94",
        waiting_doc: "C2:1",
    },
    DEAL_FIELDS: {
        form_submit_date: "UF_CRM_67E437F8DD11A",
    },
};
