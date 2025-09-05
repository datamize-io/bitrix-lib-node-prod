import { ContactBuilder } from "../../builders/crm/ContactBuilder.builder.js";
import { PhoneHelper } from "../../../helpers/phone.helper.js";
import { Duplicate, Deal } from "./index.js";
export class Contact extends ContactBuilder {
    // Atribuir ORIGIN_ID
    // getChats()
    // Finish chats
    // Restart chats
    async getDeals() {
        const id = this.getData().ID || this.getData().id;
        if (!id)
            throw Error("Não foi possível identificar o id do contato para poder filtrar os negócios do mesmo.");
        return await this.instance.entity(Deal).collect({
            filter: { contactId: id },
        });
    }
    async getByPhone(phone) {
        return await this.getByPhones([phone]);
    }
    async getByPhones(phones) {
        if (!phones || phones.length == 0)
            throw Error("Parâmetro phones é obrigatórios.");
        let phoneVariations = PhoneHelper.getAllVariationsOfSamePhones(phones);
        const ids = await new Duplicate(this.instance).findByType("CONTACT", "PHONE", phoneVariations);
        if (ids.length > 0) {
            return await this.get(ids.shift());
        }
        else {
            return undefined;
        }
    }
    async getDuplications() {
        const contactEmails = this.getData()
            .fm?.filter((d) => d.typeId == "EMAILS")
            .map((d) => d.value);
        const contactPhones = this.getData()
            .fm?.filter((d) => d.typeId == "PHONE")
            ?.map((d) => d.value);
        let phoneVariations = [];
        if (contactPhones && contactPhones.length > 0) {
            phoneVariations = PhoneHelper.getAllVariationsOfSamePhones(contactPhones);
        }
        const contactPhoneDuplications = await new Duplicate(this.instance).findByType("CONTACT", "PHONE", phoneVariations);
        const contactEmailDuplications = await new Duplicate(this.instance).findByType("CONTACT", "EMAIL", contactEmails);
        if (contactPhoneDuplications || contactEmailDuplications) {
            return contactPhoneDuplications
                .concat(contactEmailDuplications)
                .filter((d) => d)
                .sort((a, b) => b - a);
        }
        else {
            return [];
        }
    }
    async getOpenedDeals() {
        const deals = await this.getDeals();
        return deals.getData().filter((deal) => deal.getData().closed === "N");
    }
}
