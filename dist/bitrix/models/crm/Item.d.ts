import { ItemBuilder } from "../../builders/crm/ItemBuilder.builder.js";
export declare class Item extends ItemBuilder {
    getEntityTypeName(): "LEAD" | "DEAL" | "CONTACT" | "COMPANY" | "QUOTE" | "INVOICE" | "ORDER" | "SMART_INVOICE" | "SPA";
    insertComment(comment: string): Promise<any>;
    transferAllActivitiesTo(newOwnerId: string | number): Promise<void>;
    transferAllCommentsTo(newOwnerId: string | number): Promise<void>;
    transferEntitiesTo(newOwnerId: string | number, chooseEntities?: number[]): Promise<void>;
    transferAllFieldsTo(newOwnerId: any): Promise<void>;
    clearAllFieldsOfItem(): Promise<void>;
}
