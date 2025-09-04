import "dotenv/config";
import { BitrixInstance, OpenLineChat, CalendarEvent, Contact, Item, CrmType, ImBot, Deal, ActivityForm, OpenLineDialog, } from "../bitrix/index.js";
import { WebhookController } from "./WebhookController.js";
const $b24 = new BitrixInstance({
    b24Url: process.env.BITRIX_WEBHOOK_URL,
    userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID),
    secret: process.env.BITRIX_WEBHOOK_SECRET,
}).setLog(true);
async function testActivity() {
    const activity = await new ActivityForm($b24).get(357);
    const params = activity.getParamsFromLastPage();
    try {
        const payload = activity.getData();
        payload.OWNER_TYPE_ID = params.query.tid;
        payload.OWNER_ID = params.query.eid;
        payload.SUBJECT = "Formulário copiado";
        console.log(params);
        const move = await activity.insert({
            fields: payload,
        });
        console.log(move);
    }
    catch (error) {
        console.log(error);
    }
}
async function testBatch() {
    const deals = await new Deal($b24).collectAll({
        filter: {
            categoryId: 2,
        },
    });
    console.log(deals.getData().shift());
}
async function imbotUnregister(botId = "", clientId = "") {
    const imbot = new ImBot($b24);
    await imbot.unregister(botId, clientId);
    console.log(await imbot.list());
}
async function testSearchChat(findQuery = "1787700075521") {
    const chats = await new OpenLineChat($b24).searchChat(findQuery);
    console.log(chats.getData());
}
async function imbotRegisterTest() {
    const imbot = new ImBot($b24);
    await imbot.register({
        CLIENT_ID: "chatbot_supervisor",
        CODE: "chatbot_supervisor",
        TYPE: "S",
        EVENT_HANDLER: `https://certain-vast-werewolf.ngrok-free.app/webhooks/`,
        PROPERTIES: { NAME: "ChatBot - Supervisor", COLOR: "AQUA", EMAIL: "bot@exemplo.com" },
        OPENLINE: "Y",
    });
    console.log(await imbot.list());
}
async function getOpenLineChats() {
    const chats = await new OpenLineChat($b24).collect();
    console.log(chats.getData());
}
async function testGetContacts() {
    const contacts = await new Contact($b24).collect();
    console.log(contacts.getData().length);
}
async function testImBotRegister() {
    console.log(`Start`);
    const imbot = new ImBot($b24);
    const botDomain = `https://certain-vast-werewolf.ngrok-free.app/bot`;
    const response = await imbot.register({
        CODE: "meu_chatbot_test2208",
        TYPE: "B",
        CLIENT_ID: "meu_chatbot_test2208_v1",
        EVENT_HANDLER: `${botDomain}/entry`,
        PROPERTIES: { NAME: "Bot Teste 2208", COLOR: "AQUA", EMAIL: "bot@exemplo.com" },
    });
    console.log(response);
}
async function testAddLogEntry(id = 10552) {
    try {
        const item = await new Item($b24).setId(id).setEntityTypeId(1).addTimelineLogEntry("Chat encerrado", "Chat foi encerrado pois lead foi fechado.", "info");
    }
    catch (error) {
        throw Error(error.message);
    }
}
async function testTransferActivities(oldOwnerId = 141, newOwnerId = 1) {
    try {
        const item = await new Item($b24)
            .setEntityTypeId(3)
            .get(oldOwnerId)
            .then(async (item) => {
            await item.transferAllActivitiesTo(newOwnerId);
            await item.transferAllCommentsTo(newOwnerId);
            await item.transferEntitiesTo(newOwnerId);
            await item.transferAllFieldsTo(newOwnerId);
            await item.clearAllFieldsOfItem();
            await item.addTimelineLogEntry(`Mesclagem de Contato`, `Todas entidades movidas para o item ${newOwnerId}`);
        });
    }
    catch (error) {
        throw Error(error.message);
    }
}
async function testItensList() {
    const items = await new CrmType($b24).collect();
    console.log(items.getData().map((d) => d.getData()));
}
async function testDuplications() {
    const contactId = 135; // ID do contato a ser verificado
    const contact = await new Contact($b24).get(contactId);
    console.log(await contact.getDuplications());
}
async function testMergeContact() {
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
async function testGetEvent() {
    const id = 869;
    const event = await new CalendarEvent($b24).setType("user").getById(id);
    console.log(event.getData());
}
async function getDialogChatId() {
    const dialog = await new OpenLineDialog($b24).getByChatId(1056);
    console.log(dialog);
    console.log(dialog.getChatId());
}
getDialogChatId();
//testActivity();
//imbotRegisterTest();
//testBatch();
//testSearchChat();
//imbotUnregister(10041, "meu_chatbot_test2208_v2");
//imbotRegister();
//getOpenLineChats();
//testGetContacts();
//testImBotRegister();
//testAddLogEntry();
//testTransferActivities();
