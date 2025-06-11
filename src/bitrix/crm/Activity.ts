import { BitrixBuilder } from "../BitrixBuilder.js";

export class Activity extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.activity";

  async moveTo(toEntityId: string | number, toEntityTypeId: null | string | number = null) {
    const request = this.instance.request("crm.activity.binding.move", {
      activityId: this.getData().ID,
      sourceEntityTypeId: this.getData().OWNER_TYPE_ID,
      sourceEntityId: this.getData().OWNER_ID,
      targetEntityTypeId: toEntityTypeId,
      targetEntityId: toEntityId,
    });
    return await request;
  }

  getEntityId() {
    return this.getData().OWNER_TYPE_ID;
  }
}
