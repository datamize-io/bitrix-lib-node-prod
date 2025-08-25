import { Item } from "../../models/crm/Item.js";
export class InvoiceBuilder extends Item {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 31,
            useOriginalUfNames: "Y",
            select: ["*"],
        };
    }
}
