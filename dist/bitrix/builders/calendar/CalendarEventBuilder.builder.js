import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class CalendarEventBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "calendar.event";
    }
    setType(type) {
        this.data.type = type;
        return this;
    }
    getById(id) {
        const request = this.instance.request(`${this.prefixDefault}.getById`, {
            id,
        });
        return request;
    }
}
