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
export declare class ImConnectorDataSetBuilder {
    private data;
    setConnector(connector: string): this;
    setLine(line: string): this;
    DataSet(id: number | string, url: string, url_im: string, name: string): this;
    build(): ImConnectorDataSet;
}
