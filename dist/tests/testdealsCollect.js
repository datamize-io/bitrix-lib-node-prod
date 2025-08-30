import "dotenv/config";
import { BitrixInstance, Deal } from "../bitrix/index.js";
import { ActivityForm } from "../bitrix/models/crm/ActivityForm.js";
const $b24 = new BitrixInstance({
    b24Url: process.env.BITRIX_WEBHOOK_URL,
    userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID),
    secret: process.env.BITRIX_WEBHOOK_SECRET,
});
async function main() {
    console.log(`Rodando webhook para ${process.env.BITRIX_WEBHOOK_URL}`);
    /*const Contacts = await new Contact($b24).collect();
    console.log(Contacts.getData()[0].getData());*/
    const DealsRequest = new Deal($b24);
    const dealsIntoStage = await DealsRequest.collect();
    console.log(dealsIntoStage);
    /*console.log(await DealsRequest.moveToStage("C22:LOSE", dealsIntoStage.getData()));*/
}
async function activityFormBuilder() {
    const activityForm = new ActivityForm($b24);
    const activity = await activityForm.get(301);
    const lastPage = activity.getParamsFromLastPage();
    if (Object.keys(lastPage.query).includes("eid")) {
    }
    console.log();
}
activityFormBuilder();
