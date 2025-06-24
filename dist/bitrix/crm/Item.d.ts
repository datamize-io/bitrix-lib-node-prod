import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class Item extends BitrixBuilder {
    protected prefixDefault: string | null;
    protected defaultParams: Record<string, any | null>;
    setEntityTypeId(entityTypeId: number): this;
    setId(id: string | number): this;
    collect<T = any>(params?: any, method?: string | null, collectField?: string): Promise<T>;
}
