import { ItemBuilder } from "./ItemBuilder.builder.js";
export class CompanyBuilder extends ItemBuilder {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 4,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
}
