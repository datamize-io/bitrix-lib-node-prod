import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { EstimateInterface } from "../../interfaces/crm/EstimateInterface.interface.js";

/**
 * Classe abstrata para construção de entidades de orçamento (Estimate) no CRM do Bitrix.
 * Implementa a interface EstimateInterface e fornece parâmetros padrão para requisições relacionadas a orçamentos.
 */
export abstract class EstimateBuilder extends BitrixBuilder implements EstimateInterface {
  /**
   * Parâmetros padrão utilizados nas operações de orçamento.
   * - entityTypeId: Identificador do tipo de entidade (padrão 7).
   * - useOriginalUfNames: Indica se deve usar os nomes originais dos campos personalizados.
   * - select: Campos a serem selecionados na consulta (padrão todos).
   */
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 7,
    useOriginalUfNames: "Y",
    select: ["*"],
  };
}
