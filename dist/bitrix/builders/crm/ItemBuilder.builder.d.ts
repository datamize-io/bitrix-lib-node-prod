import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export declare abstract class ItemBuilder extends BitrixBuilder {
    protected prefixDefault: string | null;
    protected defaultParams: Record<string, any | null>;
    setEntityTypeId(entityTypeId: number): this;
    setId(id: string | number): this;
    collect<T = any>(params?: any, method?: string | null, collectField?: string): Promise<T>;
}
