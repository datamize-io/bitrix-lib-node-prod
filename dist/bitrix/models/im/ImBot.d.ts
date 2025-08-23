import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
import { ImbotRegisterPayload } from "../../interfaces/im/ImBotInterface.interface.js";
interface CommandRegister {
    BOT_ID: number;
    COMMAND: string;
    COMMON: "Y" | "N";
    HIDDEN: "Y" | "N";
    EXTRANET_SUPPORT: "Y" | "N";
    CLIENT_ID: "Y" | "N";
    LANG: "Y" | "N";
    EVENT_COMMAND_ADD: "Y" | "N";
}
export declare class ImBot extends ImBotBuilder {
    getDialogByChatEntityId(userCode: string): Promise<any>;
    register(registerPayload: ImbotRegisterPayload): Promise<any>;
    update(registerPayload: ImbotRegisterPayload): Promise<any>;
    sessionFinish(chatId: number): Promise<any>;
    skipToFreeOperator(chatId: number): Promise<any>;
    sessionTransfer(chatId: number, userId: number, leave: "Y" | "N"): Promise<any>;
    sendMessage(chatId: number, message: string, name?: "WELCOME" | "DEFAULT"): Promise<any>;
    list(): Promise<any>;
    commandRegister(payloadData: CommandRegister): Promise<any>;
    commandAnswer(payloadData: object): Promise<any>;
    commandUnregister(payloadData: object): Promise<any>;
    commandUpdate(COMMAND_ID: number, CLIENT_ID: string): Promise<any>;
}
export {};
