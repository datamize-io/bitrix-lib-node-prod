import { CustomField } from "./CustomField.js";
export class ContactField extends CustomField {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.contact.userfield";
    }
}
