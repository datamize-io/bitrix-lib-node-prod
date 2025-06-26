import { BitrixBuilder } from "../BitrixBuilder.builder.js";

export abstract class ActivityBuilder extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.activity";

  getEntityId() {
    return this.getData().OWNER_TYPE_ID;
  }
}
