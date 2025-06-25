import { B24Hook } from "@bitrix24/b24jssdk";
export class BitrixInstance {
    constructor(secretObject) {
        this.paramsToInject = {};
        console.log(secretObject);
        const clientId = this.client = secretObject instanceof B24Hook ? secretObject : new B24Hook(secretObject);
    }
    entity(Entity) {
        return new Entity(this);
    }
    getClientToken() {
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        return this;
    }
    setDefaultParams(paramsToInject) {
        this.paramsToInject = paramsToInject || {};
        return this;
    }
    getDefaultParams(params) {
        Object.keys(this.paramsToInject).forEach((param) => {
            const value = this.paramsToInject[param];
            if (params[param]) {
                if (Array.isArray(params[param]) && Array.isArray(value)) {
                    params[param] = params[param].concat(value);
                }
                else if (typeof params[param] === "object" && typeof value === "object") {
                    params[param] = Object.assign(params[param], value);
                }
            }
            else {
                params[param] = value;
            }
        });
        return params;
    }
    async request(method, params, isBatch = false) {
        params = this.getDefaultParams(params);
        if (this.accessToken && !params.auth) {
            params.auth = this.accessToken;
        }
        console.log("Requesting:", method, params);
        if (isBatch) {
            return this.client.callBatch({ [method]: { method, params } });
        }
        else {
            return this.client.callMethod(method, params);
        }
    }
}
