export interface ImConnectorRegister {
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

export class ImConnectorRegisterBuilder {
  private data: Partial<ImConnectorRegister> = {};

  setId(id: string) {
    this.data.ID = id;
    return this;
  }

  setName(name: string) {
    this.data.NAME = name;
    return this;
  }

  setPlacementHandler(url: string) {
    this.data.PLACEMENT_HANDLER = url;
    return this;
  }

  setIcon(DATA_IMAGE: string, COLOR?: string, SIZE?: string, POSITION?: string) {
    this.data.ICON = { DATA_IMAGE, COLOR, SIZE, POSITION };
    return this;
  }

  setDisabledIcon(iconDisabled: { DATA_IMAGE: string; COLOR?: string; SIZE?: string; POSITION?: string }) {
    this.data.ICON_DISABLED = iconDisabled;
    return this;
  }

  enableDelete(value: boolean = true) {
    this.data.DEL_EXTERNAL_MESSAGES = value;
    return this;
  }

  enableDeleteInternal(value: boolean = true) {
    this.data.DEL_INTERNAL_MESSAGES = value;
    return this;
  }

  enableEdit(value: boolean = true) {
    this.data.EDIT_INTERNAL_MESSAGES = value;
    return this;
  }

  enableMailing(value: boolean = true) {
    this.data.NEWSLETTER = value;
    return this;
  }

  enableSystemMessages(value: boolean = true) {
    this.data.NEED_SYSTEM_MESSAGES = value;
    return this;
  }

  enableSignature(value: boolean = true) {
    this.data.NEED_SIGNATURE = value;
    return this;
  }

  enableChatGroup(value: "Y" | "N" = "Y") {
    this.data.CHAT_GROUP = value;
    return this;
  }

  setWidgetHandlerDescription(comment: string) {
    this.data.COMMENT = comment;
    return this;
  }

  patch(object: ImConnectorRegister) {
    this.data = { ...object };
    return this;
  }

  build(): ImConnectorRegister {
    return this.data as ImConnectorRegister;
  }
}
