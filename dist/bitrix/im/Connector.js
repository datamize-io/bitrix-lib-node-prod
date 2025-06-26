import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
import { ImConnectorRegisterBuilder } from "./ConnectorRegister.interface.js";
import { ImConnectorDataSetBuilder } from "./ConnectorSetData.interface.js";
/**
 * Classe que representa um conector personalizado no módulo Open Lines do Bitrix24.
 * Estende funcionalidades da classe BitrixBuilder.
 */
export class Connector extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "imconnector";
    }
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
     * Retorna uma instância do builder de registro de conectores.
     *
     * @returns Um novo objeto `ImConnectorRegisterBuilder`
     */
    getRegisterBuilder() {
        return new ImConnectorRegisterBuilder();
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
    async enabled(connector, line, active) {
        // implementação aqui
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
    /**
     * Retorna uma instância do builder de dados do conector.
     *
     * @returns Um novo objeto `ImConnectorDataSetBuilder`
     */
    getDatasetBuilder() {
        return new ImConnectorDataSetBuilder();
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
    sendMessages() {
        // implementação futura
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
     * Define o nome do chat associado ao conector.
     */
    setChatName() {
        // implementação futura
    }
}
