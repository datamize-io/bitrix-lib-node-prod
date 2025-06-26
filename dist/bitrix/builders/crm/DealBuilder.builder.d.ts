import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export declare abstract class DealBuilder extends BitrixBuilder {
    protected defaultParams: Record<string, any | null>;
    /**
     * Define um contato principal para a negociação.
     *
     * @param value Objeto ou ID do contato
     * @returns A própria instância da negociação
     */
    setContact(value: any): DealBuilder;
    /**
     * Define múltiplos contatos para a negociação.
     *
     * @param value Lista de objetos ou IDs dos contatos
     * @returns A própria instância da negociação
     */
    setContacts(value: any[]): DealBuilder;
    /**
     * Define o nome/título da negociação.
     *
     * @param value Nome ou título
     * @returns A própria instância da negociação
     */
    setName(value: any): DealBuilder;
    /**
     * Define o pipeline (categoria) da negociação.
     *
     * @param value Objeto ou ID da categoria
     * @returns A própria instância da negociação
     */
    setPipeline(value: any): DealBuilder;
    /**
     * Define a etapa do funil para a negociação.
     *
     * @param value Objeto ou ID da etapa
     * @returns A própria instância da negociação
     */
    setStage(value?: any): DealBuilder;
    /**
     * Define o valor financeiro da negociação.
     *
     * @param value Valor monetário
     * @param currency Código da moeda (padrão: 'BRL')
     * @returns A própria instância da negociação
     */
    setValue(value: any, currency?: string): DealBuilder;
    /**
     * Define a moeda da negociação.
     *
     * @param value Código da moeda (padrão: 'BRL')
     * @returns A própria instância da negociação
     */
    setCurrency(value?: string): DealBuilder;
    /**
     * Define o status de visibilidade da negociação.
     *
     * @param value `true` para visível, `false` para oculta
     * @returns A própria instância da negociação
     */
    setStatus(value?: boolean): DealBuilder;
    /**
     * Define o identificador de origem da negociação.
     *
     * @param value ID da origem
     * @returns A própria instância da negociação
     */
    setOriginId(value: any): DealBuilder;
    /**
     * Define a origem da negociação com base em dados externos.
     *
     * @param value Objeto com ID da origem
     * @returns A própria instância da negociação
     */
    setSource(value: any): DealBuilder;
    /**
     * Define parâmetros de rastreamento UTM para a negociação.
     *
     * @param utms Objeto com dados UTM
     * @returns A própria instância da negociação
     */
    setTrack(utms: any): DealBuilder;
    /**
     * Define um campo da negociação com suporte a campos personalizados.
     *
     * @param field Nome do campo
     * @param value Valor a ser definido
     * @returns A própria instância da negociação
     */
    setField(field: string, value: any): this;
    /**
     * Define o responsável (usuário) pela negociação.
     *
     * @param value Objeto ou ID do usuário
     * @returns A própria instância da negociação
     */
    setUser(value: any): DealBuilder;
}
