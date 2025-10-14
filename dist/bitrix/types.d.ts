export type CommandRegister = {
    BOT_ID: number;
    COMMAND: string;
    COMMON?: "Y" | "N";
    HIDDEN?: "Y" | "N";
    EXTRANET_SUPPORT?: "Y" | "N";
    CLIENT_ID?: string;
    LANG: Array<Record<string, any>>;
    EVENT_COMMAND_ADD: string;
};
export type CustomMessageColorToken = "primary" | "secondary" | "alert" | "base";
export type MainColors = "#ff0000" | "#ffffff" | "#333333" | "#000000";
export type CustomMessageAttachmentUser = {
    NAME?: string;
    AVATAR?: string;
    LINK?: string;
    CHAT_ID?: string | number;
    USER_ID?: string | number;
    BOT_ID?: string | number;
};
export type CustomMessageAttachmentDelimiter = {
    SIZE: number;
    COLOR: string;
};
export type CustomMessageAttachmentImage = {
    NAME?: string;
    LINK?: string;
    PREVIEW?: string;
    WIDTH?: number;
    HEIGHT?: number;
};
export type CustomMessageAttachmentFile = {
    NAME: string;
    LINK: string;
    SIZE?: number;
};
export type CustomMessageAttachmentGrid = {
    NAME: string;
    VALUE: string;
    DISPLAY?: "LINE" | "BLOCK" | "COLUMN";
    COLOR_TOKEN?: CustomMessageColorToken;
    COLOR?: MainColors;
    WIDTH?: number;
    HEIGHT?: number;
};
export type CustomMessageAttachmentLink = {
    PREVIEW?: string;
    WIDTH?: number;
    HEIGHT?: number;
    NAME?: string;
    DESC?: string;
    LINK?: string;
    CHAT_ID?: string | number;
    USER_ID?: string | number;
};
export type CustomMessageAttachmentItem = {
    USER?: CustomMessageAttachmentUser;
    DELIMITER?: CustomMessageAttachmentDelimiter;
    GRID?: CustomMessageAttachmentGrid[];
    LINK?: CustomMessageAttachmentLink;
    IMAGE?: CustomMessageAttachmentImage;
    FILE?: CustomMessageAttachmentFile;
    MESSAGE?: string;
};
export type CustomMessageAttachment = {
    ID?: number;
    COLOR_TOKEN?: CustomMessageColorToken;
    COLOR?: MainColors;
    BLOCKS?: Array<CustomMessageAttachmentItem>;
};
export type CustomMessage = {
    CLIENT_ID: string | number;
    DIALOG_ID: string | number;
    MESSAGE: string;
    SYSTEM: "N" | "Y";
    ATTACH?: CustomMessageAttachment;
};
