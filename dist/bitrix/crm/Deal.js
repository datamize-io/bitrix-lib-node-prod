import { Item } from "./Item.js";
export class Deal extends Item {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 2,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
    setContact(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("contactId", value);
        return this;
    }
    setContacts(value) {
        if (!value)
            return this;
        value = value.map((v) => (typeof v === "object" ? v.data.ID : v));
        this.setField("contactIds", value);
        return this;
    }
    setName(value) {
        if (!value)
            return this;
        this.setField("title", value);
        return this;
    }
    setPipeline(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("categoryId", value);
        return this;
    }
    setStage(value = null) {
        if (!value)
            return this;
        value = value.data ? value.data.STATUS_ID : value;
        this.setField("stageId", value);
        return this;
    }
    setValue(value, currency = "BRL") {
        if (!value)
            return this;
        this.setCurrency(currency);
        this.setField("opportunity", value);
        return this;
    }
    setCurrency(value = "BRL") {
        if (!value)
            return this;
        this.setField("currencyId", value);
        return this;
    }
    setStatus(value = true) {
        if (value === undefined || value === null)
            return this;
        this.setField("opened", value ? "Y" : "N");
        return this;
    }
    setOriginId(value) {
        if (!value)
            return this;
        this.setField("originId", value);
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
        this.setField("utmCampaign", utm_campaign);
        this.setField("utmSource", utm_source);
        this.setField("utmMedium", utm_medium);
        this.setField("utmContent", utm_content);
        this.setField("utmTerm", utm_term);
        return this;
    }
    setField(field, value) {
        if (value === undefined || value === null)
            return this;
        const fullField = field.startsWith("UF_CRM_") || !field.startsWith("UF_CRM") ? field : "UF_CRM_" + field;
        super.setField(fullField, value);
        return this;
    }
    setUser(value) {
        if (!value)
            return this;
        value = value.data ? value.data.ID : value;
        this.setField("assignedById", value);
        return this;
    }
    getByStageId(stageId) {
        return this.setFilterItem("stageId", stageId).collect();
    }
    async moveToStage(stageId, object) {
        const dealsToMove = !Array.isArray(object) ? [object] : object;
        const responses = [];
        dealsToMove.forEach(async (deal) => {
            deal.setField("STAGE_ID", stageId);
            const response = await deal.setField("categoryId", 22).setField("stageId", stageId).update();
            responses.push(response);
        });
        return responses;
    }
}
