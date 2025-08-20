import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CrmTypeInterface } from "../../interfaces/crm/CrmTypeInterface.interface.js";
export declare abstract class CrmTypeBuilder extends BitrixBuilder implements CrmTypeInterface {
    protected prefixDefault: string | null;
    collect<T = any>(params?: any, method?: string | null, collectField?: string): Promise<T>;
}
