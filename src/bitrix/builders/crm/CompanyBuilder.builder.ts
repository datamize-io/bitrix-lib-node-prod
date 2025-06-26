import { CompanyInterface } from "../../interfaces/crm/CompanyInterface.interface.js";
import { ItemBuilder } from "./ItemBuilder.builder.js";

export abstract class CompanyBuilder extends ItemBuilder implements CompanyInterface {
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 4,
    useOriginalUfNames: "Y",
    select: ["*"],
  };
}
