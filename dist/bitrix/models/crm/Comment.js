import { CommentBuilder } from "../../builders/crm/CommentBuilder.builder.js";
export class Comment extends CommentBuilder {
    async collectFromContact(contactId) {
        return await this.requestAndPatch("crm.timeline.comment.list", {
            entityTypeId: 3, // Contact
            entityId: contactId,
        });
    }
}
