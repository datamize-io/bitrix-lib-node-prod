import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class InvoiceBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 31,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
}
