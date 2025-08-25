import { Item } from "../../models/crm/Item.js";
/**
 * Classe abstrata para construção de entidades de orçamento (Estimate) no CRM do Bitrix.
 * Implementa a interface EstimateInterface e fornece parâmetros padrão para requisições relacionadas a orçamentos.
 */
export class EstimateBuilder extends Item {
    constructor() {
        super(...arguments);
        /**
         * Parâmetros padrão utilizados nas operações de orçamento.
         * - entityTypeId: Identificador do tipo de entidade (padrão 7).
         * - useOriginalUfNames: Indica se deve usar os nomes originais dos campos personalizados.
         * - select: Campos a serem selecionados na consulta (padrão todos).
         */
        this.defaultParams = {
            entityTypeId: 7,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
}
