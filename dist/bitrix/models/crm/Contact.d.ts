import { ContactBuilder } from "../../builders/crm/ContactBuilder.builder.js";
export declare class Contact extends ContactBuilder {
    getDeals(): Promise<any>;
    getByPhone(phone: string): Promise<any>;
    getByPhones(phones: string[]): Promise<any>;
    getDuplications(): Promise<any>;
    getOpenedDeals(): Promise<any>;
}
