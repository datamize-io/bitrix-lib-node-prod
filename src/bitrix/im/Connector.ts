import { BitrixBuilder } from "../BitrixBuilder.js";
import { ImConnectorRegister, ImConnectorRegisterBuilder } from "./imconnector-register.interface.js";

export class Connector extends BitrixBuilder {
  protected prefixDefault: string | null = "imconnector";

  // Connector

  async register(registerBuilder: ImConnectorRegister | ImConnectorRegisterBuilder) {
    const data = registerBuilder instanceof ImConnectorRegisterBuilder ? registerBuilder.build() : registerBuilder;

    return await this.requestAndPatch("imconnector.register", data);
  }

  getRegisterBuilder(): ImConnectorRegisterBuilder {
    return new ImConnectorRegisterBuilder();
  }

  activate() {}

  deactivate() {}

  list() {}

  unregister() {}

  setConnectorData() {}

  getStatus() {}

  addWidget() {}

  //Connector Events

  onImConnectorLineDelete() {}

  onImConnectorStatusDelete() {}

  // Messages
  sendMessages() {}

  updateMessage() {}

  deleteMessage() {}

  updateStatus(status: "delivered" | "read") {}

  // Chat
  setChatName() {}
}
