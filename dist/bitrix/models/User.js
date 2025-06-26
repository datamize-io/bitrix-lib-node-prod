import { BitrixBuilder } from "../builders/BitrixBuilder.builder.js";
export class User extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "user";
    }
}
