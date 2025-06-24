import { CustomField } from "./CustomField.js";
export class DealField extends CustomField {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.deal.userfield";
    }
}
