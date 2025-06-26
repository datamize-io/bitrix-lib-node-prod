import { B24Hook } from "@bitrix24/b24jssdk";
/**
 * Representa uma instância de conexão com a API REST do Bitrix24.
 * Permite autenticação via token ou webhook, injeção de parâmetros padrão
 * e chamadas de métodos REST individuais ou em lote.
 */
export class BitrixInstance {
    /**
     * Cria uma nova instância do BitrixInstance.
     *
     * @param secretObject Objeto de configuração do B24Hook ou instância existente.
     */
    constructor(secretObject) {
        /**
         * Parâmetros que serão automaticamente injetados em todas as requisições.
         */
        this.paramsToInject = {};
        console.log(secretObject);
        const clientId = (this.client = secretObject instanceof B24Hook ? secretObject : new B24Hook(secretObject));
    }
    /**
     * Cria uma instância de uma entidade, injetando esta conexão.
     *
     * @param Entity Classe da entidade (ex: Deal, Contact, etc.)
     * @returns Instância da entidade com acesso ao BitrixInstance.
     */
    entity(Entity) {
        return new Entity(this);
    }
    /**
     * Retorna o token de autenticação atual (se implementado).
     */
    getClientToken() { }
    /**
     * Define o token de acesso (OAuth) para autenticação nas requisições.
     *
     * @param accessToken Token de acesso do Bitrix24
     * @returns A própria instância
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        return this;
    }
    /**
     * Define os parâmetros que serão injetados por padrão em todas as requisições.
     *
     * @param paramsToInject Objeto com os parâmetros padrão
     * @returns A própria instância
     */
    setDefaultParams(paramsToInject) {
        this.paramsToInject = paramsToInject || {};
        return this;
    }
    /**
     * Aplica os parâmetros padrão sobre os parâmetros fornecidos.
     *
     * @param params Parâmetros fornecidos para a requisição
     * @returns Objeto mesclado com os parâmetros padrão
     */
    getDefaultParams(params) {
        Object.keys(this.paramsToInject).forEach((param) => {
            const value = this.paramsToInject[param];
            if (params[param]) {
                if (Array.isArray(params[param]) && Array.isArray(value)) {
                    params[param] = params[param].concat(value);
                }
                else if (typeof params[param] === "object" && typeof value === "object") {
                    params[param] = Object.assign(params[param], value);
                }
            }
            else {
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
    async request(method, params, isBatch = false) {
        params = this.getDefaultParams(params);
        if (this.accessToken && !params.auth) {
            params.auth = this.accessToken;
        }
        console.log("Requesting:", method, params);
        if (isBatch) {
            return this.client.callBatch({ [method]: { method, params } });
        }
        else {
            return this.client.callMethod(method, params);
        }
    }
}
