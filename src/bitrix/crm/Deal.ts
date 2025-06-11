import { BitrixBuilder } from "../BitrixBuilder.js";

export class Deal extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.deal";

  setContact(value: any): Deal {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("CONTACT_ID", value);
    return this;
  }

  setContacts(value: any[]): Deal {
    if (!value) return this;
    value = value.map((v) => (typeof v === "object" ? v.data.ID : v));
    this.setField("CONTACT_IDS", value);
    return this;
  }

  setName(value: any): Deal {
    if (!value) return this;
    this.setField("TITLE", value);
    return this;
  }

  setPipeline(value: any): Deal {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("CATEGORY_ID", value);
    return this;
  }

  setStage(value: any = null): Deal {
    if (!value) return this;

    if (value.data?.CATEGORY_ID) {
      return this.setPipeline(value.data.CATEGORY_ID).setStage(value.data.STATUS_ID);
    }

    value = value.data ? value.data.STATUS_ID : value;
    this.setField("STAGE_ID", value);
    return this;
  }

  setValue(value: any, currency: string = "BRL"): Deal {
    if (!value) return this;
    this.setCurrency(currency);
    this.setField("OPPORTUNITY", value);
    return this;
  }

  setCurrency(value: string = "BRL"): Deal {
    if (!value) return this;
    this.setField("CURRENCY_ID", value);
    return this;
  }

  setStatus(value: boolean = true): Deal {
    if (value === undefined || value === null) return this;
    this.setField("OPENED", value ? "Y" : "N");
    return this;
  }

  setOriginId(value: any): Deal {
    if (!value) return this;
    this.setField("ORIGIN_ID", value);
    return this;
  }

  setSource(value: any): Deal {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    const source = this.getData().source || {};
    source.id_ = value;
    this.setField("source", source);
    return this;
  }

  setTrack(utms: any): Deal {
    if (!utms) return this;
    const { utm_campaign, utm_source, utm_medium, utm_content, utm_term } = utms;
    this.setField("UTM_CAMPAIGN", utm_campaign);
    this.setField("UTM_SOURCE", utm_source);
    this.setField("UTM_MEDIUM", utm_medium);
    this.setField("UTM_CONTENT", utm_content);
    this.setField("UTM_TERM", utm_term);
    return this;
  }

  setField(field: string, value: any): this {
    if (value === undefined || value === null) return this;
    const fullField = field.startsWith("UF_CRM_") || !field.startsWith("UF_CRM") ? field : "UF_CRM_" + field;
    this.getData()[fullField] = value;
    return this;
  }

  setUser(value: any): Deal {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("ASSIGNED_BY_ID", value);
    return this;
  }
}
