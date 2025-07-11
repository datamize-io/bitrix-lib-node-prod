import { EventBuilder, EventBindBuilder } from "../../builders/events/EventBuilder.builder.js";
import { EventInterface } from "../../interfaces/events/EventInterface.interface.js";
export declare class Event extends EventBuilder implements EventInterface {
    bind(eventBindBuilder: EventBindBuilder): Promise<any>;
    test(event: string): Promise<any>;
    unbind(): Promise<void>;
    list(): Promise<any>;
}
