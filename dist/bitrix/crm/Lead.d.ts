import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class Lead extends BitrixBuilder {
    protected prefixDefault: string | null;
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
}
