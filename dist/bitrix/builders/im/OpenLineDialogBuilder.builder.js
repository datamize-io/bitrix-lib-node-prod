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
    getUserCode() {
        return this.getData().entity_id;
    }
    getConnectorId() {
        const data = this.getData().entity_id;
        return data?.split("|")[0] || undefined;
    }
    getLineId() {
        const data = this.getData().entity_id;
        return data?.split("|")[1] || undefined;
    }
    getCallerId() {
        const data = this.getData().entity_id;
        return data?.split("|")[2] || undefined;
    }
    getSessionId() {
        const data = this.getData().entity_data_1;
        return data?.split("|")[5] || undefined;
    }
    getChatId() {
        return Number(this.getData().dialog_id);
    }
    getLeadId() {
        const data = this.getData().entity_data_2;
        return data?.split("|")[1] || undefined;
    }
    getCompanyId() {
        const data = this.getData().entity_data_2;
        return data?.split("|")[3] || undefined;
    }
    getContactId() {
        const data = this.getData().entity_data_2;
        return data?.split("|")[5] || undefined;
    }
    getDealId() {
        const data = this.getData().entity_data_2;
        return data?.split("|")[7] || undefined;
    }
}
