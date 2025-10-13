import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
import { ImbotRegisterPayload } from "../../interfaces/im/ImBotInterface.interface.js";
type CommandRegister = {
    BOT_ID: number;
    COMMAND: string;
    COMMON?: "Y" | "N";
    HIDDEN?: "Y" | "N";
    EXTRANET_SUPPORT?: "Y" | "N";
    CLIENT_ID?: string;
    LANG: Array<Record<string, any>>;
    EVENT_COMMAND_ADD: string;
};
type BotId = {
    BOT_ID: number;
    CLIENT_ID?: string;
};
type ImbotUpdatePayload = BotId & {
    fields: ImbotRegisterPayload;
};
export declare class ImBot extends ImBotBuilder {
    getDialogByChatEntityId(userCode: string): Promise<any>;
    insert(registerPayload: ImbotRegisterPayload): Promise<any>;
    register(registerPayload: ImbotRegisterPayload): Promise<any>;
    update(registerPayload: ImbotUpdatePayload): Promise<any>;
    unregister(botId: string | number, clientId: string): Promise<any>;
    leave(botId: string | number, chatId: string | number, clientId: string): Promise<any>;
    sessionFinish(chatId: number): Promise<any>;
    skipToFreeOperator(chatId: number): Promise<any>;
    sessionTransfer(chatId: number, userId: number, leave: "Y" | "N"): Promise<any>;
    sendMessage(chatId: number, message: string, name?: "WELCOME" | "DEFAULT"): Promise<any>;
    list(): Promise<any>;
    commandRegister(payloadData: CommandRegister): Promise<any>;
    commandAnswer(payloadData: object): Promise<any>;
    commandUnregister(payloadData: object): Promise<any>;
    commandUpdate(COMMAND_ID: number, CLIENT_ID: string): Promise<any>;
    setInfo(clientId: string, chatId: string, message: string): Promise<any>;
    setAlert(clientId: string, chatId: string, message: string): Promise<any>;
}
export {};
