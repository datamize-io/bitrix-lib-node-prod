import { ActivityBuilder } from "./ActivityBuilder.builder.js";
export class ActivityFormBuilder extends ActivityBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.activity";
    }
}
