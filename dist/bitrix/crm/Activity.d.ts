import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class Activity extends BitrixBuilder {
    protected prefixDefault: string | null;
    moveTo(toEntityId: string | number, toEntityTypeId?: null | string | number): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
    getEntityId(): any;
}
