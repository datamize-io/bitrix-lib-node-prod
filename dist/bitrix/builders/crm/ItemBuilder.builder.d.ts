import { Item } from "../../models/crm/Item.js";
import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export declare abstract class ItemBuilder extends BitrixBuilder {
    protected prefixDefault: string | null;
    protected defaultParams: Record<string, any | null>;
    asItem(): Item;
    setFormatFields(type: "NEW" | "OLD"): this;
    setEntityTypeId(entityTypeId: number): this;
    setId(id: string | number): this;
    getData(): any;
    collect<T = any>(params?: any, method?: string | null, collectField?: string): Promise<T>;
}
