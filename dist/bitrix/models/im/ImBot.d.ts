import { ImBotBuilder } from "../../builders/im/ImBotBuilder.builder.js";
import { ImbotRegisterPayload } from "../../interfaces/im/ImBotInterface.interface.js";
export declare class ImBot extends ImBotBuilder {
    getDialogByChatEntityId(userCode: string): Promise<any>;
    register(registerPayload: ImbotRegisterPayload): Promise<any>;
    update(registerPayload: ImbotRegisterPayload): Promise<any>;
    sessionFinish(chatId: number): Promise<any>;
    skipToFreeOperator(chatId: number): Promise<any>;
    sessionTransfer(chatId: number, userId: number, leave: "Y" | "N"): Promise<any>;
    sendMessage(chatId: number, message: string, name?: "WELCOME" | "DEFAULT"): Promise<any>;
    list(): Promise<any>;
}
