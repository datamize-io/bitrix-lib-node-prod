import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { ConnectorInterface, ConnectorUserMessageInterface, ConnectorMessageInterface, ConnectorMessageFileInterface } from "../../interfaces/im/ConnectorInterface.interface.js";
export declare class ConnectorMessageBuilder implements ConnectorMessageInterface {
    id: string | number;
    date: number;
    disable_crm?: "Y" | "N";
    text?: string;
    files?: ConnectorMessageFileInterface[];
    setId(id: string | number): this;
    setDate(date: number | Date): this;
    disableCrm(disable?: "Y" | "N"): this;
    setText(text: string): this;
    addFile(url: string, name?: string): this;
    addFiles(files: ConnectorMessageFileInterface[]): this;
    build(): ConnectorMessageInterface;
}
export declare class ConnectorUserMessageBuilder implements ConnectorUserMessageInterface {
    id: string | number;
    last_name?: string;
    name?: string;
    picture?: {
        url: string;
    };
    url?: string;
    sex?: "male" | "female";
    email?: string;
    phone?: string | number;
    skip_phone_validate?: "Y" | "N";
    setId(id: string | number): this;
    setLastName(lastName: string): this;
    setName(name: string): this;
    setPicture(url: string): this;
    setUrl(url: string): this;
    setSex(sex: "male" | "female"): this;
    setEmail(email: string): this;
    setPhone(phone: string | number): this;
    skipPhoneValidate(skip?: "Y" | "N"): this;
    build(): ConnectorUserMessageInterface;
}
export declare class ConnectorRegisterBuilder {
    private data;
    setId(id: string): this;
    setName(name: string): this;
    setPlacementHandler(url: string): this;
    setIcon(DATA_IMAGE: string, COLOR?: string, SIZE?: string, POSITION?: string): this;
    setDisabledIcon(iconDisabled: {
        DATA_IMAGE: string;
        COLOR?: string;
        SIZE?: string;
        POSITION?: string;
    }): this;
    enableDelete(value?: boolean): this;
    enableDeleteInternal(value?: boolean): this;
    enableEdit(value?: boolean): this;
    enableMailing(value?: boolean): this;
    enableSystemMessages(value?: boolean): this;
    enableSignature(value?: boolean): this;
    enableChatGroup(value?: "Y" | "N"): this;
    setWidgetHandlerDescription(comment: string): this;
    patch(object: ConnectorRegisterBuilder): this;
    build(): ConnectorRegisterBuilder;
}
export declare class ConnectorDatasetBuilder {
    private data;
    setConnector(connector: string): this;
    setLine(line: string): this;
    DataSet(id: number | string, url: string, url_im: string, name: string): this;
    build(): ConnectorDatasetBuilder;
}
export declare abstract class ConnectorBuilder extends BitrixBuilder implements ConnectorInterface {
    protected prefixDefault: string | null;
    get DatasetBuilder(): ConnectorDatasetBuilder;
    get RegisterBuilder(): ConnectorRegisterBuilder;
    get UserMessageBuilder(): ConnectorUserMessageBuilder;
    get MessageBuilder(): ConnectorMessageBuilder;
}
