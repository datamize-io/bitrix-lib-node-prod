import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";
type MergeStatus = "SUCCESS" | "CONFLICT" | "ERROR";
export declare class Duplicate extends BitrixBuilder {
    protected prefixDefault: string | null;
    setContacts(contacts: Array<string | number>): this;
    static findDuplicatedContacts(contacts: Array<string | number>, type?: string): Promise<any>;
    static doMerge(data: any): Promise<any>;
    isMergeStatus(mergeStatus: MergeStatus): boolean;
    getMergeEntities(): Array<string | number>;
}
export {};
