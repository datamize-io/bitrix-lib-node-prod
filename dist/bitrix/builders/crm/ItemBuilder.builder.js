import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class ItemBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.item";
        this.defaultParams = {
            entityTypeId: null,
            useOriginalUfNames: "N",
            select: ["*"],
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
    getData() {
        return this.data?.item || this.data;
    }
    async collect(params = {}, method = null, collectField = "result") {
        return await super.collect(params, method, "result.items");
    }
}
