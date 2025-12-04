import { ConnectorBuilder } from "../../builders/im/ConnectorBuilder.builder.js";
/**
 * Classe que representa um conector personalizado no módulo Open Lines do Bitrix24.
 * Estende funcionalidades da classe BitrixBuilder.
 */
export class Connector extends ConnectorBuilder {
    /**
     * Registra um novo conector personalizado no Bitrix24.
     *
     * Endpoint: `imconnector.register`
     *
     * @param registerBuilder Objeto de dados ou builder para o registro do conector
     * @returns Resultado da requisição PATCH
     */
    async register(registerBuilder) {
        return await this.requestAndPatch("imconnector.register", registerBuilder);
    }
    /**
     * Remove o registro de um conector existente.
     *
     * Endpoint: `imconnector.unregister`
     *
     * @param id ID do conector (string ou número)
     * @returns Resultado da requisição PATCH
     */
    async unregister(id) {
        return await this.requestAndPatch("imconnector.unregister", {
            ID: id,
        });
    }
    /**
     * Ativa ou desativa um canal específico em uma linha do Open Line.
     *
     * Endpoint: `imconnector.status.set`
     *
     * @param connector ID do conector
     * @param line ID da linha do canal aberto
     * @param active Define se estará ativo ('Y') ou inativo ('N')
     */
    async activate(connectorId, lineId, active) {
        const payload = {
            CONNECTOR: connectorId,
            LINE: lineId,
            ACTIVE: active,
        };
        return await this.requestData("imconnector.activate", payload);
    }
    /**
     * Define os dados de exibição e comportamento do canal do conector.
     *
     * Endpoint: `imconnector.connector.data.set`
     *
     * @param datasetBuilder Objeto com os dados do canal
     * @returns Resultado da requisição PATCH
     */
    async setConnectorDataset(datasetBuilder) {
        return await this.requestAndPatch("imconnector.connector.data.set", datasetBuilder);
    }
    async updateReadStatus({ ...config }) {
        const { connectorId, lineId, messages } = config;
        return await this.requestAndPatch("imconnector.connector.data.set", {
            CONNECTOR: connectorId, // ex: 'whatsapp', 'facebook', etc.
            LINE: lineId, // ex: 'livechat_1' ou ID da Open Line
            MESSAGES: messages,
        });
    }
    /**
     * Consulta o status atual do conector.
     *
     * Endpoint: `imconnector.status`
     */
    getStatus() {
        // implementação futura
    }
    /**
     * Adiciona um widget ao conector.
     */
    addWidget() {
        // implementação futura
    }
    // ===== Eventos do conector =====
    /**
     * Manipulador do evento de exclusão da linha do conector.
     */
    onImConnectorLineDelete() {
        // implementação futura
    }
    /**
     * Manipulador do evento de exclusão de status do conector.
     */
    onImConnectorStatusDelete() {
        // implementação futura
    }
    // ===== Mensagens =====
    /**
     * Envia mensagens através do conector.
     */
    async sendMessages(connectorId, lineId, messages) {
        const payload = {
            CONNECTOR: connectorId,
            LINE: lineId,
            MESSAGES: messages.MESSAGES,
        };
        return await this.requestAndPatch("imconnector.send.messages", payload);
    }
    /**
     * Atualiza uma mensagem já enviada.
     */
    updateMessage() {
        // implementação futura
    }
    /**
     * Remove uma mensagem enviada anteriormente.
     */
    deleteMessage() {
        // implementação futura
    }
    /**
     * Atualiza o status de entrega ou leitura da mensagem.
     *
     * @param status Novo status da mensagem ('delivered' ou 'read')
     */
    updateStatus(status) {
        // implementação futura
    }
    // ===== Chat =====
    /**
     * Troca nome do chat
     */
    async changeChatName(connectorId, lineId, chatId, name) {
        const payload = {
            CONNECTOR: connectorId,
            LINE: lineId,
            CHAT_ID: chatId,
            NAME: name,
        };
        return await this.requestAndPatch("imconnector.chat.name.set", payload);
    }
}
