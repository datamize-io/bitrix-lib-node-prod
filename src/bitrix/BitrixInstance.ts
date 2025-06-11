import { B24Hook, B24HookParams, Text, EnumCrmEntityTypeId, Result, type ISODate } from "@bitrix24/b24jssdk";

export class BitrixInstance {
  private client: B24Hook;
  private paramsToInject: Record<string, any> = {};

  constructor(secretObject: B24HookParams) {
    console.log(secretObject);
    this.client = new B24Hook(secretObject);
  }

  entity(Entity: any): any {
    return new Entity(this);
  }

  setDefaultParams(paramsToInject: any): this {
    this.paramsToInject = paramsToInject || {};
    return this;
  }

  getDefaultParams(params: Record<string, any>): Record<string, any> {
    Object.keys(this.paramsToInject).forEach((param: string) => {
      const value = this.paramsToInject[param];

      if (params[param]) {
        if (Array.isArray(params[param]) && Array.isArray(value)) {
          params[param] = params[param].concat(value);
        } else if (typeof params[param] === "object" && typeof value === "object") {
          params[param] = Object.assign(params[param], value);
        }
      } else {
        params[param] = value;
      }
    });

    return params;
  }

  async request(method: string, params: Record<string, any>, isBatch: boolean = false): Promise<Result> {
    params = this.getDefaultParams(params);
    console.log("Requesting:", method, params);
    if (isBatch) {
      return this.client.callBatch({ [method]: { method, params } });
    } else {
      return this.client.callMethod(method, params);
    }
  }
}
