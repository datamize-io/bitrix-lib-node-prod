import { BitrixInstance } from "../bitrix/index.js";
export declare class WebhookController {
    /**
     * Método de entrada para o controlador de webhook.
     * @param event - O evento recebido do webhook, contendo os parâmetros necessários.
     * @throws Error se a action não for fornecida ou se o serviço correspondente não for encontrado.
     */
    private static bitrixInstance;
    private static CONFIG;
    static setInstance(bitrixInstance: BitrixInstance): WebhookController;
    static entry(event: any): Promise<true | void | undefined>;
    static getOrMergeDuplicatedContact(parameters: any): Promise<true | undefined>;
    static checkOpenedDeals(parameters: any): Promise<void>;
    static onFormSubmit(parameters: any): void;
}
