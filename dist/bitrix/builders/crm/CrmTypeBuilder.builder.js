import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class CrmTypeBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.type";
    }
    async collect(params = {}, method = null, collectField = "result") {
        return await super.collect(params, method, "result.types");
    }
}
