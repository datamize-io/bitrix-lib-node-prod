import "dotenv/config";
import { BitrixInstance, Deal } from "../bitrix/index.js";
async function main() {
    const $b24 = new BitrixInstance({
        b24Url: process.env.BITRIX_WEBHOOK_URL,
        userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID),
        secret: process.env.BITRIX_WEBHOOK_SECRET,
    });
    /*const Contacts = await new Contact($b24).collect();
    console.log(Contacts.getData()[0].getData());*/
    const DealsRequest = new Deal($b24);
    const dealsIntoStage = await DealsRequest.getByStageId("C20:LOSE");
    console.log(dealsIntoStage);
    /*console.log(await DealsRequest.moveToStage("C22:LOSE", dealsIntoStage.getData()));*/
}
main();
