import pkg from "../package.json" assert { type: "json" };
export * from "./bitrix/index.js";
export * from "./helpers/phone.helper.js";
console.log(`Bitrix Lib loaded! Vs${pkg.version}`);
