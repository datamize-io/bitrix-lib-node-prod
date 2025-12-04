import { ConnectorBuilder, ConnectorRegisterBuilder } from "../../builders/im/ConnectorBuilder.builder.js";
import { ConnectorRegister, ConnectorDataSet, ConnectorSendMessagesInterface } from "../../interfaces/im/ConnectorInterface.interface.js";
/**
 * Classe que representa um conector personalizado no módulo Open Lines do Bitrix24.
 * Estende funcionalidades da classe BitrixBuilder.
 */
export declare class Connector extends ConnectorBuilder {
    /**
     * Registra um novo conector personalizado no Bitrix24.
     *
     * Endpoint: `imconnector.register`
     *
     * @param registerBuilder Objeto de dados ou builder para o registro do conector
     * @returns Resultado da requisição PATCH
     */
    register(registerBuilder: ConnectorRegister | ConnectorRegisterBuilder): Promise<any>;
    /**
     * Remove o registro de um conector existente.
     *
     * Endpoint: `imconnector.unregister`
     *
     * @param id ID do conector (string ou número)
     * @returns Resultado da requisição PATCH
     */
    unregister(id: string | number): Promise<any>;
    /**
     * Ativa ou desativa um canal específico em uma linha do Open Line.
     *
     * Endpoint: `imconnector.status.set`
     *
     * @param connector ID do conector
     * @param line ID da linha do canal aberto
     * @param active Define se estará ativo ('Y') ou inativo ('N')
     */
    activate(connectorId: string, lineId: string | number, active: "Y" | "N"): Promise<any>;
    /**
     * Define os dados de exibição e comportamento do canal do conector.
     *
     * Endpoint: `imconnector.connector.data.set`
     *
     * @param datasetBuilder Objeto com os dados do canal
     * @returns Resultado da requisição PATCH
     */
    setConnectorDataset(datasetBuilder: ConnectorDataSet): Promise<any>;
    updateReadStatus({ ...config }: {
        [x: string]: any;
    }): Promise<any>;
    /**
     * Consulta o status atual do conector.
     *
     * Endpoint: `imconnector.status`
     */
    getStatus(): void;
    /**
     * Adiciona um widget ao conector.
     */
    addWidget(): void;
    /**
     * Manipulador do evento de exclusão da linha do conector.
     */
    onImConnectorLineDelete(): void;
    /**
     * Manipulador do evento de exclusão de status do conector.
     */
    onImConnectorStatusDelete(): void;
    /**
     * Envia mensagens através do conector.
     */
    sendMessages(connectorId: string, lineId: string | number, messages: ConnectorSendMessagesInterface): Promise<any>;
    /**
     * Atualiza uma mensagem já enviada.
     */
    updateMessage(): void;
    /**
     * Remove uma mensagem enviada anteriormente.
     */
    deleteMessage(): void;
    /**
     * Atualiza o status de entrega ou leitura da mensagem.
     *
     * @param status Novo status da mensagem ('delivered' ou 'read')
     */
    updateStatus(status: "delivered" | "read"): void;
    /**
     * Troca nome do chat
     */
    changeChatName(connectorId: string, lineId: string | number, chatId: string | number, name: string): Promise<any>;
}
