/**
 * Representa as informações associadas a um chat de OpenLine no Bitrix24,
 * incluindo dados do CRM e detalhes do conector.
 */
export interface OpenLineChatInterface {
    /**
     * Tipo da entidade do CRM associada ao chat, como `LEAD`, `CONTACT`, `DEAL` ou `COMPANY`.
     *
     * Exemplo: `"LEAD"`
     */
    CRM_ENTITY_TYPE?: string;
    /**
     * ID da entidade do CRM (por exemplo, ID de lead ou contato).
     * Pode ser uma string ou número.
     *
     * Exemplo: `12345`
     */
    CRM_ENTITY?: string | number;
    /**
     * ID do usuário Bitrix24 participante do chat.
     *
     * Exemplo: `5021`
     */
    USER_ID?: string | number;
    /**
     * ID do chat interno associado à sessão do OpenLine.
     *
     * Exemplo: `87654321`
     */
    CHAT_ID?: string | number;
    /**
     * ID do conector usado na comunicação (ex: `telegram`, `facebook`, `livechat`).
     *
     * Exemplo: `"telegram"`
     */
    CONNECTOR_ID?: string;
    /**
     * Tipo do conector. Pode variar entre tipos internos ou externos.
     *
     * Exemplo: `"bot"` ou `"network"`
     */
    CONNECTOR_TYPE?: string;
    /**
     * Resultado da consulta ou operação relacionada ao chat.
     * Um array de objetos cada um contendo uma descrição do chat
     */
    result?: Record<string, any>[];
}
