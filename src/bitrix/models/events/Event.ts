import { EventBuilder, EventBindBuilder } from "../../builders/events/EventBuilder.builder.js";
import { EventInterface } from "../../interfaces/events/EventInterface.interface.js";

export class Event extends EventBuilder implements EventInterface {
  //https://apidocs.bitrix24.com/api-reference/events/event-bind.html?tabs=defaultTabsGroup-31quidvl_js
  async bind(eventBindBuilder: EventBindBuilder) {
    return await this.requestAndPatch("event.bind", eventBindBuilder);
  }

  //https://apidocs.bitrix24.com/api-reference/events/test-handler.html
  async test(event: string) {
    return await this.requestAndPatch("event.test", {});
  }

  async unbind() {
    //event.unbind
  }

  async list() {
    return await this.requestAndPatch("events", {
      FULL: true,
    });
  }
}
