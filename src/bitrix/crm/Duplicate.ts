import { BitrixBuilder } from "../BitrixBuilder.js";
type MergeStatus = "SUCCESS" | "CONFLICT" | "ERROR";

export class Duplicate extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.duplicate";

  setContacts(contacts: Array<string | number>) {
    this.setDataItem("params", {
      entityTypeId: 3,
      entityIds: contacts,
    });
    return this;
  }

  static async findDuplicatedContacts(contacts: Array<string | number>, type: string = "PHONE") {
    if (!contacts || contacts.length === 0) return;

    const filter = {
      entity_type: "CONTACT",
      type: type,
      values: contacts,
    };

    const duplicate = new Duplicate(this.instance);
    const request = await duplicate.requestAndPatch("crm.duplicate.findbycomm", filter);

    console.log(request);

    return request.getData()?.CONTACT || [];
  }

  static async doMerge(data: any) {
    const duplicate = new Duplicate(this.instance).setContacts(data);
    return await duplicate.requestAndPatch("crm.entity.mergeBatch", duplicate.getData());
  }

  isMergeStatus(mergeStatus: MergeStatus): boolean {
    return this.getData()?.STATUS === mergeStatus;
  }

  getMergeEntities(): Array<string | number> {
    return this.getData()?.ENTITY_IDS || [];
  }
}
