import { ItemBuilder } from "./ItemBuilder.builder.js";
/**
 * Classe abstrata para construção de entidades de contato no CRM do Bitrix.
 * Fornece métodos para definir campos padrão e personalizados de um contato.
 */
export declare abstract class ContactBuilder extends ItemBuilder {
    /**
     * Parâmetros padrão utilizados nas operações de contato.
     * - entityTypeId: Identificador do tipo de entidade (padrão 2 para contato).
     * - useOriginalUfNames: Indica se deve usar os nomes originais dos campos personalizados.
     * - select: Campos a serem selecionados na consulta (padrão todos).
     */
    protected defaultParams: Record<string, any | null>;
    /**
     * Define um campo multi-valor (FM) para o contato, como telefone, e-mail, web, etc.
     * @param typeId Tipo do campo (ex: "PHONE", "EMAIL", "WEB", "IM", "LINK").
     * @param valueType Tipo do valor (ex: "WORK", "HOME").
     * @param value Valor do campo.
     * @param id (Opcional) Identificador do campo.
     * @returns A instância atual do builder.
     */
    setFmField(typeId: "PHONE" | "EMAIL" | "WEB" | "IM" | "LINK", valueType: string, value: string, id?: string): this;
    /**
     * Define um e-mail para o contato.
     * @param value Endereço de e-mail.
     * @param type Tipo do e-mail ("WORK", "HOME", "MAILING" ou "OTHER").
     * @returns A instância atual do builder.
     */
    setEmail(value: string, type: "WORK" | "HOME" | "MAILING" | "OTHER"): this;
    /**
     * Define um telefone para o contato.
     * @param value Número de telefone.
     * @param type Tipo do telefone ("WORK", "MOBILE", "FAX", "HOME", "PAGER", "MAILING" ou "OTHER").
     * @returns A instância atual do builder.
     */
    setPhone(value: any, type: "WORK" | "MOBILE" | "FAX" | "HOME" | "PAGER" | "MAILING" | "OTHER"): this;
    /**
     * Define o nome do contato.
     * @param value Nome do contato.
     * @returns A instância atual do builder.
     */
    setName(value: any): this;
    /**
     * Define o sobrenome do contato.
     * @param value Sobrenome do contato.
     * @returns A instância atual do builder.
     */
    setLastName(value: any): this;
    /**
     * Define o usuário responsável pelo contato.
     * @param value ID do usuário ou objeto com método getData().
     * @returns A instância atual do builder.
     */
    setUser(value: any): this;
}
