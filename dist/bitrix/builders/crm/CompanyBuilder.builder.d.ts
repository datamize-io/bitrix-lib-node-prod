import { CompanyInterface } from "../../interfaces/crm/CompanyInterface.interface.js";
import { ItemBuilder } from "./ItemBuilder.builder.js";
export declare abstract class CompanyBuilder extends ItemBuilder implements CompanyInterface {
    protected defaultParams: Record<string, any | null>;
}
