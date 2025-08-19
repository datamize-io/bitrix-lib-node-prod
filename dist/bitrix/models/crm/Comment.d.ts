import { CommentBuilder } from "../../builders/crm/CommentBuilder.builder.js";
export declare class Comment extends CommentBuilder {
    collectFromContact(contactId: string | number): Promise<any>;
}
