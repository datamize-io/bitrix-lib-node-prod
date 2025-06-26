import { Deal } from "./Deal.js";
import { ContactBuilder } from "../builders/crm/ContactBuilder.builder.js";

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
    return deals.getData().filter((deal: Deal) => deal.getData().closed === "N");
  }

  // Método para trazer duplicados

  // Método para adicionar comentários

  // Método para adicionar tarefas

  // Método para adicionar atividades
}
