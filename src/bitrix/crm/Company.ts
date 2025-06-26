import { CompanyBuilder } from "../builders/crm/CompanyBuilder.builder.js";

export class Company extends CompanyBuilder {
  protected prefixDefault: string | null = "crm.company";
}
