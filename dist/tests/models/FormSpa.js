import { Item } from "../../bitrix/index.js";
export class FormSPA extends Item {
    constructor() {
        super(...arguments);
        this.defaultParams = {
            entityTypeId: 1100,
        };
    }
}
