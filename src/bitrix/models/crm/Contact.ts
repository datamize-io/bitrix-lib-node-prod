import { ContactBuilder } from "../../builders/crm/ContactBuilder.builder.js";
import { PhoneHelper } from "../../../helpers/phone.helper.js";
import { Duplicate, Deal } from "./index.js";

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

  async getDuplications() {
    console.log(this.getData().name);
    const contactEmails = this.getData()
      .fm?.filter((d: any) => d.typeId == "EMAILS")
      .map((d: Record<string, string | number>) => d.value);

    const contactPhones = this.getData()
      .fm?.filter((d: any) => d.typeId == "PHONE")
      ?.map((d: Record<string, string | number>) => d.value);
    let phoneVariations: any[] = [];

    console.log("Verificando duplicações de contatos");
    console.log("Emails:", contactEmails);
    console.log("Telefones:", contactPhones);
    if (contactPhones && contactPhones.length > 0) {
      phoneVariations = PhoneHelper.getAllVariationsOfSamePhones(contactPhones);
    }

    console.log("Variações de telefone:", phoneVariations);
    const contactPhoneDuplications = await new Duplicate(this.instance).findByType("CONTACT", "PHONE", phoneVariations);
    console.log("Duplicações de telefone:", contactPhoneDuplications);
    const contactEmailDuplications = await new Duplicate(this.instance).findByType("CONTACT", "EMAIL", contactEmails);
    console.log("Duplicações de email:", contactEmailDuplications);
    if (contactPhoneDuplications || contactEmailDuplications) {
      return contactPhoneDuplications
        .concat(contactEmailDuplications)
        .filter((d: any) => d)
        .sort((a: number, b: number) => b - a);
    } else {
      return [];
    }
  }

  async getOpenedDeals() {
    const deals = await this.getDeals();
    return deals.getData().filter((deal: Deal) => deal.getData().closed === "N");
  }

  // Método para adicionar comentários

  // Método para adicionar tarefas

  // Método para adicionar atividades
}
