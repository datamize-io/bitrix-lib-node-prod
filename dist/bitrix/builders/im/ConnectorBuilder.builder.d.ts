import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { ConnectorInterface } from "../../interfaces/im/ConnectorInterface.interface.js";
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
}
