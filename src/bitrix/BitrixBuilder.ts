import { BitrixInstance } from "./BitrixInstance";

export class BitrixBuilder {
  protected instance: BitrixInstance;
  protected static instance: BitrixInstance;
  protected prefixDefault: string | null = null;
  protected data: any = null;
  protected selectFields: string[] = [];
  protected filterFields: any = {};

  static setInstance(bitrixInstance: BitrixInstance): void {
    this.instance = bitrixInstance;
  }

  constructor(bitrixInstance: BitrixInstance) {
    this.instance = bitrixInstance;
    return this;
  }

  selectByFields(selectByFields: string[]): this {
    this.selectFields = selectByFields;
    return this;
  }

  filterByFields(filterByFields: any): this {
    this.filterFields = filterByFields;
    return this;
  }

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  async get<T = any>(id: string | number, method: string | null = null): Promise<T> {
    method = method || this.prefixDefault + ".get";

    const entityResponse = await this.requestAndPatch(method, {
      id: id,
    });

    return entityResponse;
  }

  async requestAndPatch<T = any>(method: string, params: any = {}, resultField: string = "result"): Promise<T> {
    try {
      const result = await this.instance.request(method, params);
      if (result.isSuccess) {
        return this.patch(result.getData(), resultField); // ← retorna o que foi tratado
      } else {
        throw Error(result.getData());
      }
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  patch(params: any, field: string = "result"): any {
    console.log(field);
    this.data = params[field];
    return this;
  }
}
