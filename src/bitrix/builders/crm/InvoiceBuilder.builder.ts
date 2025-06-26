import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { InvoiceInterface } from "../../interfaces/crm/InvoiceInterface.interface.js";

export abstract class InvoiceBuilder extends BitrixBuilder implements InvoiceInterface {
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 31,
    useOriginalUfNames: "Y",
    select: ["*"],
  };
}
