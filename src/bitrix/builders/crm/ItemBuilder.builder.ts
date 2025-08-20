import { BitrixBuilder } from "../BitrixBuilder.builder.js";

export abstract class ItemBuilder extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.item";
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: null,
    useOriginalUfNames: "Y",
    select: ["*"],
  };

  setEntityTypeId(entityTypeId: number): this {
    this.defaultParams.entityTypeId = entityTypeId;
    return this;
  }

  setId(id: string | number): this {
    this.setDataItem("id", id);
    return this;
  }

  getData() {
    return this.data?.item || this.data;
  }

  async collect<T = any>(params: any = {}, method: string | null = null, collectField: string = "result"): Promise<T> {
    return await super.collect(params, method, "result.items");
  }
}
