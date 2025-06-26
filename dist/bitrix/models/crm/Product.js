import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";
export class Product extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.product";
    }
}
