import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class ActivityBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.activity";
    }
    getEntityId() {
        return this.getData().OWNER_TYPE_ID;
    }
}
