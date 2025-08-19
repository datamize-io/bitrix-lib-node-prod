import { BitrixBuilder } from "../BitrixBuilder.builder.js";

export abstract class ActivityBuilder extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.activity";

  getEntityId() {
    return this.getData().OWNER_TYPE_ID;
  }

  async moveTo(toEntityId: string | number, toEntityTypeId: null | string | number = null) {
    return this.instance.request("crm.activity.binding.move", {
      activityId: this.getData().ID,
      sourceEntityTypeId: this.getData().OWNER_TYPE_ID,
      sourceEntityId: this.getData().OWNER_ID,
      targetEntityTypeId: toEntityTypeId,
      targetEntityId: toEntityId,
    });
  }
}
