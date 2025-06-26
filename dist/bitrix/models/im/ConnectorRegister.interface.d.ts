export interface ImConnectorRegister {
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
export declare class ImConnectorRegisterBuilder {
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
    patch(object: ImConnectorRegister): this;
    build(): ImConnectorRegister;
}
