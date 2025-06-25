import { Item } from "./Item.js";
import { Deal } from "./Deal.js";
export class Contact extends Item {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 2,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
        // Método para trazer duplicados
        // Método para adicionar comentários
        // Método para adicionar tarefas
        // Método para adicionar atividades
    }
    setFmField(typeId, valueType, value, id) {
        this.data.fm = this.data.fm || {};
        const sortNumber = Object.keys(this.data.fm).length;
        this.data.fm[sortNumber] = { id, value, valueType, typeId };
        return this;
    }
    setEmail(value, type) {
        this.setFmField("EMAIL", type, value);
        return this;
    }
    setPhone(value, type) {
        this.setFmField("PHONE", type, value);
        return this;
    }
    setName(value) {
        this.setField("name", value);
        return this;
    }
    setLastName(value) {
        this.setField("lastName", value);
        return this;
    }
    setUser(value) {
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
        return deals.getData().filter((deal) => deal.getData().closed === "N");
    }
}
