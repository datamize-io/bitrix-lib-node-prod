import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class UserCodeBuilder {
    setConnectorCode(connectorCode) {
        this.CONNECTOR_CODE = connectorCode;
        return this;
    }
    setConnectorId(connectorId) {
        this.CONNECTOR_ID = connectorId;
        return this;
    }
    setEntityId(entityId) {
        this.ENTITY_ID = entityId;
        return this;
    }
    setChatId(chatId) {
        this.CHAT_ID = chatId;
        return this;
    }
    build() {
        if (!this.CONNECTOR_ID || !this.CONNECTOR_CODE || !this.ENTITY_ID || !this.CHAT_ID) {
            throw Error("Nem todas as informações necessárias para formar o USER_CODE foram preenchidas.");
        }
        return `${this.CONNECTOR_ID}|${this.CONNECTOR_CODE}|${this.ENTITY_ID}|${this.CHAT_ID}`;
    }
}
export class OpenLineDialogBuilder extends BitrixBuilder {
    getSessionId() {
        return this.getData().entity_data_1.split("|")[5];
    }
}
