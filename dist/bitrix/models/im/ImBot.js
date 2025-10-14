import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
import { OpenLineDialog } from "./OpenLineDialog.js";
export class CustomMessageBuilder {
    constructor(customMessage) {
        this.attachmentBlocks = [];
        this.message = customMessage;
        return this;
    }
    startBlocks() {
        this.message.ATTACH = this.message.ATTACH || {};
        this.message.ATTACH.BLOCKS = this.message.ATTACH.BLOCKS || [];
        return this;
    }
    setGrid(gridObject) {
        this.startBlocks();
        this.message.ATTACH.BLOCKS.push({
            GRID: [gridObject],
        });
        return this;
    }
    setUser(userObject) {
        this.startBlocks();
        this.message.ATTACH.BLOCKS.push({
            USER: userObject,
        });
        return this;
    }
    setDelimitter(delimitterObject = null) {
        this.startBlocks();
        this.message.ATTACH.BLOCKS.push({
            DELIMITER: delimitterObject || {
                SIZE: 200,
                COLOR: "#c6c6c6",
            },
        });
        return this;
    }
    setInfoUser() {
        this.setUser({
            NAME: "Sistema - Informação",
            AVATAR: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Info_Simple.svg/768px-Info_Simple.svg.png",
        });
        this.setDelimitter({ SIZE: 200, COLOR: "#333333" });
        return this;
    }
    setAlertUser() {
        this.setUser({
            NAME: "Sistema - Alerta",
            AVATAR: "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/alert-icon.png",
        });
        this.setDelimitter({ SIZE: 200, COLOR: "#ff0000" });
        return this;
    }
    build() {
        return this.message;
    }
}
export class ImBot extends ImBotBuilder {
    getDialogByChatEntityId(userCode) {
        return new OpenLineDialog(this.instance).getByUserCode(userCode);
    }
    async insert(registerPayload) {
        return this.register(registerPayload);
    }
    async register(registerPayload) {
        return this.requestAndPatch("imbot.register", registerPayload);
    }
    async update(registerPayload) {
        return this.requestAndPatch("imbot.update", registerPayload);
    }
    async unregister(botId, clientId) {
        return this.requestAndPatch("imbot.unregister", {
            CLIENT_ID: clientId,
            BOT_ID: botId,
        });
    }
    async leave(botId, chatId, clientId) {
        return this.requestAndPatch("imbot.chat.leave", {
            CHAT_ID: chatId,
            BOT_ID: botId,
            CLIENT_ID: clientId,
        });
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
    async updateTitle(chatId, botId, title) {
        return this.requestAndPatch("imbot.chat.updateTitle", {
            CHAT_ID: chatId,
            BOT_ID: botId,
            TITLE: title,
        });
    }
    async list() {
        return this.requestAndPatch("imbot.bot.list", {});
    }
    //imbot.command.register
    async commandRegister(payloadData) {
        return this.requestAndPatch("imbot.command.register", payloadData);
    }
    //imbot.command.register
    async commandAnswer(payloadData) {
        return this.requestAndPatch("imbot.command.answer", payloadData);
    }
    //imbot.command.register
    async commandUnregister(payloadData) {
        return this.requestAndPatch("imbot.command.unregister", payloadData);
    }
    //imbot.command.
    async commandUpdate(COMMAND_ID, CLIENT_ID) {
        return this.requestAndPatch("imbot.command.update", {
            COMMAND_ID,
            CLIENT_ID,
        });
    }
    async setInfo(clientId, chatId, message) {
        return this.requestAndPatch("imbot.message.add", {
            CLIENT_ID: clientId,
            DIALOG_ID: chatId,
            MESSAGE: `Nova informação:`,
            SYSTEM: "Y",
            ATTACH: [
                {
                    USER: {
                        NAME: "Sistema - Informação",
                        AVATAR: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Info_Simple.svg/768px-Info_Simple.svg.png",
                    },
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: "#c6c6c6",
                    },
                },
                {
                    GRID: [
                        {
                            NAME: "Mensagem",
                            VALUE: message,
                            DISPLAY: "LINE",
                            WIDTH: 500,
                        },
                    ],
                },
            ],
        });
    }
    async setAlert(clientId, chatId, message) {
        return this.requestAndPatch("imbot.message.add", {
            CLIENT_ID: clientId,
            DIALOG_ID: chatId,
            MESSAGE: `Novo alerta:`,
            SYSTEM: "Y",
            ATTACH: [
                {
                    USER: {
                        NAME: "Sistema - Alerta",
                        AVATAR: "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/alert-icon.png",
                    },
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: "#c6c6c6",
                    },
                },
                {
                    GRID: [
                        {
                            NAME: "Mensagem",
                            VALUE: message,
                            DISPLAY: "LINE",
                            WIDTH: 500,
                        },
                    ],
                },
            ],
        });
    }
    async setCustomMessage(customMessage) {
        return this.requestAndPatch("imbot.message.add", customMessage);
    }
}
