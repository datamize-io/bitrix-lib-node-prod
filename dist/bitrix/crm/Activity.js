import { ActivityBuilder } from "../builders/crm/ActivityBuilder.builder.js";
export class Activity extends ActivityBuilder {
    async moveTo(toEntityId, toEntityTypeId = null) {
        const request = this.instance.request("crm.activity.binding.move", {
            activityId: this.getData().ID,
            sourceEntityTypeId: this.getData().OWNER_TYPE_ID,
            sourceEntityId: this.getData().OWNER_ID,
            targetEntityTypeId: toEntityTypeId,
            targetEntityId: toEntityId,
        });
        return await request;
    }
}
