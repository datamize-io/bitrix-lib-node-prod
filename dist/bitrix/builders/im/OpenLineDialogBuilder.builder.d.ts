import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { OpenLineDialogInterface } from "../../interfaces/im/OpenLineDialogInterface.interface.js";
export declare class UserCodeBuilder {
    CONNECTOR_CODE?: string;
    CONNECTOR_ID?: string | number;
    ENTITY_ID?: string | number;
    CHAT_ID?: string | number;
    setConnectorCode(connectorCode: string): this;
    setConnectorId(connectorId: string | number): this;
    setEntityId(entityId: string | number): this;
    setChatId(chatId: string | number): this;
    build(): string;
}
export declare abstract class OpenLineDialogBuilder extends BitrixBuilder implements OpenLineDialogInterface {
    getSessionId(): any;
    getLeadId(): any;
    getCompanyId(): any;
    getContactId(): any;
    getDealId(): any;
}
