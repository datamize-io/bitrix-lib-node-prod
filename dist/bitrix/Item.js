import { BitrixBuilder } from "./BitrixBuilder.js";
export class Item extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.item";
        this.entityTypeId = null;
    }
    setEntityTypeId(entityTypeId) {
        this.data.entityTypeId = entityTypeId;
    }
    setId(id) {
        if (!this.data) {
            this.data = {};
        }
        this.data.id = id;
        return this;
    }
    async collect(data, method = null, collectField = "result") {
        if (!this.entityTypeId) {
            throw Error("Utilize o método setEntityTypeId para determinar o tipo de SPA, antes de usar collect.");
        }
        data.entityTypeId = data.entityTypeId || this.entityTypeId || this.data?.entityTypeId;
        return await super.collect(data, method, "items");
    }
}
