import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { EventInterface } from "../../interfaces/events/EventInterface.interface.js";
/**
 * Builder para facilitar a criação do payload do método `event.bind` da API do Bitrix24.
 * Suporta eventos do tipo online e offline.
 */
export declare class EventBindBuilder {
    private payload;
    /**
     * Define o nome do evento que será vinculado.
     * @param event Nome do evento (ex: 'OnCrmDealUpdate')
     */
    setEvent(event: string): this;
    /**
     * Define a URL que receberá os eventos (somente para eventos online).
     * @param handler URL pública que o Bitrix irá chamar
     */
    setHandler(handler: string): this;
    /**
     * Define o tipo de evento: online ou offline.
     * Por padrão é 'online'.
     * @param eventType 'online' ou 'offline'
     */
    setEventType(eventType: "online" | "offline"): this;
    /**
     * Define o ID do usuário que autoriza o evento.
     * @param userId ID do usuário (inteiro)
     */
    setAuthType(userId: number): this;
    /**
     * Define o auth_connector, usado em eventos offline.
     * Isso evita loops ou notificações desnecessárias.
     * @param connector Chave de origem, como 'erp-sync'
     */
    setAuthConnector(connector: string): this;
    /**
     * Define parâmetros adicionais (se o evento suportar).
     * @param options Objeto com configurações extras
     */
    setOptions(options: Record<string, any>): this;
    /**
     * Retorna o payload final para ser usado em `bitrix.callMethod('event.bind', payload)`
     */
    build(): Record<string, any>;
}
export declare abstract class EventBuilder extends BitrixBuilder implements EventInterface {
    AVAIBLE_EVENTS: Array<string>;
    get BindBuilder(): EventBindBuilder;
}
