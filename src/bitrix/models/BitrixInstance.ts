import { B24Hook, B24HookParams, Text, EnumCrmEntityTypeId, Result, type ISODate } from "@bitrix24/b24jssdk";

/**
 * Representa uma instância de conexão com a API REST do Bitrix24.
 * Permite autenticação via token ou webhook, injeção de parâmetros padrão
 * e chamadas de métodos REST individuais ou em lote.
 */
export class BitrixInstance {
  /**
   * Cliente do SDK Bitrix24 configurado com o webhook ou token.
   */
  private client: B24Hook;

  /**
   * Parâmetros que serão automaticamente injetados em todas as requisições.
   */
  private paramsToInject: Record<string, any> = {};

  /**
   * Token de acesso OAuth, quando utilizado.
   */
  private accessToken!: string;

  /**
   * Cria uma nova instância do BitrixInstance.
   *
   * @param secretObject Objeto de configuração do B24Hook ou instância existente.
   */
  constructor(secretObject: B24HookParams | B24Hook) {
    console.log(secretObject);
    const clientId = (this.client = secretObject instanceof B24Hook ? secretObject : new B24Hook(secretObject));
  }

  /**
   * Cria uma instância de uma entidade, injetando esta conexão.
   *
   * @param Entity Classe da entidade (ex: Deal, Contact, etc.)
   * @returns Instância da entidade com acesso ao BitrixInstance.
   */
  entity(Entity: any): any {
    return new Entity(this);
  }

  /**
   * Retorna o token de autenticação atual (se implementado).
   */
  getClientToken() {}

  /**
   * Define o token de acesso (OAuth) para autenticação nas requisições.
   *
   * @param accessToken Token de acesso do Bitrix24
   * @returns A própria instância
   */
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    return this;
  }

  /**
   * Define os parâmetros que serão injetados por padrão em todas as requisições.
   *
   * @param paramsToInject Objeto com os parâmetros padrão
   * @returns A própria instância
   */
  setDefaultParams(paramsToInject: any): this {
    this.paramsToInject = paramsToInject || {};
    return this;
  }

  /**
   * Aplica os parâmetros padrão sobre os parâmetros fornecidos.
   *
   * @param params Parâmetros fornecidos para a requisição
   * @returns Objeto mesclado com os parâmetros padrão
   */
  getDefaultParams(params: Record<string, any>): Record<string, any> {
    Object.keys(this.paramsToInject).forEach((param: string) => {
      const value = this.paramsToInject[param];

      if (params[param]) {
        if (Array.isArray(params[param]) && Array.isArray(value)) {
          params[param] = params[param].concat(value);
        } else if (typeof params[param] === "object" && typeof value === "object") {
          params[param] = Object.assign(params[param], value);
        }
      } else {
        params[param] = value;
      }
    });

    return params;
  }

  /**
   * Realiza uma requisição para a API REST do Bitrix24.
   *
   * @param method Nome do método (ex: 'crm.deal.add')
   * @param params Parâmetros do método
   * @param isBatch Define se a chamada será feita em batch
   * @returns Resultado da requisição encapsulado em `Result`
   */
  async request(method: string, params: Record<string, any>, isBatch: boolean = false): Promise<Result> {
    params = this.getDefaultParams(params);

    if (this.accessToken && !params.auth) {
      params.auth = this.accessToken;
    }
    console.log("Requesting:", method, params);
    if (isBatch) {
      return this.client.callBatch({ [method]: { method, params } });
    } else {
      return this.client.callMethod(method, params);
    }
  }
}
