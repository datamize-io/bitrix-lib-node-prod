/**
 * @export
 * @class ImConnectorDataSetBuilder
 */
export class ImConnectorDataSetBuilder {
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
