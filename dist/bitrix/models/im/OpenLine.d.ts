import { OpenLineBuilder } from "../../builders/im/OpenLineBuilder.builder.js";
import { OpenLineInterface } from "../../interfaces/im/OpenLineInterface.interface.js";
/**
 * Classe responsável por manipular as operações de OpenLine (Canais Abertos) no Bitrix24.
 * Permite criar, atualizar, deletar, obter informações e executar operações relacionadas à configuração dos canais abertos.
 */
export declare class OpenLine extends OpenLineBuilder implements OpenLineInterface {
    /**
     * Cria um novo canal aberto.
     * Consulte a documentação oficial para detalhes de parâmetros:
     * https://apidocs.bitrix24.com/method/imopenlines.config.add/
     */
    add(): Promise<void>;
    /**
     * Remove um canal aberto existente pelo seu ID.
     * @param lineId ID do canal aberto a ser removido.
     * @returns Resultado da operação de remoção.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.delete/
     */
    delete(lineId: string | number): Promise<any>;
    /**
     * Obtém informações detalhadas de um canal aberto.
     * @param lineId ID do canal aberto.
     * @param displayQueue Indica se deve exibir a fila de operadores ("Y" ou "N").
     * @param displayOfflineQueue Indica se deve exibir a fila offline ("Y" ou "N").
     * @returns Dados da configuração do canal aberto.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.get/
     */
    get(lineId: string | number, displayQueue?: "Y" | "N", displayOfflineQueue?: "Y" | "N"): Promise<any>;
    /**
     * Obtém o link da página de configuração do canal aberto.
     * @returns URL da página de configuração.
     * @see https://apidocs.bitrix24.com/method/imopenlines.config.path.get/
     */
    getPageLink(): Promise<any>;
    /**
     * Atualiza um canal aberto existente.
     * Consulte a documentação oficial para detalhes de parâmetros:
     * @internal
     * https://apidocs.bitrix24.com/method/imopenlines.config.update/
     */
    update(): Promise<void>;
    /**
     * Junta-se a um canal aberto.
     * Método interno, funcionalidade ainda não documentada.
     * @internal
     */
    join(): Promise<void>;
    /**
     * Obtém a revisão atual da API dos canais abertos.
     * @see https://apidocs.bitrix24.com/method/imopenlines.revision.get/
     */
    getApiRevision(): Promise<void>;
}
