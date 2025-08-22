import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
export class ImBot extends ImBotBuilder {
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
