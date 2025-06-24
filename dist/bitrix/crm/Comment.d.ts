import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class Comment extends BitrixBuilder {
    protected prefixDefault: string | null;
    protected data: any;
    setDeal(value: any): this;
    setItem(value: any, type: string, typeId: number): this;
    setContact(value: any): this;
    setLead(value: any): this;
    setOwner(value: any): this;
    setText(value: any): this;
    toPin(): Promise<any>;
    toUnpin(): Promise<any>;
    collectFromContact(contactId: string | number): Promise<any>;
}
