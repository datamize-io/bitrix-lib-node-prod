import { ItemBuilder } from "./ItemBuilder.builder.js";
/**
 * Classe abstrata para construção de entidades de contato no CRM do Bitrix.
 * Fornece métodos para definir campos padrão e personalizados de um contato.
 */
export class ContactBuilder extends ItemBuilder {
    constructor() {
        super(...arguments);
        /**
         * Parâmetros padrão utilizados nas operações de contato.
         * - entityTypeId: Identificador do tipo de entidade (padrão 2 para contato).
         * - useOriginalUfNames: Indica se deve usar os nomes originais dos campos personalizados.
         * - select: Campos a serem selecionados na consulta (padrão todos).
         */
        this.defaultParams = {
            entityTypeId: 3,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
    /**
     * Define um campo multi-valor (FM) para o contato, como telefone, e-mail, web, etc.
     * @param typeId Tipo do campo (ex: "PHONE", "EMAIL", "WEB", "IM", "LINK").
     * @param valueType Tipo do valor (ex: "WORK", "HOME").
     * @param value Valor do campo.
     * @param id (Opcional) Identificador do campo.
     * @returns A instância atual do builder.
     */
    setFmField(typeId, valueType, value, id) {
        this.data.fm = this.data.fm || {};
        const sortNumber = Object.keys(this.data.fm).length;
        this.data.fm[sortNumber] = { id, value, valueType, typeId };
        return this;
    }
    /**
     * Define um e-mail para o contato.
     * @param value Endereço de e-mail.
     * @param type Tipo do e-mail ("WORK", "HOME", "MAILING" ou "OTHER").
     * @returns A instância atual do builder.
     */
    setEmail(value, type) {
        this.setFmField("EMAIL", type, value);
        return this;
    }
    /**
     * Define um telefone para o contato.
     * @param value Número de telefone.
     * @param type Tipo do telefone ("WORK", "MOBILE", "FAX", "HOME", "PAGER", "MAILING" ou "OTHER").
     * @returns A instância atual do builder.
     */
    setPhone(value, type) {
        this.setFmField("PHONE", type, value);
        return this;
    }
    /**
     * Define o nome do contato.
     * @param value Nome do contato.
     * @returns A instância atual do builder.
     */
    setName(value) {
        this.setField("name", value);
        return this;
    }
    /**
     * Define o sobrenome do contato.
     * @param value Sobrenome do contato.
     * @returns A instância atual do builder.
     */
    setLastName(value) {
        this.setField("lastName", value);
        return this;
    }
    /**
     * Define o usuário responsável pelo contato.
     * @param value ID do usuário ou objeto com método getData().
     * @returns A instância atual do builder.
     */
    setUser(value) {
        const userId = typeof value === "object" ? value.getData().ID : value;
        this.setField("assignedById", userId);
        return this;
    }
}
