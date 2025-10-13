import { OpenLineMessageBuilder } from "../../builders/im/OpenLineMessageBuilder.builder.js";
import { OpenLineDialog } from "./OpenLineDialog.js";
export class OpenLineMessage extends OpenLineMessageBuilder {
    async add(entity, entityId, userId, chatId, message) {
        return await this.requestData("imopenlines.crm.message.add", {
            CRM_ENTITY_TYPE: entity,
            CRM_ENTITY: entityId,
            USER_ID: userId,
            CHAT_ID: chatId,
            MESSAGE: message,
        });
    }
    async comment(entity, entityId, userId, chatId, message) {
        const dialog = new OpenLineDialog(this.instance);
        return await dialog.silent(chatId, "Y").then(async (r) => {
            return await new OpenLineMessage(this.instance).add(entity, entityId, userId, chatId, message).then(async () => {
                return await dialog.silent(chatId, "N");
            });
        });
    }
    async saveAsQuickMessage(chatId, messageId) {
        return this.requestData("imopenlines.message.quick.save", {
            CHAT_ID: chatId,
            MESSAGE_ID: messageId,
        });
    }
    async startDialogByMessage(chatId, messageId) {
        return this.requestData("imopenlines.message.session.start", {
            CHAT_ID: chatId,
            MESSAGE_ID: messageId,
        });
    }
}
