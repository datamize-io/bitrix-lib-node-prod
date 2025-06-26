import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
export class Comment extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.timeline.comment";
        this.data = {};
    }
    setDeal(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "DEAL");
        this.setField("OWNER_TYPE_ID", 2); // Deal
        return this;
    }
    setItem(value, type, typeId) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", type);
        this.setField("OWNER_TYPE_ID", typeId);
        return this;
    }
    setContact(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "CONTACT");
        this.setField("OWNER_TYPE_ID", 3); // Contact
        return this;
    }
    setLead(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("ENTITY_ID", value);
        this.setField("ENTITY_TYPE", "LEAD");
        this.setField("OWNER_TYPE_ID", 1); // Lead
        return this;
    }
    setOwner(value) {
        value = typeof value == "object" ? value.data.id : value;
        this.setField("AUTHOR_ID", value);
        return this;
    }
    setText(value) {
        this.setField("COMMENT", value);
        return this;
    }
    async toPin() {
        return await this.requestAndPatch("crm.timeline.item.pin", {
            id: this.getData().id || this.getData().ID,
            ownerTypeId: this.getData().OWNER_TYPE_ID,
            ownerId: this.getData().ENTITY_ID,
        });
    }
    async toUnpin() {
        return await this.requestAndPatch("crm.timeline.item.load", {
            historyIds: [this.getData().id || this.getData().ID],
            ownerTypeId: this.getData().ENTITY_TYPE == "CONTACT" ? 3 : 2,
            ownerId: this.getData().ENTITY_ID,
        });
    }
    async collectFromContact(contactId) {
        return await this.requestAndPatch("crm.timeline.comment.list", {
            entityTypeId: 3, // Contact
            entityId: contactId,
        });
    }
}
