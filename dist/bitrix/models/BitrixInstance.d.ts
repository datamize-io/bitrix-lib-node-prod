import { B24Hook, type B24HookParams, type B24OAuthSecret, Result } from "@bitrix24/b24jssdk";
/**
 * Classe responsável por gerenciar a instância de conexão com a API Bitrix24.
 * Permite configurar autenticação, parâmetros padrão, renovação de token OAuth e realizar requisições à API.
 */
export declare class BitrixInstance {
    private client;
    private paramsToInject;
    private accessToken;
    private refreshToken;
    private expiresAt?;
    private clientId?;
    private clientSecret?;
    private LOG?;
    private savePayloads?;
    /**
     * Cria uma nova instância do BitrixInstance.
     * @param secretObject Objeto de configuração do B24Hook ou uma instância já existente.
     */
    constructor(secretObject: B24HookParams | B24Hook);
    /**
     * Instancia uma entidade, injetando a instância atual como dependência.
     * @param Entity Classe da entidade a ser instanciada.
     * @returns Instância da entidade.
     */
    entity(Entity: any): any;
    /**
     * Define o access token OAuth manualmente.
     * @param accessToken Token de acesso.
     * @returns A instância atual para encadeamento.
     */
    setAccessToken(accessToken: string): this;
    /**
     * Define o refresh token OAuth manualmente.
     * @param refreshToken Token de atualização.
     * @returns A instância atual para encadeamento.
     */
    setRefreshToken(refreshToken: string): this;
    setLog(log?: boolean): this;
    setSavePayloads(value: boolean): this;
    /**
     * Define parâmetros padrão que serão injetados em todas as requisições.
     * @param paramsToInject Objeto com parâmetros padrão.
     * @returns A instância atual para encadeamento.
     */
    setDefaultParams(paramsToInject: Record<string, any>): this;
    /**
     * Aplica os parâmetros padrão aos parâmetros informados na requisição.
     * @param params Parâmetros da requisição.
     * @returns Parâmetros mesclados.
     */
    getDefaultParams(params: Record<string, any>): Record<string, any>;
    /**
     * Define as credenciais do OAuth (clientId e clientSecret).
     * @param param0 Objeto contendo clientId e clientSecret.
     * @returns A instância atual para encadeamento.
     */
    setOAuthSecret({ clientId, clientSecret }: B24OAuthSecret): this;
    /**
     * Define os dados de autenticação OAuth, incluindo tokens e tempo de expiração.
     * @param data Objeto com dados de autenticação.
     * @returns A instância atual para encadeamento.
     */
    setOAuthData(data: Record<string, any>): this;
    /**
     * Verifica se o token de acesso está expirado.
     * @returns True se expirado, false caso contrário.
     */
    private isTokenExpired;
    /**
     * Realiza a renovação do token de acesso OAuth utilizando o refresh token.
     * @throws Erro caso falte algum dado necessário ou a renovação falhe.
     */
    private refreshAccessToken;
    /**
     * Realiza uma requisição à API Bitrix24, renovando o token automaticamente se necessário.
     * @param method Nome do método da API.
     * @param params Parâmetros da requisição.
     * @param isBatch Indica se a chamada é em lote (batch).
     * @returns Resultado da requisição.
     */
    request(method: string, params: Record<string, any>, isBatch?: boolean): Promise<Result>;
}
