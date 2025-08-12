import { OpenLineOperatorBuilder } from "../../builders/im/OpenLineOperatorBuilder.builder.js";
export class OpenLineOperator extends OpenLineOperatorBuilder {
    async takesChat(chatId) {
        return this.requestData("imopenlines.operator.answer", {
            CHAT_ID: chatId,
        });
    }
    async finishChat(chatId) {
        return this.requestData("imopenlines.operator.another.finish", {
            CHAT_ID: chatId,
        });
    }
}
