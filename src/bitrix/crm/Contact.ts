import { Item } from "./Item.js";
import { Deal } from "./Deal.js";
import { Duplicate } from "./Duplicate.js";

export class Contact extends Item {
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 2,
    useOriginalUfNames: "Y",
    select: ["*"],
  };

  setFmField(typeId: "PHONE" | "EMAIL" | "WEB" | "IM" | "LINK", valueType: string, value: string, id?: string) {
    this.data.fm = this.data.fm || {};
    const sortNumber = Object.keys(this.data.fm).length;
    this.data.fm[sortNumber] = { id, value, valueType, typeId };
    return this;
  }

  setEmail(value: string, type: "WORK" | "HOME" | "MAILING" | "OTHER") {
    this.setFmField("EMAIL", type, value);
    return this;
  }

  setPhone(value: any, type: "WORK" | "MOBILE" | "FAX" | "HOME" | "PAGER" | "MAILING" | "OTHER") {
    this.setFmField("PHONE", type, value);
    return this;
  }

  setName(value: any) {
    this.setField("name", value);
    return this;
  }

  setLastName(value: any) {
    this.setField("lastName", value);
    return this;
  }

  setUser(value: any) {
    const userId = typeof value === "object" ? value.getData().ID : value;
    this.setField("assignedById", userId);
    return this;
  }

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
