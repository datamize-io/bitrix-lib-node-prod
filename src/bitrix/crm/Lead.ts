import { BitrixBuilder } from "../BitrixBuilder.js";

export class Lead extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.lead";

  setContact(value: any): Lead {
    if (!value) {
      return this;
    }
    value = value.data ? value.data.ID : value;

    this.data.CONTACT_ID = value;
    return this;
  }

  setContacts(value: any[]): Lead {
    if (!value) {
      return this;
    }
    value = value.map((v) => (typeof v == "object" ? v.data.ID : v));

    this.data.CONTACT_IDS = value;
    return this;
  }

  setName(value: any): Lead {
    if (!value) {
      return this;
    }
    this.data.TITLE = value;
    return this;
  }

  setPipeline(value: any): Lead {
    if (!value) {
      return this;
    }
    value = value.data ? value.data.ID : value;

    this.data.CATEGORY_ID = value;
    return this;
  }

  setStage(value: any = null): Lead {
    if (!value) {
      return this;
    }

    if (value.data?.CATEGORY_ID) {
      return this.setPipeline(value.data.CATEGORY_ID).setStage(value.data.STATUS_ID);
    }

    value = value.data ? value.data.STATUS_ID : value;

    this.data.STAGE_ID = value;
    return this;
  }

  setValue(value: any, currency: string = "BRL") {
    if (!value) {
      return this;
    }
    this.setCurrency(currency);
    this.data.OPPORTUNITY = value;
    return this;
  }

  setCurrency(value = "BRL") {
    if (!value) {
      return this;
    }
    this.data.CURRENCY_ID = value;
    return this;
  }

  setStatus(value = true) {
    if (!value) {
      return this;
    }
    this.data.OPENED = value ? "Y" : "N";
    return this;
  }

  setOriginId(value: any): Lead {
    if (!value) {
      return this;
    }
    this.data.ORIGIN_ID = value;
    return this;
  }

  setSource(value: any): Lead {
    if (!value) {
      return this;
    }
    value = value.data ? value.data.ID : value;
    if (!this.data.source) {
      this.data.source = {};
    }
    this.data.source.id_ = value;
    return this;
  }

  setTrack(utms: any): Lead {
    if (!utms) {
      return this;
    }
    const { utm_campaign, utm_source, utm_medium, utm_content, utm_term } = utms;
    this.data.UTM_CAMPAIGN = utm_campaign;
    this.data.UTM_SOURCE = utm_source;
    this.data.UTM_MEDIUM = utm_medium;
    this.data.UTM_CONTENT = utm_content;
    this.data.UTM_TERM = utm_term;
    return this;
  }

  setField(field: string, value: any): Lead {
    if (!value) {
      return this;
    }
    field = field.includes("UF_CRM") ? field : "UF_CRM_" + field;
    this.data[field] = value;
    return this;
  }

  setUser(value: any): Lead {
    if (!value) {
      return this;
    }
    value = value.data ? value.data.ID : value;

    this.data.ASSIGNED_BY_ID = value;
    return this;
  }
}
