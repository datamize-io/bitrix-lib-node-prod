import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";
export declare class Comment extends BitrixBuilder {
    toPin(): Promise<any>;
    toUnpin(): Promise<any>;
    collectFromContact(contactId: string | number): Promise<any>;
}
