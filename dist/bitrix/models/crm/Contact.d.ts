import { ContactBuilder } from "../../builders/crm/ContactBuilder.builder.js";
export declare class Contact extends ContactBuilder {
    getDeals(): Promise<any>;
    getDuplications(): Promise<any>;
    getOpenedDeals(): Promise<any>;
}
