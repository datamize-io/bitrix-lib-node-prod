import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";
type MergeStatus = "SUCCESS" | "CONFLICT" | "ERROR";
export declare class Duplicate extends BitrixBuilder {
    protected prefixDefault: string | null;
    setContacts(contacts: Array<string | number>): this;
    findByType(entityType: "CONTACT" | "LEAD" | "COMPANY", type: "PHONE" | "EMAIL", contacts: Array<string | number>): Promise<any>;
    static doMerge(data: any): Promise<any>;
    isMergeStatus(mergeStatus: MergeStatus): boolean;
    getMergeEntities(): Array<string | number>;
}
export {};
