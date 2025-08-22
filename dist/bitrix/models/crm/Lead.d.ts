import { Item } from "./Item.js";
export declare class Lead extends Item {
    protected defaultParams: Record<string, any | null>;
    isStatus(status: "OPEN" | "SUCCESS" | "FAILED"): boolean;
    setContact(value: any): Lead;
    setContacts(value: any[]): Lead;
    setName(value: any): Lead;
    setPipeline(value: any): Lead;
    setStage(value?: any): Lead;
    setValue(value: any, currency?: string): Lead;
    setCurrency(value?: string): Lead;
    setStatus(value?: boolean): Lead;
    setOriginId(value: any): Lead;
    setSource(value: any): Lead;
    setTrack(utms: any): Lead;
    setField(field: string, value: any): this;
    setUser(value: any): Lead;
    getByStageId(stageId: string): Promise<any>;
    moveToStage(stageId: string, object: object): Promise<object[]>;
}
