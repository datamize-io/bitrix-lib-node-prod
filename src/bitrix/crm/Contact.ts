import { BitrixBuilder } from "../BitrixBuilder.js";

export class Contact extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.contact";

  setEmail(value: any, type: string = "WORK") {
    if (!this.data.EMAIL) {
      this.data.EMAIL = [];
    }
    this.data.EMAIL.push({ VALUE: value, VALUE_TYPE: type ? type.toUpperCase() : "WORK" });
    return this;
  }

  setPhone(value: any, type: string = "WORK") {
    if (!this.data.PHONE) {
      this.data.PHONE = [];
    }
    this.data.PHONE.push({ VALUE: value, VALUE_TYPE: type ? type.toUpperCase() : "WORK" });
    return this;
  }

  setName(value: any) {
    this.data.NAME = value;
    return this;
  }

  setLastName(value: any) {
    this.data.LAST_NAME = value;
    return this;
  }

  setUser(value: any) {
    value = typeof value == "object" ? value.data.ID : value;

    this.data.ASSIGNED_BY_ID = value;
    return this;
  }
}
