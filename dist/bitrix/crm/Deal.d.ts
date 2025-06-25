import { Item } from "./Item.js";
export declare class Deal extends Item {
    protected defaultParams: Record<string, any | null>;
    setContact(value: any): Deal;
    setContacts(value: any[]): Deal;
    setName(value: any): Deal;
    setPipeline(value: any): Deal;
    setStage(value?: any): Deal;
    setValue(value: any, currency?: string): Deal;
    setCurrency(value?: string): Deal;
    setStatus(value?: boolean): Deal;
    setOriginId(value: any): Deal;
    setSource(value: any): Deal;
    setTrack(utms: any): Deal;
    setField(field: string, value: any): this;
    setUser(value: any): Deal;
    getByStageId(stageId: string): Promise<any>;
    moveToStage(stageId: string, object: object): Promise<object[]>;
}
