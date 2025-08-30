import { Item, Comment, Contact, ContactField, Duplicate } from "../../bitrix/index.js";
import { PhoneHelper } from "../../helpers/phone.helper.js";
export class DuplicatedContactsService {
    constructor(bitrixInstance) {
        this.bitrixInstance = bitrixInstance;
    }
    /**
     * Método para mesclar contatos duplicados.
     * @param contactDuplications - Array de IDs de contatos duplicados.
     * @returns {Promise<void>} - Retorna uma Promise que resolve quando a mesclagem for concluída.
     **/
    async doMergeDuplications(contactDuplications) {
        if (contactDuplications.length < 1) {
            return;
        }
        const olderContact = contactDuplications.pop();
        await this.doTransferAllActivityToContact(olderContact, contactDuplications);
        await this.doTransferAllCRMEntitiesToContact(olderContact, contactDuplications);
        await this.doTransferAllCommentsToContact(olderContact, contactDuplications);
        await this.doTransferAllFieldsToContact(olderContact, contactDuplications);
        contactDuplications.unshift(olderContact);
        Duplicate.setInstance(this.bitrixInstance);
        const mergeResponse = await Duplicate.doMerge(contactDuplications);
        if (mergeResponse.isMergeStatus("CONFLICT")) {
            mergeResponse.getMergeEntities().forEach(async (entityId) => {
                await this.bitrixInstance.entity(Contact).delete(entityId);
            });
        }
    }
    async doCheckDuplications(contactId) {
        return await new Contact(this.bitrixInstance).get(contactId).then((contact) => {
            return contact.getDuplications();
        });
    }
    async doTransferAllCommentsToContact(olderContactId, otherContactsIds) {
        otherContactsIds.forEach(async (newContactId) => {
            const contact = new Item(this.bitrixInstance)
                .setEntityTypeId(3)
                .get(newContactId)
                .then(async (contact) => {
                return await contact.transferAllCommentsTo(olderContactId);
            });
        });
    }
    async doTransferAllActivityToContact(olderContactId, otherContactsIds) {
        otherContactsIds.forEach(async (newContactId) => {
            const contact = new Item(this.bitrixInstance)
                .setEntityTypeId(3)
                .get(newContactId)
                .then(async (contact) => {
                return await contact.transferAllActivitiesTo(olderContactId);
            });
        });
    }
    async doTransferAllCRMEntitiesToContact(olderContactId, otherContactsIds) {
        otherContactsIds.forEach(async (newContactId) => {
            const contact = new Item(this.bitrixInstance)
                .setEntityTypeId(3)
                .get(newContactId)
                .then(async (contact) => {
                return await contact.transferEntitiesTo(olderContactId);
            });
        });
    }
    async doTransferAllFieldsToContact(olderContactId, otherContactsIds) {
        const TranslatedFields = {};
        const CustomFields = await this.bitrixInstance.entity(ContactField).collect();
        CustomFields.getData().forEach((field) => {
            TranslatedFields[field.getFieldName()] = field.getData();
        });
        console.info("Transferindo campos do contato %s para o contato %s", otherContactsIds, olderContactId);
        const olderContact = await this.bitrixInstance.entity(Contact).get(olderContactId);
        // Passando por cada contato
        otherContactsIds.forEach(async (newContactId) => {
            const newContact = await this.bitrixInstance.entity(Contact).get(newContactId);
            const systemKeys = ["NAME", "LAST_NAME", "EMAIL", "PHONE", "IM"];
            const fieldKeys = Object.keys(newContact.data)
                .filter((d) => d.startsWith("UF_"))
                .concat(systemKeys);
            console.info("Alterando os campos: " + fieldKeys.join(", "));
            const changedData = {};
            const changedDataText = ["[b]Alteração do Contato " + newContactId + " para o Contato " + olderContactId + " [/b]"];
            //Passando por cada campo
            fieldKeys.forEach(function (fieldKey) {
                let newFieldValue = newContact.data[fieldKey] || "";
                let oldFieldValue = olderContact.data[fieldKey] || "";
                let newFieldValueText = newFieldValue;
                const translatedField = TranslatedFields[fieldKey] || { FIELD_NAME: fieldKey, EDIT_FORM_LABEL: fieldKey };
                if (newFieldValue.includes("DUPLICATE OF ")) {
                    newFieldValue = "";
                }
                if (fieldKey == "IM") {
                    console.info("CHAT: " + newFieldValue);
                    console.info("OLD-CHATVALUE: " + oldFieldValue);
                }
                if (("" + oldFieldValue).trim() !== ("" + newFieldValue).trim() && newFieldValue) {
                    if (!oldFieldValue) {
                        oldFieldValue = "<vazio>";
                    }
                    if (translatedField.LIST) {
                        const option = translatedField.LIST.find((bitrixField) => bitrixField.ID == newFieldValue);
                        newFieldValueText = option.VALUE || newFieldValueText;
                    }
                    if ((Array.isArray(oldFieldValue) || Array.isArray(newFieldValue)) && systemKeys.includes(fieldKey)) {
                        oldFieldValue = oldFieldValue.concat(newFieldValue);
                        newFieldValueText = newFieldValue.map((deal) => deal.VALUE).join("\n- ");
                        changedDataText.push("\n• [b]" + translatedField.EDIT_FORM_LABEL + "s acrescentados:[/b] \n- " + newFieldValueText);
                    }
                    else {
                        changedDataText.push("• [b]" + translatedField.EDIT_FORM_LABEL + ":[/b] Alterado de " + oldFieldValue + " para " + newFieldValueText);
                    }
                    changedData[translatedField.FIELD_NAME] = newFieldValue;
                }
            });
            // Atribui comentário
            this.bitrixInstance
                .entity(Comment)
                .setContact(olderContactId)
                .setText("[b][SIZE=14pt][u]Campos alterados por mesclagem:[/u][/SIZE][/b]\n\n" + changedDataText.join("\n "))
                .insert();
            // Atribui todos os campos ao contato mais velho
            const responseOfUpdateFields = await olderContact.update({
                ID: olderContactId,
                fields: changedData,
            });
            if (responseOfUpdateFields.isSuccess) {
                console.info("Campos do contato %s transferidos com sucesso para o contato %s", newContactId, olderContactId);
            }
            else {
                throw Error("Erro ao transferir campos: " + Object.keys(responseOfUpdateFields).join(", "));
            }
            // Zerar os campos do contato novo
            const emptyValuesData = {};
            Object.keys(newContact.data).forEach(function (dataKey) {
                let objectFieldValue = newContact.data[dataKey];
                let value = "";
                if (dataKey == "ASSIGNED_BY_ID") {
                    value = olderContact.data[dataKey];
                }
                if (dataKey == "NAME") {
                    value = "[DUPLICATE ::" + olderContactId + "] " + objectFieldValue;
                }
                if (dataKey == "PHONE" || dataKey == "EMAIL" || dataKey == "IM") {
                    value = objectFieldValue.map((fieldValueItem) => {
                        fieldValueItem.VALUE = "";
                        return fieldValueItem;
                    });
                }
                emptyValuesData[dataKey] = value;
            });
            const responseOfClearContactFields = await newContact.update({
                ID: newContactId,
                fields: emptyValuesData,
            });
            if (responseOfClearContactFields.isSuccess) {
                console.info("Campos do contato %s zerados com sucesso", newContactId);
            }
            else {
                throw Error("Erro ao zerar campos do contato: " + JSON.stringify(responseOfClearContactFields));
            }
            console.info("Transferindo campos do contato %s para o contato %s", newContactId, olderContactId);
        });
    }
    // Util que pega variação dos mesmos números
    getAllVariationsOfSamePhones(phones) {
        return PhoneHelper.getAllVariationsOfSamePhones(phones);
    }
}
