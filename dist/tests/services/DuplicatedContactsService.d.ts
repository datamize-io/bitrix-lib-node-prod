import { BitrixInstance } from "../../bitrix/index.js";
export declare class DuplicatedContactsService {
    private bitrixInstance;
    constructor(bitrixInstance: BitrixInstance);
    /**
     * Método para mesclar contatos duplicados.
     * @param contactDuplications - Array de IDs de contatos duplicados.
     * @returns {Promise<void>} - Retorna uma Promise que resolve quando a mesclagem for concluída.
     **/
    doMergeDuplications(contactDuplications: Array<string | number>): Promise<void>;
    doCheckDuplications(contactId: string | number): Promise<any>;
    doTransferAllCommentsToContact(olderContactId: string | number, otherContactsIds: Array<string | number>): Promise<void>;
    doTransferAllActivityToContact(olderContactId: string | number, otherContactsIds: Array<string | number>): Promise<void>;
    doTransferAllCRMEntitiesToContact(olderContactId: string | number, otherContactsIds: Array<string | number>): Promise<void>;
    doTransferAllFieldsToContact(olderContactId: any, otherContactsIds: any): Promise<void>;
    getAllVariationsOfSamePhones(phones: Array<string>): Array<string>;
}
