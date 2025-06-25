import { BitrixBuilder } from "../BitrixBuilder.js";
import { ImConnectorRegisterBuilder } from "./imconnector-register.interface.js";
export class Connector extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "imconnector";
    }
    // Connector
    async register(registerBuilder) {
        const data = registerBuilder instanceof ImConnectorRegisterBuilder ? registerBuilder.build() : registerBuilder;
        return await this.requestAndPatch("imconnector.register", data);
    }
    getRegisterBuilder() {
        return new ImConnectorRegisterBuilder();
    }
    activate() { }
    deactivate() { }
    list() { }
    unregister() { }
    setConnectorData() { }
    getStatus() { }
    addWidget() { }
    //Connector Events
    onImConnectorLineDelete() { }
    onImConnectorStatusDelete() { }
    // Messages
    sendMessages() { }
    updateMessage() { }
    deleteMessage() { }
    updateStatus(status) { }
    // Chat
    setChatName() { }
}
