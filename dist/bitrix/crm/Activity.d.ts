import { ActivityBuilder } from "../builders/crm/ActivityBuilder.builder.js";
export declare class Activity extends ActivityBuilder {
    moveTo(toEntityId: string | number, toEntityTypeId?: null | string | number): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
}
