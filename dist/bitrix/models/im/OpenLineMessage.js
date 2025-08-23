import { OpenLineMessageBuilder } from "../../builders/im/OpenLineMessageBuilder.builder.js";
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
