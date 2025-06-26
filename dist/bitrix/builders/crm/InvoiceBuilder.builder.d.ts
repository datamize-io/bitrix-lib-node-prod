import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { InvoiceInterface } from "../../interfaces/crm/InvoiceInterface.interface.js";
export declare abstract class InvoiceBuilder extends BitrixBuilder implements InvoiceInterface {
    protected defaultParams: Record<string, any | null>;
}
