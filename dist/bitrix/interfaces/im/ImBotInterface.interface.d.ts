/**
 * Tipos e interfaces para imbot.register (Bitrix24 Cloud)
 * @see https://apidocs.bitrix24.com/api-reference/im/imbot/imbot-register.html
 */
export type AtLeastOne<T, K extends keyof T = keyof T> = Pick<T, Exclude<keyof T, K>> & {
    [P in K]-?: Required<Pick<T, P>> & Partial<Record<Exclude<K, P>, never>>;
}[K];
/** String de URL (para documentar intenção no editor) */
export type UrlString = string & {
    __brand?: "url";
};
/** Data no formato YYYY-MM-DD (ajuda o editor a sugerir o padrão) */
export type ISODate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
/** Tipo do bot */
export type BotType = "B" | "O" | "S";
/** Sim/Não literal */
export type YesNo = "Y" | "N";
/** Lista de cores oficialmente suportadas (completinha) */
export declare const BOT_COLORS: readonly ["RED", "GREEN", "MINT", "LIGHT_BLUE", "DARK_BLUE", "PURPLE", "AQUA", "PINK", "LIME", "BROWN", "AZURE", "KHAKI", "SAND", "MARENGO", "GRAY", "GRAPHITE"];
/** Sugestões de cor aparecem no autocomplete */
export type BotColor = (typeof BOT_COLORS)[number];
/** Dados pessoais do bot */
export interface ImbotRegisterProperties {
    /**
     * Nome do chat-bot.
     * Um de {@link NAME} ou {@link LAST_NAME} é obrigatório.
     * @example "NewBot"
     */
    NAME?: string;
    /**
     * Sobrenome do chat-bot.
     * Um de {@link NAME} ou {@link LAST_NAME} é obrigatório.
     * @example "Assistant"
     */
    LAST_NAME?: string;
    /**
     * Cor no app mobile.
     * @remarks Valores aceitos: {@link BOT_COLORS}
     * @example "AQUA"
     */
    COLOR?: BotColor;
    /**
     * E-mail de contato do bot.
     * @important Não pode duplicar e-mail de usuários reais.
     * @example "bot@example.com"
     */
    EMAIL?: string;
    /**
     * Aniversário no formato YYYY-MM-DD.
     * @example "2016-03-11"
     */
    PERSONAL_BIRTHDAY?: ISODate;
    /**
     * Cargo/descrição do bot.
     * @example "Assistente Virtual"
     */
    WORK_POSITION?: string;
    /**
     * Website do bot.
     * @example "https://example.com"
     */
    PERSONAL_WWW?: UrlString;
    /**
     * Gênero (opcional).
     * M = masculino, F = feminino, '' = não informar.
     */
    PERSONAL_GENDER?: "M" | "F" | "";
    /**
     * Avatar em base64.
     * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..."
     */
    PERSONAL_PHOTO?: string;
}
/** Campos base do registro */
export interface ImbotRegisterBase {
    /**
     * Identificador único do bot dentro da sua aplicação (obrigatório).
     * @example "newbot"
     */
    CODE: string;
    /**
     * Tipo do bot: "B" (default), "O" (Open Lines) ou "S" (Supervisor).
     * @default "B"
     */
    TYPE?: BotType;
    /**
     * Ativa modo Open Lines ("Y"/"N").
     * Pode ser omitido se TYPE="O".
     * @example "Y"
     */
    OPENLINE?: YesNo;
    /**
     * Identificador usado apenas em modo Webhook.
     * @remarks Na maioria dos casos, deixe vazio.
     */
    CLIENT_ID?: string;
    /**
     * Dados pessoais do bot (obrigatório).
     * Um de NAME ou LAST_NAME deve estar presente.
     */
    PROPERTIES: ImbotRegisterProperties;
}
/**
 * Eventos do bot.
 * Pelo menos UM handler é obrigatório.
 * Use EVENT_HANDLER (atalho para todos) OU os específicos abaixo.
 */
export type ImbotRegisterEvents = AtLeastOne<{
    /**
     * Handler geral (atalho) para eventos recebidos do servidor.
     * Se fornecido, cobre MESSAGE_ADD/WELCOME/DELETE.
     * @example "https://api.seudominio.com/bot/events"
     */
    EVENT_HANDLER?: UrlString;
    /**
     * Handler para evento de mensagem recebida pelo bot.
     * @example "https://api.seudominio.com/bot/message"
     */
    EVENT_MESSAGE_ADD?: UrlString;
    /**
     * Handler para evento de boas-vindas (abertura de diálogo/invite).
     * @example "https://api.seudominio.com/bot/welcome"
     */
    EVENT_WELCOME_MESSAGE?: UrlString;
    /**
     * Handler para evento de remoção do bot.
     * @example "https://api.seudominio.com/bot/delete"
     */
    EVENT_BOT_DELETE?: UrlString;
}, "EVENT_HANDLER" | "EVENT_MESSAGE_ADD" | "EVENT_WELCOME_MESSAGE" | "EVENT_BOT_DELETE">;
/** Payload final aceito por imbot.register */
export type ImbotRegisterPayload = ImbotRegisterBase & ImbotRegisterEvents;
/** Resposta típica do Bitrix24 para imbot.register */
export interface ImbotRegisterResponse {
    result?: {
        BOT_ID: number;
    };
    time?: {
        start: number;
        finish: number;
        duration: number;
        processing: number;
        date_start: string;
        date_finish: string;
    };
    error?: string;
    error_description?: string;
}
/**
 * Interface do cliente (para dar IntelliSense no register()).
 * Tipar seu serviço com essa interface faz o editor sugerir todo o payload.
 */
export interface ImBotInterface {
    /**
     * Registra um novo chat-bot.
     * @see https://apidocs.bitrix24.com/api-reference/im/imbot/imbot-register.html
     * @example
     * await bot.register({
     *   CODE: "meu_chatbot",
     *   TYPE: "B",
     *   EVENT_MESSAGE_ADD: "https://api.seuapp.com/bot/message",
     *   EVENT_WELCOME_MESSAGE: "https://api.seuapp.com/bot/welcome",
     *   PROPERTIES: { NAME: "Meu Bot", COLOR: "AQUA", EMAIL: "bot@exemplo.com" }
     * });
     */
    register(payload: ImbotRegisterPayload): Promise<ImbotRegisterResponse>;
}
/**
 * Builder com defaults seguros (opcional, mas deixa DX 🔝).
 * Garante TYPE="B" por padrão e ajuda a sugerir URLs/cores corretas.
 */
export declare function makeRegisterPayload(base: Pick<ImbotRegisterBase, "CODE" | "PROPERTIES">, events: ImbotRegisterEvents): ImbotRegisterPayload;
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
