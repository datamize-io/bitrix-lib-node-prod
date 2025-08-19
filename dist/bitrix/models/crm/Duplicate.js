import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";
export class Duplicate extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.duplicate";
    }
    setContacts(contacts) {
        this.setDataItem("params", {
            entityTypeId: 3,
            entityIds: contacts,
        });
        return this;
    }
    async findByType(entityType, type, contacts) {
        if (!contacts || contacts.length === 0)
            return;
        const filter = {
            entity_type: entityType,
            type: type,
            values: contacts,
        };
        const duplicate = new Duplicate(this.instance);
        const request = await duplicate.requestAndPatch("crm.duplicate.findbycomm", filter);
        console.log(request);
        return request.getData()?.CONTACT || [];
    }
    static async doMerge(data) {
        const duplicate = new Duplicate(this.instance).setContacts(data);
        return await duplicate.requestAndPatch("crm.entity.mergeBatch", duplicate.getData());
    }
    isMergeStatus(mergeStatus) {
        return this.getData()?.STATUS === mergeStatus;
    }
    getMergeEntities() {
        return this.getData()?.ENTITY_IDS || [];
    }
}
