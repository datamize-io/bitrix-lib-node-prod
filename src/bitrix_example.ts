import "dotenv/config";
import { BitrixInstance, Deal, Contact, Lead } from "./bitrix/index.js";

async function main() {
  const $b24 = new BitrixInstance({
    b24Url: process.env.BITRIX_WEBHOOK_URL!,
    userId: parseInt(process.env.BITRIX_WEBHOOK_USER_ID!),
    secret: process.env.BITRIX_WEBHOOK_SECRET!,
  });

  //const dealRequest = await new Deal($b24).get(113);
  //console.log(dealRequest.getData());

  const contactRequest = await new Contact($b24).get(724);
  console.log(contactRequest.getData());

  //const leadRequest = await new Lead($b24).get(5);
  //console.log(leadRequest);
}

main();
