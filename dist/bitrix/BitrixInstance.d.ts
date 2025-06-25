import { B24Hook, B24HookParams, Result } from "@bitrix24/b24jssdk";
export declare class BitrixInstance {
    private client;
    private paramsToInject;
    private accessToken;
    constructor(secretObject: B24HookParams | B24Hook);
    entity(Entity: any): any;
    getClientToken(): void;
    setAccessToken(accessToken: string): this;
    setDefaultParams(paramsToInject: any): this;
    getDefaultParams(params: Record<string, any>): Record<string, any>;
    request(method: string, params: Record<string, any>, isBatch?: boolean): Promise<Result>;
}
