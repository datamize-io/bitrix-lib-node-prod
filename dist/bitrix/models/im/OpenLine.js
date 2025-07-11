import { OpenLineBuilder } from "../../builders/im/OpenLineBuilder.builder.js";
/**
 * Classe responsável por manipular as operações de OpenLine (Canais Abertos) no Bitrix24.
 * Permite criar, atualizar, deletar, obter informações e executar operações relacionadas à configuração dos canais abertos.
 */
export class OpenLine extends OpenLineBuilder {
    /**
     * Cria um novo canal aberto.
     * Consulte a documentação oficial para detalhes de parâmetros:
     * https://apidocs.bitrix24.com/method/imopenlines.config.add/
     */
    async add(configBuilder) {
        return await this.requestAndPatch("imopenlines.config.add", configBuilder);
    }
    /**
     * Remove um canal aberto existente pelo seu ID.
     * @param lineId ID do canal aberto a ser removido.
     * @returns Resultado da operação de remoção.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.delete/
     */
    async delete(lineId) {
        return await this.requestAndPatch("imopenlines.config.delete", {
            CONFIG_ID: lineId,
        });
    }
    /**
     * Obtém informações detalhadas de um canal aberto.
     * @param lineId ID do canal aberto.
     * @param displayQueue Indica se deve exibir a fila de operadores ("Y" ou "N").
     * @param displayOfflineQueue Indica se deve exibir a fila offline ("Y" ou "N").
     * @returns Dados da configuração do canal aberto.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.get/
     */
    async get(lineId, displayQueue = "Y", displayOfflineQueue = "Y") {
        return await this.requestAndPatch("imopenlines.config.get", {
            CONFIG_ID: lineId,
            WITH_QUEUE: displayQueue,
            SHOW_OFFLINE: displayOfflineQueue,
        });
    }
    /**
     * Obtém o link da página de configuração do canal aberto.
     * @returns URL da página de configuração.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.path.get/
     */
    async getPageLink() {
        return await this.requestAndPatch("imopenlines.config.path.get", {});
    }
    /**
     * Atualiza um canal aberto existente.
     * Consulte a documentação oficial para detalhes de parâmetros:
     * @internal
     * https://apidocs.bitrix24.com/method/imopenlines.config.update/
     */
    async update() { }
    /**
     * Junta-se a um canal aberto.
     * Método interno, funcionalidade ainda não documentada.
     * @internal
     */
    async join() {
        // Não entendi a funcionalidade ainda
    }
    /**
     * Obtém a revisão atual da API dos canais abertos.
     * @see https://apidocs.bitrix24.com/method/imopenlines.revision.get/
     */
    async getApiRevision() {
        await this.requestAndPatch("imopenlines.revision.get");
    }
}
