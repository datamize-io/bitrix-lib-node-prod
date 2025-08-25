import { Item } from "../../models/crm/Item.js";
export class CompanyBuilder extends Item {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 4,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
}
