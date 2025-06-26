/**
 *
 * @export
 * @interface ImConnectorDataSet
 */
export interface ImConnectorDataSet {
  CONNECTOR: string;
  LINE: number;
  DATA: {
    id: number | string;
    url: string;
    url_im: string;
    name: string;
  };
}

/**
 * @export
 * @class ImConnectorDataSetBuilder
 */
export class ImConnectorDataSetBuilder {
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

  build(): ImConnectorDataSet {
    return this.data as ImConnectorDataSet;
  }
}
