import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import {
  ConnectorInterface,
  ConnectorUserMessageInterface,
  ConnectorMessageInterface,
  ConnectorMessageFileInterface,
} from "../../interfaces/im/ConnectorInterface.interface.js";

export class ConnectorMessageBuilder implements ConnectorMessageInterface {
  id!: string | number;
  date!: number;
  disable_crm?: "Y" | "N";
  text?: string;
  files?: ConnectorMessageFileInterface[];

  setId(id: string | number) {
    this.id = id;
    return this;
  }

  setDate(date: number | Date) {
    this.date = date instanceof Date ? Math.floor(date.getTime() / 1000) : date;
    return this;
  }

  disableCrm(disable: "Y" | "N" = "Y") {
    this.disable_crm = disable;
    return this;
  }

  setText(text: string) {
    this.text = text;
    return this;
  }

  addFile(url: string, name?: string) {
    if (!this.files) this.files = [];
    this.files.push({ url, name });
    return this;
  }

  addFiles(files: ConnectorMessageFileInterface[]) {
    if (!this.files) this.files = [];
    this.files.push(...files);
    return this;
  }

  build(): ConnectorMessageInterface {
    if (!this.id || !this.date) {
      throw Error("Parâmetros obrigatórios não fornecidos: ID e DATE.");
    }

    return {
      id: this.id,
      date: this.date,
      disable_crm: this.disable_crm,
      text: this.text,
      files: this.files,
    };
  }
}

export class ConnectorUserMessageBuilder implements ConnectorUserMessageInterface {
  id!: string | number;
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

  setId(id: string | number) {
    this.id = id;
    return this;
  }

  setLastName(lastName: string) {
    this.last_name = lastName;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setPicture(url: string) {
    this.picture = { url };
    return this;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setSex(sex: "male" | "female") {
    this.sex = sex;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setPhone(phone: string | number) {
    this.phone = phone;
    return this;
  }

  skipPhoneValidate(skip: "Y" | "N" = "Y") {
    this.skip_phone_validate = skip;
    return this;
  }

  build(): ConnectorUserMessageInterface {
    return {
      id: this.id,
      last_name: this.last_name,
      name: this.name,
      picture: this.picture,
      url: this.url,
      sex: this.sex,
      email: this.email,
      phone: this.phone,
      skip_phone_validate: this.skip_phone_validate,
    };
  }
}

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

  get UserMessageBuilder(): ConnectorUserMessageBuilder {
    return new ConnectorUserMessageBuilder();
  }

  get MessageBuilder(): ConnectorMessageBuilder {
    return new ConnectorMessageBuilder();
  }
}
