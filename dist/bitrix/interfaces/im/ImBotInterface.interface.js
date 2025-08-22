/**
 * Tipos e interfaces para imbot.register (Bitrix24 Cloud)
 * @see https://apidocs.bitrix24.com/api-reference/im/imbot/imbot-register.html
 */
/** Lista de cores oficialmente suportadas (completinha) */
export const BOT_COLORS = [
    "RED",
    "GREEN",
    "MINT",
    "LIGHT_BLUE",
    "DARK_BLUE",
    "PURPLE",
    "AQUA",
    "PINK",
    "LIME",
    "BROWN",
    "AZURE",
    "KHAKI",
    "SAND",
    "MARENGO",
    "GRAY",
    "GRAPHITE",
];
/* -------------------- Helpers que melhoram ainda mais o autocomplete -------------------- */
/**
 * Builder com defaults seguros (opcional, mas deixa DX 🔝).
 * Garante TYPE="B" por padrão e ajuda a sugerir URLs/cores corretas.
 */
export function makeRegisterPayload(base, events) {
    return {
        TYPE: "B",
        ...base,
        ...events,
    };
}
/**
 * Exemplo de uso:
 *
 * const payload = makeRegisterPayload(
 *   {
 *     CODE: "meu_chatbot",
 *     PROPERTIES: { NAME: "Meu Bot", COLOR: "AQUA", EMAIL: "bot@exemplo.com" }
 *   },
 *   {
 *     EVENT_MESSAGE_ADD: "https://api.seuapp.com/bot/message" as UrlString,
 *     EVENT_WELCOME_MESSAGE: "https://api.seuapp.com/bot/welcome" as UrlString
 *   }
 * );
 */
