import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export declare abstract class ActivityBuilder extends BitrixBuilder {
    protected prefixDefault: string | null;
    getEntityId(): any;
    moveTo(toEntityId: string | number, toEntityTypeId?: null | string | number): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
}
