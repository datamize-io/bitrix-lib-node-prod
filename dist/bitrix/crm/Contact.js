import { BitrixBuilder } from "../BitrixBuilder.js";
import { Deal } from "./Deal.js";
export class Contact extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.contact";
        // Método para trazer duplicados
        // Método para adicionar comentários
        // Método para adicionar tarefas
        // Método para adicionar atividades
    }
    setEmail(value, type = "WORK") {
        const data = this.getData();
        const emails = data.EMAIL || [];
        emails.push({ VALUE: value, VALUE_TYPE: type.toUpperCase() });
        this.setField("EMAIL", emails);
        return this;
    }
    setPhone(value, type = "WORK") {
        const data = this.getData();
        const phones = data.PHONE || [];
        phones.push({ VALUE: value, VALUE_TYPE: type.toUpperCase() });
        this.setField("PHONE", phones);
        return this;
    }
    setName(value) {
        this.setField("NAME", value);
        return this;
    }
    setLastName(value) {
        this.setField("LAST_NAME", value);
        return this;
    }
    setUser(value) {
        const userId = typeof value === "object" ? value.getData().ID : value;
        this.setField("ASSIGNED_BY_ID", userId);
        return this;
    }
    // Atribuir ORIGIN_ID
    // getChats()
    // Finish chats
    // Restart chats
    async getDeals() {
        return await this.instance.entity(Deal).collect({
            filter: { CONTACT_ID: this.getData().ID },
        });
    }
    async getOpenedDeals() {
        const deals = await this.getDeals();
        return deals.getData().filter((deal) => deal.getData().CLOSED === "N");
    }
}
