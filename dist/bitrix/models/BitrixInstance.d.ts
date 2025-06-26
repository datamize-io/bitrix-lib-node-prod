import { B24Hook, B24HookParams, Result } from "@bitrix24/b24jssdk";
/**
 * Representa uma instância de conexão com a API REST do Bitrix24.
 * Permite autenticação via token ou webhook, injeção de parâmetros padrão
 * e chamadas de métodos REST individuais ou em lote.
 */
export declare class BitrixInstance {
    /**
     * Cliente do SDK Bitrix24 configurado com o webhook ou token.
     */
    private client;
    /**
     * Parâmetros que serão automaticamente injetados em todas as requisições.
     */
    private paramsToInject;
    /**
     * Token de acesso OAuth, quando utilizado.
     */
    private accessToken;
    /**
     * Cria uma nova instância do BitrixInstance.
     *
     * @param secretObject Objeto de configuração do B24Hook ou instância existente.
     */
    constructor(secretObject: B24HookParams | B24Hook);
    /**
     * Cria uma instância de uma entidade, injetando esta conexão.
     *
     * @param Entity Classe da entidade (ex: Deal, Contact, etc.)
     * @returns Instância da entidade com acesso ao BitrixInstance.
     */
    entity(Entity: any): any;
    /**
     * Retorna o token de autenticação atual (se implementado).
     */
    getClientToken(): void;
    /**
     * Define o token de acesso (OAuth) para autenticação nas requisições.
     *
     * @param accessToken Token de acesso do Bitrix24
     * @returns A própria instância
     */
    setAccessToken(accessToken: string): this;
    /**
     * Define os parâmetros que serão injetados por padrão em todas as requisições.
     *
     * @param paramsToInject Objeto com os parâmetros padrão
     * @returns A própria instância
     */
    setDefaultParams(paramsToInject: any): this;
    /**
     * Aplica os parâmetros padrão sobre os parâmetros fornecidos.
     *
     * @param params Parâmetros fornecidos para a requisição
     * @returns Objeto mesclado com os parâmetros padrão
     */
    getDefaultParams(params: Record<string, any>): Record<string, any>;
    /**
     * Realiza uma requisição para a API REST do Bitrix24.
     *
     * @param method Nome do método (ex: 'crm.deal.add')
     * @param params Parâmetros do método
     * @param isBatch Define se a chamada será feita em batch
     * @returns Resultado da requisição encapsulado em `Result`
     */
    request(method: string, params: Record<string, any>, isBatch?: boolean): Promise<Result>;
}
