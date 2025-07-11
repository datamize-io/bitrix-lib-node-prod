import { BitrixInstance } from "../models/BitrixInstance.js";

/**
 * Classe base para criação de builders Bitrix.
 * Define a estrutura comum de operações como get, insert, update, etc.
 */
export class BitrixBuilder {
  protected instance: BitrixInstance;
  protected static instance: BitrixInstance;
  protected prefixDefault: string | null = null;
  protected data: any = {};
  protected selectFields: string[] = [];
  protected filterFields: any = {};
  protected defaultParams: any = {};
  protected changedData: any = {};

  /**
   * Define a instância global do Bitrix e retorna uma nova instância do builder.
   * @param bitrixInstance Instância do Bitrix
   * @internal
   */
  static setInstance(bitrixInstance: BitrixInstance): BitrixBuilder {
    this.instance = bitrixInstance;
    return new this(this.instance);
  }

  /**
   * Construtor base.
   * @param bitrixInstance Instância do Bitrix
   * @internal
   */
  constructor(bitrixInstance: BitrixInstance) {
    this.instance = bitrixInstance;
    return this;
  }

  /** @internal */
  setSelectItems(selectByFields: string[]): this {
    this.selectFields = selectByFields;
    return this;
  }

  /** @internal */
  setSelectItem(selectByField: string): this {
    this.selectFields.push(selectByField);
    return this;
  }

  /** @internal */
  setFilterItems(filterByFields: any): this {
    this.filterFields = filterByFields;
    return this;
  }

  /** @internal */
  setFilterItem(filterByField: string, valueFromFilter: any): this {
    this.filterFields[filterByField] = valueFromFilter;
    return this;
  }

  /** @internal */
  setDataItem(field: string, value: any): this {
    this.data = this.getData() || {};
    this.changedData = this.changedData || {};
    this.data[field] = value;
    this.changedData[field] = value;
    return this;
  }

  /** @internal */
  setData(data: any): this {
    this.data = data;
    return this;
  }

  /** @internal */
  getData(): any {
    return this.data;
  }

  /** @internal */
  setId(id: string | number): this {
    if (!this.data) {
      this.data = {};
    }
    this.data.ID = id;
    return this;
  }

  /** @internal */
  setDefaultParams() {
    this.instance.setDefaultParams(this.defaultParams || {});
    return this;
  }

  /** @internal */
  setField(field: string, value: any): this {
    console.log("Setting field %s value %s", field, value);
    this.changedData = this.changedData || {};
    this.data = this.data || {};
    this.data.fields = this.data.fields || {};
    this.changedData.fields = this.changedData.fields || {};

    this.data.fields[field] = value;
    this.changedData.fields[field] = value;
    return this;
  }

  /**
   * Busca um item no Bitrix por ID.
   * @param id Identificador do item
   * @param method Método opcional da API
   * @internal
   */
  async get<T = any>(id: string | number, method: string | null = null): Promise<T> {
    method = method || this.prefixDefault + ".get";
    return await this.requestAndPatch(method, { id });
  }

  /**
   * Realiza uma requisição genérica e aplica o patch nos dados.
   * @internal
   */
  async requestData<T = any>(method: string, params: any = {}, resultField?: string): Promise<T> {
    this.setDefaultParams();
    try {
      const result = await this.instance.request(method, params);
      if (result.isSuccess) {
        return resultField ? result.getData()[resultField] : result.getData();
      } else {
        // Aqui usamos a interface IResult do SDK
        const errorMessages = result.getErrorMessages(); // array de strings
        throw new Error(errorMessages.join("; ") || "Erro desconhecido do Bitrix");
      }
    } catch (error: any) {
      const message = error.response?.data || error.response?.data || error.message || "Erro desconhecido";

      throw new Error(message);
    }
  }

  /**
   * Realiza uma requisição genérica e aplica o patch nos dados.
   * @internal
   */
  async requestAndPatch<T = any>(method: string, params: any = {}, resultField: string = "result"): Promise<T> {
    this.setDefaultParams();
    try {
      const result = await this.instance.request(method, params);
      if (result.isSuccess) {
        return this.patch(result.getData(), resultField);
      } else {
        // Aqui usamos a interface IResult do SDK
        const errorMessages = result.getErrorMessages(); // array de strings
        throw new Error(errorMessages.join("; ") || "Erro desconhecido do Bitrix");
      }
    } catch (error: any) {
      const message = error.response?.data || error.response?.data || error.message || "Erro desconhecido";

      throw new Error(message);
    }
  }

  /**
   * Atualiza os dados internos da instância com o resultado da requisição.
   * @internal
   */
  patch(params: any, field: string | null = "result"): any {
    this.data = field ? params[field] : params;
    return this;
  }

  /**
   * Insere dados no Bitrix.
   * @internal
   */
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

  /**
   * Decide entre insert ou update com base no ID existente.
   * @internal
   */
  async save(params: any | null = null, method: string | null = null): Promise<any> {
    this.setDefaultParams();
    if (this.data.ID || this.data.id) {
      return await this.update(params, method);
    } else {
      return await this.insert(params, method);
    }
  }

  /**
   * Atualiza dados no Bitrix.
   * @internal
   */
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

  /**
   * Coleta dados da API e mapeia para instâncias da classe.
   * @internal
   */
  async collect(params: any | null = null, method: string | null = null, collectField: string | null = "result"): Promise<any | this> {
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
        data = this.data ? [data] : [];
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

  /**
   * Exclui um item por ID.
   * @internal
   */
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
