import { BitrixBuilder } from "../BitrixBuilder.js";

export class Item extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.item";
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: null,
  };

  setEntityTypeId(entityTypeId: number): this {
    this.defaultParams.entityTypeId = entityTypeId;
    return this;
  }

  setId(id: string | number): this {
    this.setDataItem("id", id);
    return this;
  }

  async collect<T = any>(params: any = {}, method: string | null = null, collectField: string = "result"): Promise<T> {
    return await super.collect(params, method, "result.items");
  }
}
