import { B24Hook, B24HookParams, Text, EnumCrmEntityTypeId, Result, type ISODate } from "@bitrix24/b24jssdk";

export class BitrixInstance {
  private client: B24Hook;

  constructor(secretObject: B24HookParams) {
    this.client = new B24Hook(secretObject);
  }

  async request(method: string, params: Record<string, any>, isBatch: boolean = false): Promise<Result> {
    if (isBatch) {
      return this.client.callBatch({ [method]: { method, params } });
    } else {
      return this.client.callMethod(method, params);
    }
  }
}
