import { BitrixInstance } from "./BitrixInstance";

export class BitrixBuilder {
  protected instance: BitrixInstance;
  protected static instance: BitrixInstance;
  protected prefixDefault: string | null = null;
  protected data: any = {};
  protected selectFields: string[] = [];
  protected filterFields: any = {};
  protected defaultParams: any = {};
  protected changedData: any = {};

  static setInstance(bitrixInstance: BitrixInstance): BitrixBuilder {
    this.instance = bitrixInstance;
    return new this(this.instance);
  }

  constructor(bitrixInstance: BitrixInstance) {
    this.instance = bitrixInstance;
    return this;
  }

  setSelectItems(selectByFields: string[]): this {
    this.selectFields = selectByFields;
    return this;
  }

  setSelectItem(selectByField: string): this {
    this.selectFields.push(selectByField);
    return this;
  }

  setFilterItems(filterByFields: any): this {
    this.filterFields = filterByFields;
    return this;
  }

  setFilterItem(filterByField: string, valueFromFilter: any): this {
    this.filterFields[filterByField] = valueFromFilter;
    return this;
  }

  setDataItem(field: string, value: any): this {
    this.data = this.data || {};
    this.data[field] = value;
    return this;
  }

  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  setId(id: string | number): this {
    if (!this.data) {
      this.data = {};
    }

    this.data.ID = id;
    return this;
  }

  setDefaultParams() {
    this.instance.setDefaultParams(this.defaultParams);
    return this;
  }

  setField(field: string, value: any): this {
    this.changedData = this.changedData || {};
    this.data = this.data || {};
    this.data.fields = this.data.fields || {};
    this.changedData.fields = this.changedData.fields || {};
    this.data.fields[field] = value;
    this.changedData.fields[field] = value;
    return this;
  }

  async get<T = any>(id: string | number, method: string | null = null): Promise<T> {
    method = method || this.prefixDefault + ".get";

    return await this.requestAndPatch(method, {
      id: id,
    });
  }

  async requestAndPatch<T = any>(method: string, params: any = {}, resultField: string = "result"): Promise<T> {
    this.setDefaultParams();
    try {
      const result = await this.instance.request(method, params);
      if (result.isSuccess) {
        return this.patch(result.getData(), resultField); // ← retorna o que foi tratado
      } else {
        throw Error(result.toString());
      }
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  patch(params: any, field: string | null = "result"): any {
    this.data = field ? params[field] : params;
    return this;
  }

  async insert(params: any, method: string | null = null): Promise<any> {
    this.setDefaultParams();
    params = params || this.data;
    if (!params) {
      throw Error(`Erro ao tentar inserir ${this.constructor.name}, dados não foram passados.`);
    }

    method = method || this.prefixDefault + ".add";
    const request = await this.instance.request(method, params);
    if (request.isSuccess) {
      return (this.data = Object.assign(this.data, request.getData()));
    } else {
      console.error(request.toString());
      throw Error("Erro ao tentar inserir " + this.constructor.name + ".");
    }
  }

  async save(params: any | null = null, method: string | null = null): Promise<any> {
    this.setDefaultParams();
    if (this.data.ID || this.data.id) {
      return await this.update(params, method);
    } else {
      return await this.insert(params, method);
    }
  }

  async update(params: any | null = null, method: string | null = null): Promise<any> {
    this.setDefaultParams();
    params = params || this.changedData;
    if (!params) {
      throw Error(`Erro ao tentar inserir ${this.constructor.name}, dados não foram passados.`);
    }

    if (!params.ID && !params.id) {
      if (this.data.id || this.data.ID) {
        params.ID = params.id = this.data.id || this.data.ID;
      } else {
        throw Error(`Erro ao tentar atualizar ${this.constructor.name}, ID não foi passado.`);
      }
    }

    if (!params.fields) {
      throw Error(`Erro ao tentar atualizar ${this.constructor.name}, campos não foram passados. ${JSON.stringify(params)}${JSON.stringify(this.data)}`);
    }

    method = method || this.prefixDefault + ".update";
    return this.instance.request(method, params);
  }

  async collect(params: any, method: string | null = null, collectField: string | null = "result"): Promise<any | this> {
    this.setDefaultParams();
    method = method || this.prefixDefault + ".list";

    params = params || {};
    params.filter = params.filter || this.filterFields;
    params.select = params.select || this.selectFields;

    const result = await this.instance.request(method, params);

    if (result.isSuccess) {
      const instanceClass = Object.getPrototypeOf(this).constructor;
      const instance = this.instance;

      let data = result.getData();

      console.log(collectField, data);
      if (collectField) {
        if (collectField.includes(".")) {
          const collectFields = collectField.split(".");

          collectFields.forEach((field: string) => {
            if (data[field]) {
              data = data[field];
            } else {
              throw Error(`Campo ${collectField} não encontrado no resultado.`);
            }
          });
        } else {
          data = data[collectField];
        }
      }

      if (!Array.isArray(data)) {
        console.log("É array!");
        data = this.data ? [data] : [];
      } else {
        console.log(collectField, data);
      }

      this.data = data.map((collectItem: any) => {
        const newEntity = new instanceClass(instance);
        return newEntity.patch(collectItem, null);
      });

      return this;
    } else {
      throw Error(result.toString());
    }
  }

  async delete(id: number | string | null) {
    this.setDefaultParams();
    if (!id) {
      if (!this.data?.ID || !this.data?.id) {
        throw Error(`Erro ao tentar deletar ${this.constructor.name}, ID não foi passado.`);
      }
    }
    return;
  }
}
