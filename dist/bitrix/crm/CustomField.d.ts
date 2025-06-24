import { BitrixBuilder } from "../BitrixBuilder.js";
export declare class CustomField extends BitrixBuilder {
    protected prefixDefault: string | null;
    protected static fieldTypes: string[];
    protected static crm_status_types: string[];
    setName(value: any): CustomField;
    setLabel(value: any): CustomField;
    setListLabel(value: any): CustomField;
    setType(value: any): CustomField;
    setTitle(value: any, field_key?: any): CustomField;
    setXmlId(value: any): CustomField;
    setDefault(value: any): CustomField;
    setOptions(valueArray?: any[]): this;
    setSort(value: any): CustomField;
    setMultiple(value: any): CustomField;
    setMandatory(value: any): CustomField;
    setShow(value: any): CustomField;
    setSearchable(value: any): CustomField;
    setErrorMessage(value: any): CustomField;
    setCRMType(value?: string): this;
    setHelpMessage(value: any): CustomField;
    isValidType(type: string): boolean;
    getFields(): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
    getFieldSettings(type: string): Promise<import("@bitrix24/b24jssdk/.").Result<any>>;
    getFieldName(): any;
    collect(params: any, method?: string | null, collectField?: string | null): Promise<any | this>;
}
