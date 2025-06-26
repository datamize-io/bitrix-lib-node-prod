export interface ConnectorInterface {
}
export interface ConnectorRegister {
    ID: string;
    NAME: string;
    ICON: {
        DATA_IMAGE: string;
        COLOR?: string;
        SIZE?: string;
        POSITION?: string;
    };
    PLACEMENT_HANDLER: string;
    ICON_DISABLED?: {
        DATA_IMAGE: string;
        COLOR?: string;
        SIZE?: string;
        POSITION?: string;
    };
    DEL_EXTERNAL_MESSAGES?: boolean;
    EDIT_INTERNAL_MESSAGES?: boolean;
    DEL_INTERNAL_MESSAGES?: boolean;
    NEWSLETTER?: boolean;
    NEED_SYSTEM_MESSAGES?: boolean;
    NEED_SIGNATURE?: boolean;
    CHAT_GROUP?: "Y" | "N";
    COMMENT?: string;
}
export interface ConnectorDataSet {
    CONNECTOR: string;
    LINE: number;
    DATA: {
        id: number | string;
        url: string;
        url_im: string;
        name: string;
    };
}
