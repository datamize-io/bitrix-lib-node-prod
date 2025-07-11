import { OpenLineMessageBuilder } from "../../builders/im/OpenLineMessageBuilder.builder.js";
import { OpenLineMessageInterface } from "../../interfaces/im/OpenLineMessageInterface.interface.js";
export declare class OpenLineMessage extends OpenLineMessageBuilder implements OpenLineMessageInterface {
    add(entity: "lead" | "deal" | "contact" | "company", entityId: string | number, userId: string | number, chatId: string | number, message: string): Promise<number>;
    saveAsQuickMessage(chatId: string | number, messageId: string | number): Promise<boolean>;
}
