import { ItemBuilder } from "../../builders/crm/ItemBuilder.builder.js";
import { CustomField } from "./CustomField.js";
import { Activity, Comment, CrmType } from "./index.js";
export class Item extends ItemBuilder {
    getEntityTypeName() {
        const typeId = this.getData().entityTypeId;
        switch (typeId) {
            case 1:
                return "LEAD";
            case 2:
                return "DEAL";
            case 3:
                return "CONTACT";
            case 4:
                return "COMPANY";
            case 5:
                return "QUOTE";
            case 6:
                return "INVOICE";
            case 7:
                return "ORDER";
            case 8:
                return "SMART_INVOICE";
            default:
                return "SPA";
        }
    }
    async insertComment(comment) {
        return await new Comment(this.instance).insert({
            fields: {
                ENTITY_ID: this.getData().id,
                ENTITY_TYPE: this.getEntityTypeName(),
                COMMENT: comment,
            },
        });
    }
    async transferAllActivitiesTo(newOwnerId) {
        try {
            const oldOwnerId = this.getData().id;
            if (!oldOwnerId) {
                throw Error("Não foi possível transferir atividades. ID do contato não encontrado.");
            }
            console.info("Transferindo atividades da entidade %s para %s", this.getData().id, newOwnerId);
            const activities = await new Activity(this.instance)
                .setFilterItems({
                OWNER_ID: oldOwnerId,
                OWNER_TYPE_ID: this.getData().entityTypeId,
            })
                .collect();
            if (!activities || activities.getData().length === 0) {
                console.info("Nenhuma atividade encontrada para a entidade %s", oldOwnerId);
                return;
            }
            await activities.getData().forEach(async (activity) => {
                const responseOfMoveActivity = await activity.moveTo(newOwnerId, this.getData().entityTypeId);
                if (responseOfMoveActivity.isSuccess) {
                    console.info("Atividade movida com sucesso.");
                }
                else {
                    throw Error("Erro ao transferir atividade: " + activity.getData().ID);
                }
            });
        }
        catch (error) {
            console.error("Erro ao transferir atividades:", error.message);
            throw error;
        }
    }
    async transferAllCommentsTo(newOwnerId) {
        console.info("Transferindo comentários do item %s para o item %s", newOwnerId);
        const comments = await new Comment(this.instance)
            .setFilterItems({
            ENTITY_ID: this.getData().id,
            ENTITY_TYPE: this.getEntityTypeName(),
        })
            .collect();
        if (!comments || comments.getData().length === 0) {
            console.info("Nenhum comentário encontrado para o item %s", this.getData().id);
            return;
        }
        // Lógica de transferência dos comentários
        comments.getData().forEach(async (comment) => {
            const newCommentIntoNewContact = await new Comment(this.instance)
                .setItem(newOwnerId, this.getData().entityTypeId)
                .setText("[b]Comentário movido do item " + this.getData().id + ":[/b]\n\n" + comment.getData().COMMENT);
            const insertResponse = newCommentIntoNewContact.insert(newCommentIntoNewContact.getData()).catch((error) => {
                throw Error("Erro ao transferir comentário:" + error.message);
            });
            insertResponse.then(async (newComment) => {
                const deleteResponse = await comment.delete(comment.getData().ID).catch((error) => {
                    throw Error("Erro ao deletar comentário original:" + error.message);
                });
            });
        });
    }
    async transferEntitiesTo(newOwnerId, chooseEntities = []) {
        console.info("Transferindo entidades do item %s para o item %s", this.getData().id, newOwnerId);
        // Puxa Spas customizadas
        if (chooseEntities.length == 0) {
            const customEntities = await new CrmType(this.instance).collect().then((entityType) => {
                const types = entityType?.getData() || [];
                return types.map((entity) => {
                    return entity.getData().entityTypeId;
                });
            });
            const systemEntities = [1, 2, 3, 4];
            chooseEntities = systemEntities.concat(customEntities);
        }
        const itemData = this.getData();
        const parentNames = {
            1: "leadId",
            2: "dealId",
            3: "contactId",
            4: "companyId",
        };
        // Transfere as SPAs e system entities para o novo dono
        chooseEntities.forEach(async (entityTypeId) => {
            // Atribui nome da propriedade que vai buscar como item Pai
            let entityDynamicName = parentNames[itemData.entityTypeId];
            if (entityTypeId == itemData.entityTypeId)
                return;
            // Se encontrar algum item, cujo item pai seja o item atual
            let entitiesCollectItems;
            try {
                entitiesCollectItems = await new Item(this.instance)
                    .setFilterItems({
                    [`${entityDynamicName}`]: itemData.id,
                })
                    .setEntityTypeId(entityTypeId)
                    .collect();
            }
            catch (error) {
                console.log(`Entidade: ${entityTypeId}, Erro: ${error.message}`);
            }
            // Transfere todas as entidades encontradas
            if (entitiesCollectItems && entitiesCollectItems.getData().length > 0) {
                await entitiesCollectItems.getData().forEach(async (entityItem) => {
                    if (entityItem.getData()[entityDynamicName] == itemData.id) {
                        const spaToTransfer = await new Item(this.instance)
                            .setId(entityItem.getData().id)
                            .setEntityTypeId(entityTypeId)
                            .setField(entityDynamicName, newOwnerId);
                        await spaToTransfer
                            .update()
                            .then((response) => { })
                            .catch((error) => {
                            throw new Error(error.message);
                        });
                    }
                });
            }
            // Verificando se possui entidade pai com esse id
            const propertyName = `parentId${entityTypeId}`;
            const parentWithEntity = itemData[propertyName];
            if (parentWithEntity) {
                const newOwnerItem = await new Item(this.instance).setEntityTypeId(itemData.entityTypeId).get(newOwnerId);
                newOwnerItem.setId(newOwnerId).setField(propertyName, parentWithEntity).update();
                this.setId(itemData.id).setField(propertyName, null).update();
            }
        });
    }
    async transferAllFieldsTo(newOwnerId) {
        const itemData = this.getData();
        const oldOwnerId = itemData.id;
        const CustomFieldsCollect = await new CustomField(this.instance).collect({ entityTypeId: itemData.entityTypeId });
        const CustomFields = CustomFieldsCollect.getData()[0];
        const TranslatedFields = CustomFields.getData();
        console.info("Transferindo campos do contato %s para o contato %s", oldOwnerId, newOwnerId);
        const newOwner = await new Item(this.instance).setEntityTypeId(itemData.entityTypeId).get(newOwnerId);
        // Passando por cada contato
        const oldOwner = await new Item(this.instance).setEntityTypeId(itemData.entityTypeId).get(oldOwnerId);
        const systemKeys = ["name", "lastName", "email", "fm", "imol"];
        const fieldKeys = Object.keys(oldOwner.getData())
            .filter((d) => d.startsWith("uf"))
            .concat(systemKeys);
        console.info("Alterando os campos: " + fieldKeys.join(", "));
        const changedData = {};
        const changedDataText = ["[b]Alteração do Contato " + oldOwnerId + " para o Contato " + newOwnerId + " [/b]"];
        //Passando por cada campo
        fieldKeys.forEach(function (fieldKey) {
            let newFieldValue = oldOwner.getData()[fieldKey] || "";
            let oldFieldValue = newOwner.getData()[fieldKey] || "";
            let newFieldValueText = newFieldValue;
            let hasChanged = false;
            const translatedField = TranslatedFields[fieldKey];
            if ((fieldKey == "name" || fieldKey == "title") && newFieldValue.includes("DUPLICATE OF ")) {
                newFieldValue = "";
            }
            if (fieldKey == "fm") {
                const onlyNewsFm = newFieldValue.filter((fm) => {
                    return oldFieldValue.find((ofm) => ofm.id == fm.id);
                });
                const numberOfFm = oldFieldValue.length;
                newFieldValue = oldFieldValue.concat(onlyNewsFm);
                hasChanged = numberOfFm == newFieldValue.length;
                if (!hasChanged)
                    return;
            }
            if (("" + oldFieldValue).trim() !== ("" + newFieldValue).trim() && newFieldValue) {
                if (!oldFieldValue) {
                    oldFieldValue = "<vazio>";
                }
                if (translatedField.type == "enumeration") {
                    const option = translatedField.items.find((optionObject) => optionObject.ID == newFieldValue);
                    newFieldValueText = option.VALUE || newFieldValueText;
                }
                if (Array.isArray(oldFieldValue) && Array.isArray(newFieldValue) && systemKeys.includes(fieldKey)) {
                    oldFieldValue = oldFieldValue.concat(newFieldValue);
                    newFieldValueText = newFieldValue.map((deal) => deal.VALUE).join("\n- ");
                    changedDataText.push("\n• [b]" + translatedField.title + "s acrescentados:[/b] \n- " + newFieldValueText);
                }
                else {
                    changedDataText.push("• [b]" + translatedField.title + ":[/b] Alterado de " + oldFieldValue + " para " + newFieldValueText);
                }
                changedData[fieldKey] = newFieldValue;
            }
        });
        // Atribui comentário
        if (Object.keys(changedData).length > 0) {
            await newOwner.addTimelineLogEntry("Campos alterados por mesclagem", `Este item recebeu campos do item ${itemData.id}.`);
            await newOwner.insertComment("[b][SIZE=14pt][u]Campos alterados por mesclagem:[/u][/SIZE][/b]\n\n" + changedDataText.join("\n "));
            // Atribui todos os campos ao contato mais velho
            await newOwner
                .update({
                id: newOwnerId,
                fields: changedData,
            })
                .then((response) => { })
                .catch((error) => {
                throw Error("Erro ao zerar atualizar campos do item: " + error.message);
            });
        }
    }
    async clearAllFieldsOfItem() {
        // Zerar os campos do contato novo
        const itemData = this.getData();
        const CustomFieldsCollect = await new CustomField(this.instance).collect({ entityTypeId: itemData.entityTypeId });
        const CustomFields = CustomFieldsCollect.getData()[0];
        const TranslatedFields = CustomFields.getData();
        const emptyValuesData = {};
        const requiredFieldsNotSpecified = ["name", "fm"];
        Object.keys(itemData).forEach(function (dataKey) {
            const fieldSetting = TranslatedFields[dataKey];
            if (dataKey == "id")
                return;
            if (!itemData[dataKey])
                return;
            if (fieldSetting?.isReadOnly !== false)
                return;
            const isRequired = fieldSetting.isRequired || requiredFieldsNotSpecified.includes(dataKey);
            const value = isRequired ? itemData[dataKey] : "";
            emptyValuesData[dataKey] = value;
        });
        if (Object.keys(emptyValuesData).length > 0) {
            await this.update({
                id: itemData.id,
                fields: emptyValuesData,
            })
                .then((i) => { })
                .catch((error) => {
                throw Error(`Erro ao zerar campos do item ${itemData.entityTypeId}: ${error.message}`);
            });
        }
    }
    async addTimelineLogEntry(title, text, iconCode = "info") {
        const { id, entityTypeId } = this.getData();
        return this.requestAndPatch("crm.timeline.logmessage.add", {
            fields: {
                entityTypeId,
                entityId: id,
                title,
                text,
                iconCode,
            },
        });
    }
}
