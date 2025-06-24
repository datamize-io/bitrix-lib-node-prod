import { BitrixBuilder } from "./BitrixBuilder.js";
export class Deal extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.deal";
    }
}
