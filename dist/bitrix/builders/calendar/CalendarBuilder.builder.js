import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class CalendarBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "calendar";
    }
}
