import { BitrixBuilder } from "../BitrixBuilder.js";
export class DealProduct extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.deal.productrows";
    }
}
