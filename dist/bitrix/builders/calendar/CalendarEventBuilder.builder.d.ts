import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CalendarEventInterface } from "../../interfaces/calendar/CalendarEventInterface.interface.js";
export declare abstract class CalendarEventBuilder extends BitrixBuilder implements CalendarEventInterface {
    protected prefixDefault: string | null;
    setType(type: "user" | "group" | "company"): this;
    getById(id: string | number): Promise<any>;
}
