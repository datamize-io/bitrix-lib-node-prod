import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
export class DealProduct extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.deal.productrows";
    }
}
