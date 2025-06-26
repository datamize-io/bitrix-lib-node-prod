import { DealBuilder } from "../../builders/crm/DealBuilder.builder.js";
/**
 * Classe que representa uma negociação (deal) no CRM do Bitrix24.
 * Estende a classe base `Item`, permitindo configuração fluente dos campos da negociação.
 */
export declare class Deal extends DealBuilder {
    /**
     * Retorna as negociações filtradas por uma etapa específica.
     *
     * @param stageId ID da etapa desejada
     * @returns Resultado da coleta (provavelmente uma Promise)
     */
    getByStageId(stageId: string): Promise<any>;
    /**
     * Move uma ou mais negociações para uma nova etapa.
     *
     * @param stageId ID da nova etapa
     * @param object Negociação única ou lista de negociações
     * @returns Lista de respostas da operação
     */
    moveToStage(stageId: string, object: object): Promise<object[]>;
}
