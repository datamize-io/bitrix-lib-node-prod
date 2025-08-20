import pkg from "../package.json" assert { type: "json" };
export * from "./bitrix/index.js";
console.log(`Bitrix Lib loaded! Vs${pkg.version}`);
