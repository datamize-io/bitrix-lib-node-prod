import { Deal } from "./Deal.js";
import { ContactBuilder } from "../../builders/crm/ContactBuilder.builder.js";
export class Contact extends ContactBuilder {
    // Atribuir ORIGIN_ID
    // getChats()
    // Finish chats
    // Restart chats
    async getDeals() {
        return await this.instance.entity(Deal).collect({
            filter: { contactId: this.getData().ID },
        });
    }
    async getOpenedDeals() {
        const deals = await this.getDeals();
        return deals.getData().filter((deal) => deal.getData().closed === "N");
    }
}
