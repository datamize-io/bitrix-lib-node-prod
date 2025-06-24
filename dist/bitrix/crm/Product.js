import { BitrixBuilder } from "../BitrixBuilder.js";
export class Product extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.product";
    }
}
