import "dotenv/config";
import { B24Hook, } from "@bitrix24/b24jssdk";
export class BitrixInstance {
    constructor(secretObject) {
        this.client = new B24Hook(secretObject);
    }
}
