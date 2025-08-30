import { Activity } from "./Activity.js";
export class ActivityForm extends Activity {
    getParamsFromLastPage() {
        if (!this.getData()) {
            throw Error("Método getParamsFromLastPage não pode ser chamado antes de coletar os dados da atividade.");
        }
        if (this.getData().PROVIDER_ID !== "CRM_WEBFORM")
            throw Error("Esta atividade não é de envio de formulário.");
        if (!this.getData().PROVIDER_PARAMS || !Array.isArray(this.getData().PROVIDER_PARAMS.VISITED_PAGES)) {
            throw Error("VISITED_PAGES não é um array.");
        }
        const lastPage = this.data.PROVIDER_PARAMS.VISITED_PAGES.pop();
        const query = new URL(lastPage.HREF).searchParams;
        lastPage.query = Object.fromEntries(query.entries());
        return lastPage;
    }
}
