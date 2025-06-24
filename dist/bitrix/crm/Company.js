import { BitrixBuilder } from "../BitrixBuilder.js";
export class Company extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.company";
    }
}
