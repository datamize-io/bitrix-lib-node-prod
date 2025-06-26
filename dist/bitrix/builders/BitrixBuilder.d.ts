import { BitrixInstance } from "../BitrixInstance.js";
import { BitrixBuilderInterface } from "../interfaces/BitrixBuilder.interface.js";
/**
 * Classe base para builders de entidades do Bitrix24.
 * Fornece métodos utilitários para setar filtros, campos, realizar requisições,
 * e montar objetos com a estrutura esperada pelo Bitrix REST API.
 */
export declare class BitrixBuilder implements BitrixBuilderInterface {
    protected instance: BitrixInstance;
    protected static instance: BitrixInstance;
    protected prefixDefault: string | null;
    protected data: any;
    protected selectFields: string[];
    protected filterFields: any;
    protected defaultParams: any;
    protected changedData: any;
    /**
     * @internal
     */
    static setInstance(bitrixInstance: BitrixInstance): BitrixBuilder;
    /**
     * @internal
     */
    constructor(bitrixInstance: BitrixInstance);
    /**
     * @internal
     */
    setSelectItems(selectByFields: string[]): this;
    /**
     * @internal
     */
    setSelectItem(selectByField: string): this;
    /**
     * @internal
     */
    setFilterItems(filterByFields: any): this;
    /**
     * @internal
     */
    setFilterItem(filterByField: string, valueFromFilter: any): this;
    /**
     * @internal
     */
    setDataItem(field: string, value: any): this;
    /**
     * @internal
     */
    setData(data: any): this;
    /**
     * @internal
     */
    getData(): any;
    /**
     * @internal
     */
    setId(id: string | number): this;
    /**
     * @internal
     */
    setDefaultParams(): this;
    /**
     * @internal
     */
    setField(field: string, value: any): this;
    /**
     * @internal
     */
    get<T = any>(id: string | number, method?: string | null): Promise<T>;
    /**
     * @internal
     */
    requestAndPatch<T = any>(method: string, params?: any, resultField?: string): Promise<T>;
    /**
     * @internal
     */
    patch(params: any, field?: string | null): any;
    /**
     * @internal
     */
    insert(params: any, method?: string | null): Promise<any>;
    /**
     * @internal
     */
    save(params?: any | null, method?: string | null): Promise<any>;
    /**
     * @internal
     */
    update(params?: any | null, method?: string | null): Promise<any>;
    /**
     * @internal
     */
    collect(params?: any | null, method?: string | null, collectField?: string | null): Promise<any | this>;
    /**
     * @internal
     */
    delete(id: number | string | null): Promise<void>;
}
