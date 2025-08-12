import { OpenLineOperatorBuilder } from "../../builders/im/OpenLineOperatorBuilder.builder.js";
import { OpenLineOperatorInterface } from "../../interfaces/im/OpenLineOperatorInterface.interface.js";

export class OpenLineOperator extends OpenLineOperatorBuilder implements OpenLineOperatorInterface {
  async takesChat(chatId: string | number): Promise<boolean> {
    return this.requestData("imopenlines.operator.answer", {
      CHAT_ID: chatId,
    });
  }
  async finishChat(chatId: string | number): Promise<boolean> {
    return this.requestData("imopenlines.operator.another.finish", {
      CHAT_ID: chatId,
    });
  }
}
