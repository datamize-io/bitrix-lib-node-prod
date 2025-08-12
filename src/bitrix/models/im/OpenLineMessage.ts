import { OpenLineMessageBuilder } from "../../builders/im/OpenLineMessageBuilder.builder.js";
import { OpenLineMessageInterface } from "../../interfaces/im/OpenLineMessageInterface.interface.js";

export class OpenLineMessage extends OpenLineMessageBuilder implements OpenLineMessageInterface {
  async add(
    entity: "lead" | "deal" | "contact" | "company",
    entityId: string | number,
    userId: string | number,
    chatId: string | number,
    message: string
  ): Promise<number> {
    return await this.requestData("imopenlines.crm.message.add", {
      CRM_ENTITY_TYPE: entity,
      CRM_ENTITY_ID: entityId,
      USER_ID: userId,
      CHAT_ID: chatId,
      MESSAGE: message,
    });
  }

  async saveAsQuickMessage(chatId: string | number, messageId: string | number): Promise<boolean> {
    return this.requestData("imopenlines.message.quick.save", {
      CHAT_ID: chatId,
      MESSAGE_ID: messageId,
    });
  }
  async startDialogByMessage(chatId: string | number, messageId: string | number): Promise<boolean> {
    return this.requestData("imopenlines.message.session.start", {
      CHAT_ID: chatId,
      MESSAGE_ID: messageId,
    });
  }
}
