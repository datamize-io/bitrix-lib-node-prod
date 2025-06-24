import { BitrixBuilder } from "../BitrixBuilder.js";
export class Deal extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.deal";
    }
    setContact(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("CONTACT_ID", value);
        return this;
    }
    setContacts(value) {
        if (!value)
            return this;
        value = value.map((v) => (typeof v === "object" ? v.data.ID : v));
        this.setField("CONTACT_IDS", value);
        return this;
    }
    setName(value) {
        if (!value)
            return this;
        this.setField("TITLE", value);
        return this;
    }
    setPipeline(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("CATEGORY_ID", value);
        return this;
    }
    setStage(value = null) {
        if (!value)
            return this;
        if (value.data?.CATEGORY_ID) {
            return this.setPipeline(value.data.CATEGORY_ID).setStage(value.data.STATUS_ID);
        }
        value = value.data ? value.data.STATUS_ID : value;
        this.setField("STAGE_ID", value);
        return this;
    }
    setValue(value, currency = "BRL") {
        if (!value)
            return this;
        this.setCurrency(currency);
        this.setField("OPPORTUNITY", value);
        return this;
    }
    setCurrency(value = "BRL") {
        if (!value)
            return this;
        this.setField("CURRENCY_ID", value);
        return this;
    }
    setStatus(value = true) {
        if (value === undefined || value === null)
            return this;
        this.setField("OPENED", value ? "Y" : "N");
        return this;
    }
    setOriginId(value) {
        if (!value)
            return this;
        this.setField("ORIGIN_ID", value);
        return this;
    }
    setSource(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        const source = this.getData().source || {};
        source.id_ = value;
        this.setField("source", source);
        return this;
    }
    setTrack(utms) {
        if (!utms)
            return this;
        const { utm_campaign, utm_source, utm_medium, utm_content, utm_term } = utms;
        this.setField("UTM_CAMPAIGN", utm_campaign);
        this.setField("UTM_SOURCE", utm_source);
        this.setField("UTM_MEDIUM", utm_medium);
        this.setField("UTM_CONTENT", utm_content);
        this.setField("UTM_TERM", utm_term);
        return this;
    }
    setField(field, value) {
        if (value === undefined || value === null)
            return this;
        const fullField = field.startsWith("UF_CRM_") || !field.startsWith("UF_CRM") ? field : "UF_CRM_" + field;
        this.getData()[fullField] = value;
        return this;
    }
    setUser(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("ASSIGNED_BY_ID", value);
        return this;
    }
}
