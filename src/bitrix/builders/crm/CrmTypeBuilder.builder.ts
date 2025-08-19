import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CrmTypeInterface } from "../../interfaces/crm/CrmTypeInterface.interface.js";

export abstract class CrmTypeBuilder extends BitrixBuilder implements CrmTypeInterface {
  protected prefixDefault: string | null = "crm.type";

  async collect<T = any>(params: any = {}, method: string | null = null, collectField: string = "result"): Promise<T> {
    return await super.collect(params, method, "result.types");
  }
}
