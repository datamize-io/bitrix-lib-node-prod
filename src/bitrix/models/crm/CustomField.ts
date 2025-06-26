import { BitrixBuilder } from "../../builders/BitrixBuilder.builder.js";

export class CustomField extends BitrixBuilder {
  protected prefixDefault: string | null = "crm.userfield.fields";

  protected static fieldTypes: string[] = [
    "string",
    "integer",
    "double",
    "boolean",
    "datetime",
    "enumeration",
    "iblock_section",
    "iblock_element",
    "employee",
    "crm_status",
    "crm",
  ];

  protected static crm_status_types: string[] = [
    "STATUS",
    "SOURCE",
    "CONTACT_TYPE",
    "COMPANY_TYPE",
    "EMPLOYEES",
    "INDUSTRY",
    "DEAL_TYPE",
    "SMART_INVOICE_STAGE_3",
    "DEAL_STAGE_91",
    "DEAL_STAGE",
    "QUOTE_STATUS",
    "HONORIFIC",
    "CALL_LIST",
    "SMART_DOCUMENT_STAGE_5",
  ];

  /*getByKey(key: string) {
    let response = this.collect({ FILTER: { XML_ID: key } }).map((d) => d.data)[0];

    return response ? this.patch(response, "data") : null;
  }*/

  //É a chave do campo
  setName(value: any): CustomField {
    this.data.FIELD_NAME = value
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[^a-zA-Z0-9_]/g, "")
      .slice(0, 50);
    return this;
  }

  //É o nome na hora de editar
  setLabel(value: any): CustomField {
    this.data.EDIT_FORM_LABEL = value;
    this.setListLabel(value);
    return this;
  }

  //É o nome ao visualizar
  setListLabel(value: any): CustomField {
    this.data.LIST_COLUMN_LABEL = value;
    this.data.LIST_FILTER_LABEL = value;
    return this;
  }

  //É o tipo de campo
  setType(value: any): CustomField {
    this.isValidType(value);
    this.data.USER_TYPE_ID = value;
    return this;
  }

  setTitle(value: any, field_key: any = null): CustomField {
    this.setLabel(value);
    this.setListLabel(value);

    if (field_key) {
      this.setName(field_key);
    }

    return this;
  }

  //É o id externo para consulta
  setXmlId(value: any): CustomField {
    this.data.XML_ID = value;
    this.data.FIELD_NAME = value.slice(0, 50);
    return this;
  }

  //Se é default ou não
  setDefault(value: any): CustomField {
    this.data.SETTINGS.DEFAULT_VALUE = value;
    return this;
  }

  //Acrescenta um campo de lista, com opções
  setOptions(valueArray: any[] = []) {
    this.setType("enumeration");
    let data = this.data.LIST || [];
    valueArray.forEach(function (value): void {
      data.push({ VALUE: value });
    });

    return this;
  }

  setSort(value: any): CustomField {
    this.data.SORT = value;
    return this;
  }

  setMultiple(value: any): CustomField {
    this.data.MULTIPLE = value ? "Y" : "N";
    return this;
  }

  setMandatory(value: any): CustomField {
    this.data.MANDATORY = value ? "Y" : "N";
    return this;
  }

  setShow(value: any): CustomField {
    this.data.SHOW_IN_LIST = value ? "Y" : "N";
    return this;
  }

  setSearchable(value: any): CustomField {
    this.data.IS_SEARCHABLE = value ? "Y" : "N";
    return this;
  }

  setErrorMessage(value: any): CustomField {
    this.data.ERROR_MESSAGE = value;
    return this;
  }

  setCRMType(value: string = "LEAD") {
    this.data.SETTINGS = this.data.SETTINGS || {};
    this.data.SETTINGS[value] = "Y";
    return this;
  }

  setHelpMessage(value: any): CustomField {
    this.data.HELP_MESSAGE = value;
    return this;
  }

  isValidType(type: string) {
    var fieldTypes = CustomField.fieldTypes;

    if (fieldTypes.indexOf(type) == -1) {
      throw Error("Tipo de campo inválido (" + type + "), os campos disponíveis são " + fieldTypes.join(","));
    }

    return true;
  }

  async getFields() {
    return await this.instance.request("crm.userfield.fields", {});
  }

  async getFieldSettings(type: string) {
    return await this.instance.request("crm.userfield.settings.fields", { type: type });
  }

  getFieldName() {
    return this.getData()?.FIELD_NAME || undefined;
  }

  async collect(params: any, method: string | null = null, collectField: string | null = "result"): Promise<any | this> {
    this.setFilterItem("LANG", "br");
    return await super.collect(params, method, collectField);
  }
}
