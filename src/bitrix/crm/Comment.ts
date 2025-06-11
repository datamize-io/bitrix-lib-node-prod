import { BitrixBuilder } from "../BitrixBuilder.js";

export class Comment extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.timeline.comment";
  protected data: any = {};

  setDeal(value: any) {
    value = typeof value == "object" ? value.data.id : value;
    this.setField("ENTITY_ID", value);
    this.setField("ENTITY_TYPE", "DEAL");
    this.setField("OWNER_TYPE_ID", 2); // Deal
    return this;
  }

  setItem(value: any, type: string, typeId: number) {
    value = typeof value == "object" ? value.data.id : value;
    this.setField("ENTITY_ID", value);
    this.setField("ENTITY_TYPE", type);
    this.setField("OWNER_TYPE_ID", typeId);
    return this;
  }

  setContact(value: any) {
    value = typeof value == "object" ? value.data.id : value;
    this.setField("ENTITY_ID", value);
    this.setField("ENTITY_TYPE", "CONTACT");
    this.setField("OWNER_TYPE_ID", 3); // Contact
    return this;
  }

  setLead(value: any) {
    value = typeof value == "object" ? value.data.id : value;
    this.setField("ENTITY_ID", value);
    this.setField("ENTITY_TYPE", "LEAD");
    this.setField("OWNER_TYPE_ID", 1); // Lead
    return this;
  }

  setOwner(value: any) {
    value = typeof value == "object" ? value.data.id : value;
    this.setField("AUTHOR_ID", value);
    return this;
  }

  setText(value: any) {
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

  async collectFromContact(contactId: string | number) {
    return await this.requestAndPatch("crm.timeline.comment.list", {
      entityTypeId: 3, // Contact
      entityId: contactId,
    });
  }
}
