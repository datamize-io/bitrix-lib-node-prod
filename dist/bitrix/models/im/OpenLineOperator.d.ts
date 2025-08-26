import { OpenLineOperatorBuilder } from "../../builders/im/OpenLineOperatorBuilder.builder.js";
import { OpenLineOperatorInterface } from "../../interfaces/im/OpenLineOperatorInterface.interface.js";
export declare class OpenLineOperator extends OpenLineOperatorBuilder implements OpenLineOperatorInterface {
    takesChat(chatId: string | number): Promise<boolean>;
    finishChat(chatId: string | number): Promise<boolean>;
    transfer(chatId: string | number, transferId: string | number): Promise<boolean>;
}
