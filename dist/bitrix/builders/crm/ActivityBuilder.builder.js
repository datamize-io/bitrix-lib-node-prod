import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class ActivityBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.activity";
    }
    getEntityId() {
        return this.getData().OWNER_TYPE_ID;
    }
    async moveTo(toEntityId, toEntityTypeId = null) {
        const request = this.instance.request("crm.activity.binding.move", {
            activityId: this.getData().ID,
            sourceEntityTypeId: this.getData().OWNER_ID,
            sourceEntityId: this.getData().OWNER_TYPE_ID,
            targetEntityTypeId: toEntityTypeId,
            targetEntityId: toEntityId,
        });
        return await request;
    }
}
