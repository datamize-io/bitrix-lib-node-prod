export interface ConnectorInterface {
  // TODO: Defina os campos da interface
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
  id: string | number; // User ID in the external system *
  last_name?: string; // Last name (opcional)
  name?: string; // First name (opcional)
  picture?: {
    url: string; // Link to the user's avatar
  };
  url?: string; // Link to the user's profile (opcional)
  sex?: "male" | "female"; // Gender (opcional)
  email?: string; // Email (opcional)
  phone?: string | number; // Phone (opcional)
  skip_phone_validate?: "Y" | "N"; // Se 'Y', ignora validação de telefone
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
  ID: string; // Ex: 'datamize_whatsapp'
  NAME: string; // Nome visível do canal
  ICON: {
    DATA_IMAGE: string; // Base64 do SVG
    COLOR?: string; // Ex: '#1900ff'
    SIZE?: string; // Ex: '90%'
    POSITION?: string; // Ex: 'center'
  };
  PLACEMENT_HANDLER: string; // URL que abre o setup no slider do Bitrix

  ICON_DISABLED?: {
    DATA_IMAGE: string;
    COLOR?: string;
    SIZE?: string;
    POSITION?: string;
  };

  DEL_EXTERNAL_MESSAGES?: boolean; // default: true
  EDIT_INTERNAL_MESSAGES?: boolean; // default: true
  DEL_INTERNAL_MESSAGES?: boolean; // default: true
  NEWSLETTER?: boolean; // default: true
  NEED_SYSTEM_MESSAGES?: boolean; // default: true
  NEED_SIGNATURE?: boolean; // default: true
  CHAT_GROUP?: "Y" | "N"; // default: 'Y'
  COMMENT?: string; // descrição opcional do conector
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
