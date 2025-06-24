import { BitrixBuilder } from "../BitrixBuilder.js";
export class Pipeline extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.category";
    }
}
