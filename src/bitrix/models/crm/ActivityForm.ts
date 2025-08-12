import { ActivityFormBuilder } from "../../builders/crm/ActivityFormBuilder.builder.js";

export class ActivityForm extends ActivityFormBuilder {
  getParamsFromLastPage() {
    if (!this.data) {
      throw Error("Método getParamsFromLastPage não pode ser chamado antes de coletar os dados da atividade.");
    }

    if (!this.data.PROVIDER_PARAMS || !Array.isArray(this.data.PROVIDER_PARAMS.VISITED_PAGES)) {
      throw Error("VISITED_PAGES não é um array.");
    }
    const lastPage = this.data.PROVIDER_PARAMS.VISITED_PAGES.pop();
    const query = new URL(lastPage.HREF).searchParams;

    lastPage.query = Object.fromEntries(query.entries()) as Record<string, string>;
    return lastPage;
  }
}
