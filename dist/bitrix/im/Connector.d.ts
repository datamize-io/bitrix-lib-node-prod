import { BitrixBuilder } from "../BitrixBuilder.js";
import { ImConnectorRegister, ImConnectorRegisterBuilder } from "./imconnector-register.interface.js";
export declare class Connector extends BitrixBuilder {
    protected prefixDefault: string | null;
    register(registerBuilder: ImConnectorRegister | ImConnectorRegisterBuilder): Promise<any>;
    getRegisterBuilder(): ImConnectorRegisterBuilder;
    activate(): void;
    deactivate(): void;
    list(): void;
    unregister(): void;
    setConnectorData(): void;
    getStatus(): void;
    addWidget(): void;
    onImConnectorLineDelete(): void;
    onImConnectorStatusDelete(): void;
    sendMessages(): void;
    updateMessage(): void;
    deleteMessage(): void;
    updateStatus(status: "delivered" | "read"): void;
    setChatName(): void;
}
