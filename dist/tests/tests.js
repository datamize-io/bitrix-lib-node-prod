import "dotenv/config";
import { BitrixInstance, OpenLineChat, CalendarEvent, Contact, Item, CrmType, ImBot, Deal, ActivityForm, OpenLineDialog, OpenLine, OpenLineOperator, OpenLineMessage, CustomMessageBuilder, } from "../bitrix/index.js";
import { WebhookController } from "./WebhookController.js";
const $b24 = new BitrixInstance({
    b24Url: process.env.BITRIX_WEBHOOK_URL,
    userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID),
    secret: process.env.BITRIX_WEBHOOK_SECRET,
})
    .setLog(true)
    .setSavePayloads(true);
async function imbotCustomMessage(botId = "", clientId = "") {
    const customMessage = new CustomMessageBuilder({
        CLIENT_ID: "bot_teste",
        DIALOG_ID: "chat32015",
        MESSAGE: "Sistema",
        SYSTEM: "Y",
    });
    customMessage.setAlertUser();
    customMessage.setGrid({ NAME: "E-mail", VALUE: "westphal.jhonatan@gmail.com", DISPLAY: "BLOCK", WIDTH: 100 });
    customMessage.setGrid({ NAME: "Telefone", VALUE: "+5547984646202", WIDTH: 100 });
    customMessage.setGrid({ NAME: "Código do Imóvel", VALUE: "123456", WIDTH: 100 });
    customMessage.setGrid({ NAME: "Link do Pipedrive", VALUE: "[URL=https://google.com] Clique para abrir [/URL]", DISPLAY: "LINE" });
    await new ImBot($b24).setCustomMessage(customMessage.build());
}
async function imbotSetnote(botId = "", clientId = "") {
    const imbot = new ImBot($b24);
    await imbot.setInfo("bot_recepcionista_teste", "chat3068", "Teste de info");
    await imbot.setAlert("bot_recepcionista_teste", "chat3068", "Teste de alert");
    console.log(await imbot.list());
}
async function sendSilentMessage() {
    await new OpenLineMessage($b24).comment("contact", 11060, 1, "3068", "Teste");
}
async function testTryCatchErrorRequest() {
    try {
        const item = await new Item($b24).setEntityTypeId(3).get(9999999);
    }
    catch (error) {
        console.log("Erro capturado: ", error.message);
    }
}
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
async function imbotRegisterTest(botCode = "bot_teste", botName = "Bot de Teste", botUrl = "https://certain-vast-werewolf.ngrok-free.app/webhooks/") {
    const imbot = new ImBot($b24);
    await imbot.register({
        CLIENT_ID: botCode,
        CODE: botCode,
        TYPE: "S",
        EVENT_HANDLER: `${botUrl}`,
        PROPERTIES: { NAME: botName, COLOR: "AQUA", EMAIL: "bot@exemplo.com" },
        OPENLINE: "Y",
    });
    console.log(await imbot.list());
}
async function getImBotList() {
    const imbot = new ImBot($b24);
    await imbot.list();
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
async function getOpenLine() {
    const line = await new OpenLine($b24).get(4);
    console.log(line);
}
async function updateTitleOfChat() {
    const chat = await new ImBot($b24).requestData("imbot.chat.updateTitle", {
        CHAT_ID: 32101,
        CLIENT_ID: "triagem_responsaveis",
        BOT_ID: 18803,
        TITLE: "SC, JOINVILLE, 8787709522847, MARCIA LUIZA COSTA",
    });
    console.log(chat);
}
async function getByChatId(chatId = 4886) {
    const chat = await new OpenLineDialog($b24).getByChatId(chatId);
    console.log(chat.getData());
}
async function updateReadStatusMessage() {
    /*const chat = await new OpenLineDialog($b24).getByChatId(chatId);
    const dialogIm = chat.getData().entity_id;
    const connectorId = dialogIm.split("|")[0];
    const lineId = dialogIm.split("|")[1];
  
    const connectorService = await new Connector($b24);
  
    //console.log(request.getData());*/
}
async function sendFormMessageIntoDialog() {
    const chat = await new OpenLineDialog($b24).requestData("imopenlines.dialog.form.send.json", {
        SESSION_ID: 7022,
    }, "POST");
}
async function getDeal() {
    const deal = await new Deal($b24).get(1000).catch((error) => console.log("error"));
    console.log(deal);
}
async function removeChatUser(chatId, userId) {
    await new OpenLineOperator($b24).takesChat(chatId).catch((error) => console.log(error));
    const chatUser = await new OpenLineChat($b24).removeChatUser(chatId, userId).catch((error) => console.log(error));
    $b24.setLog(true);
    const responseAdd = await new OpenLineChat($b24).requestData("im.chat.user.add", {
        USERS: [userId],
        CHAT_ID: chatId,
        IM_CHAT_EXTEND: "Y",
    }, "result");
    console.log(responseAdd);
}
await removeChatUser(36869, 18803);
//getDeal();
//getByChatId();
//sendFormMessageIntoDialog();
//updateReadStatusMessage();
//updateTitleOfChat();
//imbotCustomMessage();
//imbotSetnote();
//testTryCatchErrorRequest();
//getImBotList();
//getOpenLine();
//getDialogChatId();
//testActivity();
//imbotRegisterTest("triagem_responsaveis", "Triagem de Responsáveis", "https://smartcaixa-bitrix.rj.r.appspot.com/webhooks/");
//testBatch();
//testSearchChat();
//imbotUnregister(10041, "meu_chatbot_test2208_v2");
//imbotRegister();
//getOpenLineChats();
//testGetContacts();
//testImBotRegister();
//testAddLogEntry();
//testTransferActivities();
