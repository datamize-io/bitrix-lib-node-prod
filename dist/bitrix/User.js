import { BitrixBuilder } from "./BitrixBuilder.js";
export class User extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "user";
    }
}
