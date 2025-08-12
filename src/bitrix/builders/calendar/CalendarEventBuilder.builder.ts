import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { CalendarEventInterface } from "../../interfaces/calendar/CalendarEventInterface.interface.js";

export abstract class CalendarEventBuilder extends BitrixBuilder implements CalendarEventInterface {
  protected prefixDefault: string | null = "calendar.event";

  setType(type: "user" | "group" | "company"): this {
    this.data.type = type;
    return this;
  }

  getById(id: string | number): Promise<any> {
    const request = this.instance.request(`${this.prefixDefault}.getById`, {
      id,
    });
    return request;
  }
}
