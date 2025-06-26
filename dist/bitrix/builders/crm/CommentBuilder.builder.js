import { BitrixBuilder } from "../BitrixBuilder.builder.js";
/**
 * Classe abstrata para construção de entidades de comentário no CRM do Bitrix.
 * Fornece métodos para definir o tipo de entidade, proprietário e texto do comentário.
 * Implementa a interface CommentInterface.
 */
export class CommentBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        /**
         * Prefixo padrão para chamadas de API relacionadas a comentários.
         */
        this.prefixDefault = "crm.timeline.comment";
        /**
         * Armazenamento interno dos campos do comentário.
         */
        this.data = {};
    }
    /**
     * Define a entidade como um Negócio (Deal).
     * @param value O ID do negócio ou um objeto contendo os dados do negócio.
     * @returns A instância atual do builder.
     */
    setDeal(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "DEAL");
        this.setField("OWNER_TYPE_ID", 2); // Deal
        return this;
    }
    /**
     * Define a entidade como um item genérico.
     * @param value O ID do item ou um objeto contendo os dados do item.
     * @param type O tipo da entidade como string.
     * @param typeId O ID do tipo da entidade como número.
     * @returns A instância atual do builder.
     */
    setItem(value, type, typeId) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", type);
        this.setField("OWNER_TYPE_ID", typeId);
        return this;
    }
    /**
     * Define a entidade como um Contato.
     * @param value O ID do contato ou um objeto contendo os dados do contato.
     * @returns A instância atual do builder.
     */
    setContact(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "CONTACT");
        this.setField("OWNER_TYPE_ID", 3); // Contact
        return this;
    }
    /**
     * Define a entidade como um Lead.
     * @param value O ID do lead ou um objeto contendo os dados do lead.
     * @returns A instância atual do builder.
     */
    setLead(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "LEAD");
        this.setField("OWNER_TYPE_ID", 1); // Lead
        return this;
    }
    /**
     * Define o autor (proprietário) do comentário.
     * @param value O ID do autor ou um objeto contendo os dados do autor.
     * @returns A instância atual do builder.
     */
    setOwner(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("AUTHOR_ID", value);
        return this;
    }
    /**
     * Define o texto do comentário.
     * @param value O texto do comentário.
     * @returns A instância atual do builder.
     */
    setText(value) {
        this.setField("COMMENT", value);
        return this;
    }
}
