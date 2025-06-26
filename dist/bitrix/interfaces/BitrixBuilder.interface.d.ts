/**
 * Interface que define os métodos utilitários disponíveis no builder base do Bitrix24.
 * Pode ser implementada em subclasses como `Deal`, `Contact`, etc.,
 * para facilitar a documentação e garantir contratos consistentes.
 */
export interface BitrixBuilderInterface {
    /**
     * Define os campos a serem retornados em uma consulta.
     *
     * @param selectByFields Lista de nomes de campos
     * @returns A própria instância
     */
    setSelectItems(selectByFields: string[]): this;
    /**
     * Adiciona um campo à seleção atual.
     *
     * @param selectByField Nome do campo
     * @returns A própria instância
     */
    setSelectItem(selectByField: string): this;
    /**
     * Define múltiplos filtros para uma consulta.
     *
     * @param filterByFields Objeto contendo pares chave-valor para filtragem
     * @returns A própria instância
     */
    setFilterItems(filterByFields: any): this;
    /**
     * Adiciona um filtro individual.
     *
     * @param filterByField Nome do campo
     * @param valueFromFilter Valor do filtro
     * @returns A própria instância
     */
    setFilterItem(filterByField: string, valueFromFilter: any): this;
    /**
     * Define um valor direto no objeto `data`.
     *
     * @param field Campo a ser definido
     * @param value Valor do campo
     * @returns A própria instância
     */
    setDataItem(field: string, value: any): this;
    /**
     * Substitui completamente o objeto `data`.
     *
     * @param data Objeto de dados
     * @returns A própria instância
     */
    setData(data: any): this;
    /**
     * Retorna o objeto de dados atual.
     *
     * @returns Objeto de dados
     */
    getData(): any;
    /**
     * Define o ID da entidade no objeto `data`.
     *
     * @param id Identificador da entidade
     * @returns A própria instância
     */
    setId(id: string | number): this;
    /**
     * Define os parâmetros padrão para a instância do Bitrix.
     *
     * @returns A própria instância
     */
    setDefaultParams(): this;
    /**
     * Define um campo no formato esperado pela API (`fields`).
     *
     * @param field Nome do campo
     * @param value Valor do campo
     * @returns A própria instância
     */
    setField(field: string, value: any): this;
    /**
     * Realiza uma consulta para obter dados por ID.
     *
     * @param id Identificador da entidade
     * @param method Método da API (opcional)
     * @returns Dados retornados pela API
     */
    get<T = any>(id: string | number, method?: string | null): Promise<T>;
    /**
     * Executa uma requisição e aplica os dados ao objeto atual.
     *
     * @param method Nome do método da API
     * @param params Parâmetros da requisição
     * @param resultField Campo onde os dados estão localizados (padrão: "result")
     * @returns Dados extraídos e processados
     */
    requestAndPatch<T = any>(method: string, params?: any, resultField?: string): Promise<T>;
    /**
     * Substitui o objeto de dados atual com base na resposta da API.
     *
     * @param params Objeto de resposta
     * @param field Campo que contém os dados (padrão: "result")
     * @returns A própria instância
     */
    patch(params: any, field?: string | null): any;
    /**
     * Realiza a inserção de uma nova entidade no Bitrix.
     *
     * @param params Parâmetros da entidade
     * @param method Método da API (opcional)
     * @returns Objeto de resposta da inserção
     */
    insert(params: any, method?: string | null): Promise<any>;
    /**
     * Salva a entidade — atualiza se já houver ID, senão insere.
     *
     * @param params Dados a serem salvos
     * @param method Método da API (opcional)
     * @returns Objeto de resposta da operação
     */
    save(params?: any | null, method?: string | null): Promise<any>;
    /**
     * Atualiza uma entidade existente.
     *
     * @param params Dados a serem atualizados
     * @param method Método da API (opcional)
     * @returns Objeto de resposta
     */
    update(params?: any | null, method?: string | null): Promise<any>;
    /**
     * Coleta múltiplas entidades com base em filtros definidos.
     *
     * @param params Parâmetros adicionais da requisição
     * @param method Nome do método (padrão: "list")
     * @param collectField Campo onde estão os dados (padrão: "result")
     * @returns Lista de entidades ou a instância atual com os dados
     */
    collect(params?: any | null, method?: string | null, collectField?: string | null): Promise<any | this>;
    /**
     * Remove uma entidade do sistema.
     *
     * @param id Identificador da entidade a ser removida
     */
    delete(id: number | string | null): Promise<void> | void;
}
