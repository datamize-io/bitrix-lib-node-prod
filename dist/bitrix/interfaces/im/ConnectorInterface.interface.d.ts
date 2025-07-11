export interface ConnectorInterface {
}
export interface ConnectorMessageFileInterface {
    url: string;
    name?: string;
}
export interface ConnectorMessageInterface {
    id: string | number;
    date: number;
    disable_crm?: "Y" | "N";
    text?: string;
    files?: ConnectorMessageFileInterface[];
}
export interface ConnectorUserMessageInterface {
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
}
export interface ConnectorSendMessageInterface {
    user: ConnectorUserMessageInterface;
    message: ConnectorMessageInterface;
    chat?: Record<string, any>;
}
export interface ConnectorSendMessagesInterface {
    MESSAGES: ConnectorSendMessageInterface[];
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
