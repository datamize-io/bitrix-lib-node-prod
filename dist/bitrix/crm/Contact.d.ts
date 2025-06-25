import { Item } from "./Item.js";
export declare class Contact extends Item {
    protected defaultParams: Record<string, any | null>;
    setFmField(typeId: "PHONE" | "EMAIL" | "WEB" | "IM" | "LINK", valueType: string, value: string, id?: string): this;
    setEmail(value: string, type: "WORK" | "HOME" | "MAILING" | "OTHER"): this;
    setPhone(value: any, type: "WORK" | "MOBILE" | "FAX" | "HOME" | "PAGER" | "MAILING" | "OTHER"): this;
    setName(value: any): this;
    setLastName(value: any): this;
    setUser(value: any): this;
    getDeals(): Promise<any>;
    getOpenedDeals(): Promise<any>;
}
