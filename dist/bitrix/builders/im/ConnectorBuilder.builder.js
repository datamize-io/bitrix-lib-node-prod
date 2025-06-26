import { BitrixBuilder } from "../BitrixBuilder.builder.js";
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
}
