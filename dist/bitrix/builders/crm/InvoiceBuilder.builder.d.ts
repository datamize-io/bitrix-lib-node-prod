import { Item } from "../../models/crm/Item.js";
export declare abstract class InvoiceBuilder extends Item {
    protected defaultParams: Record<string, any | null>;
}
