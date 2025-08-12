import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CalendarInterface } from "../../interfaces/calendar/CalendarInterface.interface.js";
export declare abstract class CalendarBuilder extends BitrixBuilder implements CalendarInterface {
    protected prefixDefault: string | null;
}
