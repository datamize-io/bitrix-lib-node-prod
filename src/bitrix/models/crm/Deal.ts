import { DealBuilder } from "../../builders/crm/DealBuilder.builder.js";

/**
 * Classe que representa uma negociação (deal) no CRM do Bitrix24.
 * Estende a classe base `Item`, permitindo configuração fluente dos campos da negociação.
 */
export class Deal extends DealBuilder {
  /**
   * Retorna as negociações filtradas por uma etapa específica.
   *
   * @param stageId ID da etapa desejada
   * @returns Resultado da coleta (provavelmente uma Promise)
   */
  getByStageId(stageId: string) {
    return this.setFilterItem("stageId", stageId).collect();
  }

  /**
   * Move uma ou mais negociações para uma nova etapa.
   *
   * @param stageId ID da nova etapa
   * @param object Negociação única ou lista de negociações
   * @returns Lista de respostas da operação
   */
  async moveToStage(stageId: string, object: object) {
    const dealsToMove = !Array.isArray(object) ? [object] : object;
    const responses: Array<object> = [];
    dealsToMove.forEach(async (deal) => {
      const response = await deal.setField("categoryId", 22).setField("stageId", stageId).update();
      responses.push(response);
    });

    return responses;
  }
}
