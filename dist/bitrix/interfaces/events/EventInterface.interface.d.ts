/**
 * Interface para o payload aceito pelo método `event.bind` da API Bitrix24.
 */
export interface EventBindInterface {
    /**
     * Nome do evento a ser vinculado.
     * Ex: 'OnCrmDealUpdate'
     */
    event: string;
    /**
     * URL pública do handler que receberá as chamadas (apenas para eventos online).
     */
    handler?: string;
    /**
     * Tipo de evento: 'online' (padrão) ou 'offline'.
     */
    event_type?: "online" | "offline";
    /**
     * ID do usuário sob o qual o evento será autorizado.
     * Se não especificado, será o usuário que gerou o evento.
     */
    auth_type?: number;
    /**
     * Identificador do conector de autenticação para eventos offline.
     * Usado para evitar loops em integrações.
     */
    auth_connector?: string;
    /**
     * Parâmetros adicionais, se aplicável ao evento.
     */
    options?: Record<string, any>;
}
export interface EventInterface {
}
