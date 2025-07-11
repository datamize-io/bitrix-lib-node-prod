import { B24Hook, type B24HookParams, type AuthData, type B24OAuthSecret, Result } from "@bitrix24/b24jssdk";

/**
 * Classe responsável por gerenciar a instância de conexão com a API Bitrix24.
 * Permite configurar autenticação, parâmetros padrão, renovação de token OAuth e realizar requisições à API.
 */
export class BitrixInstance {
  private client: B24Hook;
  private paramsToInject: Record<string, any> = {};

  private accessToken!: string;
  private refreshToken!: string;
  private expiresAt?: number;

  private clientId?: string;
  private clientSecret?: string;
  private LOG?: boolean = false;

  /**
   * Cria uma nova instância do BitrixInstance.
   * @param secretObject Objeto de configuração do B24Hook ou uma instância já existente.
   */
  constructor(secretObject: B24HookParams | B24Hook) {
    this.client = secretObject instanceof B24Hook ? secretObject : new B24Hook(secretObject);
  }

  /**
   * Instancia uma entidade, injetando a instância atual como dependência.
   * @param Entity Classe da entidade a ser instanciada.
   * @returns Instância da entidade.
   */
  entity(Entity: any): any {
    return new Entity(this);
  }

  /**
   * Define o access token OAuth manualmente.
   * @param accessToken Token de acesso.
   * @returns A instância atual para encadeamento.
   */
  setAccessToken(accessToken: string): this {
    this.accessToken = accessToken;
    return this;
  }

  /**
   * Define o refresh token OAuth manualmente.
   * @param refreshToken Token de atualização.
   * @returns A instância atual para encadeamento.
   */
  setRefreshToken(refreshToken: string): this {
    this.refreshToken = refreshToken;
    return this;
  }

  setLog(log: boolean = true) {
    this.LOG = log;
    return this;
  }

  /**
   * Define parâmetros padrão que serão injetados em todas as requisições.
   * @param paramsToInject Objeto com parâmetros padrão.
   * @returns A instância atual para encadeamento.
   */
  setDefaultParams(paramsToInject: Record<string, any>): this {
    this.paramsToInject = paramsToInject || {};
    return this;
  }

  /**
   * Aplica os parâmetros padrão aos parâmetros informados na requisição.
   * @param params Parâmetros da requisição.
   * @returns Parâmetros mesclados.
   */
  getDefaultParams(params: Record<string, any>): Record<string, any> {
    for (const param in this.paramsToInject) {
      const value = this.paramsToInject[param];

      if (params[param]) {
        if (Array.isArray(params[param]) && Array.isArray(value)) {
          params[param] = [...params[param], ...value];
        } else if (typeof params[param] === "object" && typeof value === "object") {
          params[param] = { ...params[param], ...value };
        }
      } else {
        params[param] = value;
      }
    }

    return params;
  }

  /**
   * Define as credenciais do OAuth (clientId e clientSecret).
   * @param param0 Objeto contendo clientId e clientSecret.
   * @returns A instância atual para encadeamento.
   */
  setOAuthSecret({ clientId, clientSecret }: B24OAuthSecret): this {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    return this;
  }

  /**
   * Define os dados de autenticação OAuth, incluindo tokens e tempo de expiração.
   * @param data Objeto com dados de autenticação.
   * @returns A instância atual para encadeamento.
   */
  setOAuthData(data: Record<string, any>): this {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.expiresAt = data.expires * 1000;
    return this;
  }

  /**
   * Verifica se o token de acesso está expirado.
   * @returns True se expirado, false caso contrário.
   */
  private isTokenExpired(): boolean {
    return !!this.expiresAt && Date.now() >= this.expiresAt;
  }

  /**
   * Realiza a renovação do token de acesso OAuth utilizando o refresh token.
   * @throws Erro caso falte algum dado necessário ou a renovação falhe.
   */
  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken || !this.clientId || !this.clientSecret) {
      throw new Error("Refresh token ou credenciais de OAuth ausentes.");
    }

    const response = await fetch("https://oauth.bitrix.info/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
      }).toString(),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_description || "Erro ao renovar o token OAuth.");
    }

    this.setOAuthData({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      member_id: data.member_id,
      domain: data.domain,
    });
  }

  /**
   * Realiza uma requisição à API Bitrix24, renovando o token automaticamente se necessário.
   * @param method Nome do método da API.
   * @param params Parâmetros da requisição.
   * @param isBatch Indica se a chamada é em lote (batch).
   * @returns Resultado da requisição.
   */
  async request(method: string, params: Record<string, any>, isBatch = false): Promise<Result> {
    params = this.getDefaultParams(params);

    if (this.accessToken && this.refreshToken) {
      if (this.isTokenExpired()) {
        console.log("Refreshing accessToken");
        await this.refreshAccessToken();
      } else {
        console.log("Not expired %s", new Date(this.expiresAt!).toLocaleString("pt-BR"));
      }
      params.auth = this.accessToken;
    }

    console.log(method, params);

    return isBatch ? this.client.callBatch({ [method]: { method, params } }) : this.client.callMethod(method, params);
  }
}
