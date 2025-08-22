import { BitrixBuilder } from "../BitrixBuilder.builder.js";
export class ImBotBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "imbot";
    }
}
