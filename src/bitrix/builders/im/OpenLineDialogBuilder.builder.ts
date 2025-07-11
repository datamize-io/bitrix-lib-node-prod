import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { OpenLineDialogInterface } from "../../interfaces/im/OpenLineDialogInterface.interface.js";

export class UserCodeBuilder {
  CONNECTOR_CODE?: string;
  CONNECTOR_ID?: string | number;
  ENTITY_ID?: string | number;
  CHAT_ID?: string | number;

  setConnectorCode(connectorCode: string) {
    this.CONNECTOR_CODE = connectorCode;
    return this;
  }
  setConnectorId(connectorId: string | number) {
    this.CONNECTOR_ID = connectorId;
    return this;
  }
  setEntityId(entityId: string | number) {
    this.ENTITY_ID = entityId;
    return this;
  }
  setChatId(chatId: string | number) {
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

export abstract class OpenLineDialogBuilder extends BitrixBuilder implements OpenLineDialogInterface {}
