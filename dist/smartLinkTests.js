import "dotenv/config";
import { BitrixInstance } from "./bitrix/index.js";
import { WebhookController } from "./smartlink/WebhookController.js";
async function main() {
    const $b24 = new BitrixInstance({
        b24Url: process.env.BITRIX_WEBHOOK_URL,
        userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID),
        secret: process.env.BITRIX_WEBHOOK_SECRET,
    });
    const contactId = 724; // ID do contato a ser verificado
    const entityId = 6044; // ID do negócio a ser verificado
    WebhookController.setInstance($b24);
    await WebhookController.entry({
        postData: {},
        parameters: {
            contact_id: [contactId],
            entity_id: [entityId],
            action: "merge_duplicated_contact",
        },
        parameter: null,
    });
}
main();
