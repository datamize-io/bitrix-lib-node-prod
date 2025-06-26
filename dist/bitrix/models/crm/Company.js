import { CompanyBuilder } from "../../builders/crm/CompanyBuilder.builder.js";
export class Company extends CompanyBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.company";
    }
}
