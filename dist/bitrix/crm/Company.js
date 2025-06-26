import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
export class Company extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.company";
    }
}
