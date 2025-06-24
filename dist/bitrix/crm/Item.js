import { BitrixBuilder } from "../BitrixBuilder.js";
export class Item extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.item";
        this.defaultParams = {
            entityTypeId: null,
        };
    }
    setEntityTypeId(entityTypeId) {
        this.defaultParams.entityTypeId = entityTypeId;
        return this;
    }
    setId(id) {
        this.setDataItem("id", id);
        return this;
    }
    async collect(params = {}, method = null, collectField = "result") {
        return await super.collect(params, method, "result.items");
    }
}
