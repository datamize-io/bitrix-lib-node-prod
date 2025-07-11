import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class ConnectorMessageBuilder {
    setId(id) {
        this.id = id;
        return this;
    }
    setDate(date) {
        this.date = date instanceof Date ? Math.floor(date.getTime() / 1000) : date;
        return this;
    }
    disableCrm(disable = "Y") {
        this.disable_crm = disable;
        return this;
    }
    setText(text) {
        this.text = text;
        return this;
    }
    addFile(url, name) {
        if (!this.files)
            this.files = [];
        this.files.push({ url, name });
        return this;
    }
    addFiles(files) {
        if (!this.files)
            this.files = [];
        this.files.push(...files);
        return this;
    }
    build() {
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
export class ConnectorUserMessageBuilder {
    setId(id) {
        this.id = id;
        return this;
    }
    setLastName(lastName) {
        this.last_name = lastName;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setPicture(url) {
        this.picture = { url };
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setSex(sex) {
        this.sex = sex;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setPhone(phone) {
        this.phone = phone;
        return this;
    }
    skipPhoneValidate(skip = "Y") {
        this.skip_phone_validate = skip;
        return this;
    }
    build() {
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
    constructor() {
        this.data = {};
    }
    setId(id) {
        this.data.ID = id;
        return this;
    }
    setName(name) {
        this.data.NAME = name;
        return this;
    }
    setPlacementHandler(url) {
        this.data.PLACEMENT_HANDLER = url;
        return this;
    }
    setIcon(DATA_IMAGE, COLOR, SIZE, POSITION) {
        this.data.ICON = { DATA_IMAGE, COLOR, SIZE, POSITION };
        return this;
    }
    setDisabledIcon(iconDisabled) {
        this.data.ICON_DISABLED = iconDisabled;
        return this;
    }
    enableDelete(value = true) {
        this.data.DEL_EXTERNAL_MESSAGES = value;
        return this;
    }
    enableDeleteInternal(value = true) {
        this.data.DEL_INTERNAL_MESSAGES = value;
        return this;
    }
    enableEdit(value = true) {
        this.data.EDIT_INTERNAL_MESSAGES = value;
        return this;
    }
    enableMailing(value = true) {
        this.data.NEWSLETTER = value;
        return this;
    }
    enableSystemMessages(value = true) {
        this.data.NEED_SYSTEM_MESSAGES = value;
        return this;
    }
    enableSignature(value = true) {
        this.data.NEED_SIGNATURE = value;
        return this;
    }
    enableChatGroup(value = "Y") {
        this.data.CHAT_GROUP = value;
        return this;
    }
    setWidgetHandlerDescription(comment) {
        this.data.COMMENT = comment;
        return this;
    }
    patch(object) {
        this.data = { ...object };
        return this;
    }
    build() {
        return this.data;
    }
}
export class ConnectorDatasetBuilder {
    constructor() {
        this.data = {};
    }
    setConnector(connector) {
        this.data.CONNECTOR = connector;
        return this;
    }
    setLine(line) {
        this.data.LINE = line;
        return this;
    }
    DataSet(id, url, url_im, name) {
        this.data.DATA = { id, url, url_im, name };
        return this;
    }
    build() {
        return this.data;
    }
}
export class ConnectorBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "imconnector";
    }
    get DatasetBuilder() {
        return new ConnectorDatasetBuilder();
    }
    get RegisterBuilder() {
        return new ConnectorRegisterBuilder();
    }
    get UserMessageBuilder() {
        return new ConnectorUserMessageBuilder();
    }
    get MessageBuilder() {
        return new ConnectorMessageBuilder();
    }
}
