import { OpenLineChatBuilder } from "../../builders/im/OpenLineChatBuilder.builder.js";
/**
 * Classe que representa uma interface de manipulação de chats do OpenLine (Canal Aberto) no Bitrix24.
 *
 * Permite buscar, criar e manipular sessões de chat associadas a entidades do CRM
 * (como Leads, Negócios, Contatos e Empresas).
 */
export class OpenLineChat extends OpenLineChatBuilder {
    /**
     * Retorna todos os chats relacionados a uma entidade do CRM (lead, deal, contact, company).
     *
     * @param entity - Tipo da entidade do CRM (minúsculo): `"lead"`, `"deal"`, `"contact"`, `"company"`.
     * @param id - ID da entidade.
     * @param onlyActiveChats - Define se apenas chats ativos devem ser retornados. `"Y"` (default) ou `"N"`.
     * @returns Lista de sessões de chat relacionadas à entidade.
     *
     * @example
     * ```ts
     * await openLine.getChatsByEntityId("lead", 12345);
     * ```
     */
    async getChatsByEntityId(entity, id, onlyActiveChats = "Y") {
        return await this.requestAndPatch("imopenlines.crm.chat.get", {
            CRM_ENTITY_TYPE: entity,
            CRM_ENTITY: id,
            ACTIVE_ONLY: onlyActiveChats,
        });
    }
    async searchChat(findQuery) {
        return await this.requestAndPatch("im.search.chat.list", {
            FIND: findQuery,
        });
    }
    /**
     * Obtém o ID do último chat aberto relacionado à entidade do CRM.
     *
     * @param entity - Tipo da entidade do CRM (maiúsculo): `"LEAD"`, `"DEAL"`, `"CONTACT"`, `"COMPANY"`.
     * @param id - ID da entidade.
     * @returns Último CHAT_ID relacionado à entidade.
     *
     * @example
     * ```ts
     * const lastChatId = await openLine.getLastChatIdByEntityId("LEAD", 456);
     * ```
     */
    async getLastChatIdByEntityId(entity, id) {
        return await this.requestAndPatch("imopenlines.crm.chat.getLastId", {
            CRM_ENTITY_TYPE: entity,
            CRM_ENTITY: id,
        });
    }
    /**
     * Adiciona um usuário a um chat de OpenLine relacionado a uma entidade do CRM.
     *
     * @param entity - Tipo da entidade do CRM (maiúsculo).
     * @param id - ID da entidade.
     * @param userId - ID do usuário a ser adicionado ao chat.
     * @param chatId - (Opcional) ID do chat. Se omitido, será utilizado o chat atual da instância.
     * @returns Resultado da requisição.
     *
     * @example
     * ```ts
     * await openLine.addUser("DEAL", 789, 1001);
     * ```
     */
    async addUser(entity, id, userId, chatId) {
        chatId = chatId || this.getData()["CHAT_ID"];
        return await this.requestData("imopenlines.crm.chat.user.add", {
            CRM_ENTITY_TYPE: entity,
            CRM_ENTITY: id,
            USER_ID: userId,
            CHAT_ID: chatId,
        }, "result");
    }
    /**
     * Remove um usuário de um chat de OpenLine relacionado a uma entidade do CRM.
     *
     * @param entity - Tipo da entidade do CRM (maiúsculo).
     * @param id - ID da entidade.
     * @param userId - ID do usuário a ser removido do chat.
     * @param chatId - (Opcional) ID do chat. Se omitido, será utilizado o chat atual da instância.
     * @returns Resultado da requisição.
     *
     * @example
     * ```ts
     * await openLine.removeUser("CONTACT", 999, 1001);
     * ```
     */
    async removeUser(entity, id, userId, chatId) {
        chatId = chatId || this.getData()["CHAT_ID"];
        return await this.requestData("imopenlines.crm.chat.user.delete", {
            CRM_ENTITY_TYPE: entity,
            CRM_ENTITY: id,
            USER_ID: userId,
            CHAT_ID: chatId,
        }, "result");
    }
    /**
     * Realiza a coleta de dados de chat via método `imopenlines.crm.chat.get`.
     *
     * @param params - Parâmetros para a requisição (ex: filtros por entidade).
     * @param method - (Opcional) Nome do método a ser sobrescrito (default: `"imopenlines.crm.chat.get"`).
     * @param collectField - Campo da resposta onde os dados devem ser extraídos (default: `"result"`).
     * @returns Dados coletados ou instância da classe, dependendo da implementação do builder.
     *
     * @example
     * ```ts
     * const chats = await openLine.collect({ CRM_ENTITY_TYPE: "LEAD" });
     * ```
     */
    async collect(params, method, collectField = "result.items") {
        params = params || {};
        params.SKIP_CHAT = "Y";
        params.SKIP_DIALOG = "Y";
        return await super.collect(params, "im.recent.list", collectField);
    }
}
