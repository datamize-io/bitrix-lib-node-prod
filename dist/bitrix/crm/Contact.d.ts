import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class Contact extends BitrixBuilder {
    protected prefixDefault: string | null;
    setEmail(value: any, type?: string): this;
    setPhone(value: any, type?: string): this;
    setName(value: any): this;
    setLastName(value: any): this;
    setUser(value: any): this;
    getDeals(): Promise<any>;
    getOpenedDeals(): Promise<any>;
}
