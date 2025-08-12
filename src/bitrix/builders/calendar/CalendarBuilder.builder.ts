import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CalendarInterface } from "../../interfaces/calendar/CalendarInterface.interface.js";

export abstract class CalendarBuilder extends BitrixBuilder implements CalendarInterface {
  protected prefixDefault: string | null = "calendar";
}
