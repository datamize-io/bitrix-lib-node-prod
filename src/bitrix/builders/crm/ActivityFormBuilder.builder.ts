import { ActivityBuilder } from "./ActivityBuilder.builder.js";

export abstract class ActivityFormBuilder extends ActivityBuilder {
  protected prefixDefault: string | null = "crm.activity";
}
