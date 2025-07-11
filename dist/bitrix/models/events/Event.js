import { EventBuilder } from "../../builders/events/EventBuilder.builder.js";
export class Event extends EventBuilder {
    //https://apidocs.bitrix24.com/api-reference/events/event-bind.html?tabs=defaultTabsGroup-31quidvl_js
    async bind(eventBindBuilder) {
        return await this.requestAndPatch("event.bind", eventBindBuilder);
    }
    //https://apidocs.bitrix24.com/api-reference/events/test-handler.html
    async test(event) {
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
