import { OpenLineChatBuilder } from "../../builders/im/OpenLineChatBuilder.builder.js";
/**
 * Classe que representa uma interface de manipulação de chats do OpenLine (Canal Aberto) no Bitrix24.
 *
 * Permite buscar, criar e manipular sessões de chat associadas a entidades do CRM
 * (como Leads, Negócios, Contatos e Empresas).
 */
export declare class OpenLineChat extends OpenLineChatBuilder {
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
    getChatsByEntityId(entity: "lead" | "deal" | "contact" | "company", id: string | number, onlyActiveChats?: "Y" | "N"): Promise<any>;
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
    getLastChatIdByEntityId(entity: "LEAD" | "DEAL" | "CONTACT" | "COMPANY", id: string | number): Promise<any>;
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
    addUser(entity: "LEAD" | "DEAL" | "CONTACT" | "COMPANY", id: string | number, userId: string | number, chatId?: string | number): Promise<any>;
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
    removeUser(entity: "LEAD" | "DEAL" | "CONTACT" | "COMPANY", id: string | number, userId: string | number, chatId?: string | number): Promise<any>;
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
    collect(params?: any | null, method?: string | null, collectField?: string | null): Promise<any | this>;
}
