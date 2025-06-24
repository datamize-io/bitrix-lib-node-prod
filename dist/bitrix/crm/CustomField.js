import { BitrixBuilder } from "../BitrixBuilder.js";
export class CustomField extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.prefixDefault = "crm.userfield.fields";
    }
    /*getByKey(key: string) {
      let response = this.collect({ FILTER: { XML_ID: key } }).map((d) => d.data)[0];
  
      return response ? this.patch(response, "data") : null;
    }*/
    //É a chave do campo
    setName(value) {
        this.data.FIELD_NAME = value
            .replaceAll(" ", "_")
            .normalize("NFD")
            .replace(/[^a-zA-Z0-9_]/g, "")
            .slice(0, 50);
        return this;
    }
    //É o nome na hora de editar
    setLabel(value) {
        this.data.EDIT_FORM_LABEL = value;
        this.setListLabel(value);
        return this;
    }
    //É o nome ao visualizar
    setListLabel(value) {
        this.data.LIST_COLUMN_LABEL = value;
        this.data.LIST_FILTER_LABEL = value;
        return this;
    }
    //É o tipo de campo
    setType(value) {
        this.isValidType(value);
        this.data.USER_TYPE_ID = value;
        return this;
    }
    setTitle(value, field_key = null) {
        this.setLabel(value);
        this.setListLabel(value);
        if (field_key) {
            this.setName(field_key);
        }
        return this;
    }
    //É o id externo para consulta
    setXmlId(value) {
        this.data.XML_ID = value;
        this.data.FIELD_NAME = value.slice(0, 50);
        return this;
    }
    //Se é default ou não
    setDefault(value) {
        this.data.SETTINGS.DEFAULT_VALUE = value;
        return this;
    }
    //Acrescenta um campo de lista, com opções
    setOptions(valueArray = []) {
        this.setType("enumeration");
        let data = this.data.LIST || [];
        valueArray.forEach(function (value) {
            data.push({ VALUE: value });
        });
        return this;
    }
    setSort(value) {
        this.data.SORT = value;
        return this;
    }
    setMultiple(value) {
        this.data.MULTIPLE = value ? "Y" : "N";
        return this;
    }
    setMandatory(value) {
        this.data.MANDATORY = value ? "Y" : "N";
        return this;
    }
    setShow(value) {
        this.data.SHOW_IN_LIST = value ? "Y" : "N";
        return this;
    }
    setSearchable(value) {
        this.data.IS_SEARCHABLE = value ? "Y" : "N";
        return this;
    }
    setErrorMessage(value) {
        this.data.ERROR_MESSAGE = value;
        return this;
    }
    setCRMType(value = "LEAD") {
        this.data.SETTINGS = this.data.SETTINGS || {};
        this.data.SETTINGS[value] = "Y";
        return this;
    }
    setHelpMessage(value) {
        this.data.HELP_MESSAGE = value;
        return this;
    }
    isValidType(type) {
        var fieldTypes = CustomField.fieldTypes;
        if (fieldTypes.indexOf(type) == -1) {
            throw Error("Tipo de campo inválido (" + type + "), os campos disponíveis são " + fieldTypes.join(","));
        }
        return true;
    }
    async getFields() {
        return await this.instance.request("crm.userfield.fields", {});
    }
    async getFieldSettings(type) {
        return await this.instance.request("crm.userfield.settings.fields", { type: type });
    }
    getFieldName() {
        return this.getData()?.FIELD_NAME || undefined;
    }
    async collect(params, method = null, collectField = "result") {
        this.setFilterItem("LANG", "br");
        return await super.collect(params, method, collectField);
    }
}
CustomField.fieldTypes = [
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
CustomField.crm_status_types = [
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
