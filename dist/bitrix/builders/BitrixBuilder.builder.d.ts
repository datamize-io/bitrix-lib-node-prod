import { BitrixInstance } from "../models/BitrixInstance.js";
/**
 * Classe base para criação de builders Bitrix.
 * Define a estrutura comum de operações como get, insert, update, etc.
 */
export declare class BitrixBuilder {
    instance: BitrixInstance;
    static instance: BitrixInstance;
    protected prefixDefault: string | null;
    protected data: any;
    protected selectFields: string[];
    protected filterFields: any;
    protected defaultParams: any;
    protected changedData: any;
    /**
     * Define a instância global do Bitrix e retorna uma nova instância do builder.
     * @param bitrixInstance Instância do Bitrix
     * @internal
     */
    static setInstance(bitrixInstance: BitrixInstance): BitrixBuilder;
    /**
     * Construtor base.
     * @param bitrixInstance Instância do Bitrix
     * @internal
     */
    constructor(bitrixInstance: BitrixInstance);
    /** @internal */
    setSelectItems(selectByFields: string[]): this;
    /** @internal */
    setSelectItem(selectByField: string): this;
    /** @internal */
    setFilterItems(filterByFields: any): this;
    /** @internal */
    setFilterItem(filterByField: string, valueFromFilter: any): this;
    /** @internal */
    setDataItem(field: string, value: any): this;
    /** @internal */
    setData(data: any): this;
    /** @internal */
    getData(): any;
    /** @internal */
    setId(id: string | number): this;
    /** @internal */
    setDefaultParams(): this;
    /** @internal */
    setField(field: string, value: any): this;
    /**
     * Busca um item no Bitrix por ID.
     * @param id Identificador do item
     * @param method Método opcional da API
     * @internal
     */
    get<T = any>(id: string | number, method?: string | null): Promise<T>;
    /**
     * Realiza uma requisição genérica e aplica o patch nos dados.
     * @internal
     */
    requestData<T = any>(method: string, params?: any, resultField?: string): Promise<T>;
    /**
     * Realiza uma requisição genérica e aplica o patch nos dados.
     * @internal
     */
    requestAndPatch<T = any>(method: string, params?: any, resultField?: string): Promise<T>;
    /**
     * Atualiza os dados internos da instância com o resultado da requisição.
     * @internal
     */
    patch(params: any, field?: string | null): any;
    /**
     * Insere dados no Bitrix.
     * @internal
     */
    insert(params: any, method?: string | null): Promise<any>;
    /**
     * Decide entre insert ou update com base no ID existente.
     * @internal
     */
    save(params?: any | null, method?: string | null): Promise<any>;
    /**
     * Atualiza dados no Bitrix.
     * @internal
     */
    update(params?: any | null, method?: string | null): Promise<any>;
    collectProcessData(data: any, collectField?: string | null): any;
    /**
     * Coleta dados da API e mapeia para instâncias da classe.
     * @internal
     */
    collect(params?: any | null, method?: string | null, collectField?: string | null): Promise<any | this>;
    /**
     * Exclui um item por ID.
     * @internal
     */
    delete(id: number | string | null): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
    collectAll(parameters?: any, endpoint?: string | null, collectField?: string | null): Promise<any | this>;
    buildBatch(parameters: any | undefined, endpoint: string | null, start?: number, total?: any, limit?: number): Promise<any>;
}
