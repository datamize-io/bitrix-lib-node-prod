import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";

export class Comment extends BitrixBuilder {
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
