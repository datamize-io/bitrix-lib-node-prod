import { B24Hook, B24HookParams, Result } from "@bitrix24/b24jssdk";
export declare class BitrixInstance {
    private client;
    private paramsToInject;
    constructor(secretObject: B24HookParams | B24Hook);
    entity(Entity: any): any;
    setDefaultParams(paramsToInject: any): this;
    getDefaultParams(params: Record<string, any>): Record<string, any>;
    request(method: string, params: Record<string, any>, isBatch?: boolean): Promise<Result>;
}
