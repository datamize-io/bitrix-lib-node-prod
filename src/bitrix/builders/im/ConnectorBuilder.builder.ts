import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { ConnectorInterface } from "../../interfaces/im/ConnectorInterface.interface.js";

export class ConnectorRegisterBuilder {
  private data: Partial<any> = {};

  setId(id: string) {
    this.data.ID = id;
    return this;
  }

  setName(name: string) {
    this.data.NAME = name;
    return this;
  }

  setPlacementHandler(url: string) {
    this.data.PLACEMENT_HANDLER = url;
    return this;
  }

  setIcon(DATA_IMAGE: string, COLOR?: string, SIZE?: string, POSITION?: string) {
    this.data.ICON = { DATA_IMAGE, COLOR, SIZE, POSITION };
    return this;
  }

  setDisabledIcon(iconDisabled: { DATA_IMAGE: string; COLOR?: string; SIZE?: string; POSITION?: string }) {
    this.data.ICON_DISABLED = iconDisabled;
    return this;
  }

  enableDelete(value: boolean = true) {
    this.data.DEL_EXTERNAL_MESSAGES = value;
    return this;
  }

  enableDeleteInternal(value: boolean = true) {
    this.data.DEL_INTERNAL_MESSAGES = value;
    return this;
  }

  enableEdit(value: boolean = true) {
    this.data.EDIT_INTERNAL_MESSAGES = value;
    return this;
  }

  enableMailing(value: boolean = true) {
    this.data.NEWSLETTER = value;
    return this;
  }

  enableSystemMessages(value: boolean = true) {
    this.data.NEED_SYSTEM_MESSAGES = value;
    return this;
  }

  enableSignature(value: boolean = true) {
    this.data.NEED_SIGNATURE = value;
    return this;
  }

  enableChatGroup(value: "Y" | "N" = "Y") {
    this.data.CHAT_GROUP = value;
    return this;
  }

  setWidgetHandlerDescription(comment: string) {
    this.data.COMMENT = comment;
    return this;
  }

  patch(object: ConnectorRegisterBuilder) {
    this.data = { ...object };
    return this;
  }

  build(): ConnectorRegisterBuilder {
    return this.data as ConnectorRegisterBuilder;
  }
}

export class ConnectorDatasetBuilder {
  private data: Record<string, any> = {};
  setConnector(connector: string) {
    this.data.CONNECTOR = connector;
    return this;
  }

  setLine(line: string) {
    this.data.LINE = line;
    return this;
  }

  DataSet(id: number | string, url: string, url_im: string, name: string) {
    this.data.DATA = { id, url, url_im, name };
    return this;
  }

  build(): ConnectorDatasetBuilder {
    return this.data as ConnectorDatasetBuilder;
  }
}

export abstract class ConnectorBuilder extends BitrixBuilder implements ConnectorInterface {
  protected prefixDefault: string | null = "imconnector";

  get DatasetBuilder(): ConnectorDatasetBuilder {
    return new ConnectorDatasetBuilder();
  }

  get RegisterBuilder(): ConnectorRegisterBuilder {
    return new ConnectorRegisterBuilder();
  }
}
