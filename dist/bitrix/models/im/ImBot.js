import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
import { OpenLineDialog } from "./OpenLineDialog.js";
export class ImBot extends ImBotBuilder {
    getDialogByChatEntityId(userCode) {
        return new OpenLineDialog(this.instance).getByUserCode(userCode);
    }
    async register(registerPayload) {
        return this.requestAndPatch("imbot.register", registerPayload);
    }
    async update(registerPayload) {
        return this.requestAndPatch("imbot.update", registerPayload);
    }
    async sessionFinish(chatId) {
        return this.requestAndPatch("imopenlines.bot.session.finish", {
            CHAT_ID: chatId,
        });
    }
    async skipToFreeOperator(chatId) {
        return this.requestAndPatch("imopenlines.bot.session.operator", {
            CHAT_ID: chatId,
        });
    }
    async sessionTransfer(chatId, userId, leave) {
        return this.requestAndPatch("imopenlines.bot.session.transfer", {
            CHAT_ID: chatId,
            USER_ID: userId,
            LEAVE: leave,
        });
    }
    async sendMessage(chatId, message, name = "DEFAULT") {
        return this.requestAndPatch("imopenlines.bot.session.message.send", {
            CHAT_ID: chatId,
            MESSAGE: message,
            NAME: name,
        });
    }
    async list() {
        return this.requestAndPatch("imbot.bot.list", {});
    }
}
