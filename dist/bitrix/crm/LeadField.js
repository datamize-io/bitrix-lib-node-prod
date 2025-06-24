import { CustomField } from "./CustomField.js";
export class LeadField extends CustomField {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.lead.userfield";
    }
}
