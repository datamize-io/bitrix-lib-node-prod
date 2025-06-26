import { Item } from "./Item.js";

export class Lead extends Item {
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 1,
    useOriginalUfNames: "Y",
    select: ["*"],
  };

  setContact(value: any): Lead {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("contactId", value);
    return this;
  }

  setContacts(value: any[]): Lead {
    if (!value) return this;
    value = value.map((v) => (typeof v === "object" ? v.data.ID : v));
    this.setField("contactIds", value);
    return this;
  }

  setName(value: any): Lead {
    if (!value) return this;
    this.setField("title", value);
    return this;
  }

  setPipeline(value: any): Lead {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("categoryId", value);
    return this;
  }

  setStage(value: any = null): Lead {
    if (!value) return this;

    value = value.data ? value.data.STATUS_ID : value;
    this.setField("stageId", value);
    return this;
  }

  setValue(value: any, currency: string = "BRL"): Lead {
    if (!value) return this;
    this.setCurrency(currency);
    this.setField("opportunity", value);
    return this;
  }

  setCurrency(value: string = "BRL"): Lead {
    if (!value) return this;
    this.setField("currencyId", value);
    return this;
  }

  setStatus(value: boolean = true): Lead {
    if (value === undefined || value === null) return this;
    this.setField("opened", value ? "Y" : "N");
    return this;
  }

  setOriginId(value: any): Lead {
    if (!value) return this;
    this.setField("originId", value);
    return this;
  }

  setSource(value: any): Lead {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    const source = this.getData().source || {};
    source.id_ = value;
    this.setField("source", source);
    return this;
  }

  setTrack(utms: any): Lead {
    if (!utms) return this;
    const { utm_campaign, utm_source, utm_medium, utm_content, utm_term } = utms;
    this.setField("utmCampaign", utm_campaign);
    this.setField("utmSource", utm_source);
    this.setField("utmMedium", utm_medium);
    this.setField("utmContent", utm_content);
    this.setField("utmTerm", utm_term);
    return this;
  }

  setField(field: string, value: any): this {
    if (value === undefined || value === null) return this;
    const fullField = field.startsWith("UF_CRM_") || !field.startsWith("UF_CRM") ? field : "UF_CRM_" + field;
    super.setField(fullField, value);
    return this;
  }

  setUser(value: any): Lead {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("assignedById", value);
    return this;
  }

  getByStageId(stageId: string) {
    return this.setFilterItem("stageId", stageId).collect();
  }

  async moveToStage(stageId: string, object: object) {
    const LeadsToMove = !Array.isArray(object) ? [object] : object;
    const responses: Array<object> = [];
    LeadsToMove.forEach(async (Lead) => {
      const response = await Lead.setField("categoryId", 22).setField("stageId", stageId).update();
      responses.push(response);
    });

    return responses;
  }
}
