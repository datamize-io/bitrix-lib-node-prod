import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
export class Pipeline extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.category";
    }
}
