export interface ConnectorInterface {
  // TODO: Defina os campos da interface
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
