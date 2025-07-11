import { BitrixBuilder } from "../BitrixBuilder.builder.js";
// src/builders/EventBindBuilder.ts
/**
 * Builder para facilitar a criação do payload do método `event.bind` da API do Bitrix24.
 * Suporta eventos do tipo online e offline.
 */
export class EventBindBuilder {
    constructor() {
        this.payload = {};
    }
    /**
     * Define o nome do evento que será vinculado.
     * @param event Nome do evento (ex: 'OnCrmDealUpdate')
     */
    setEvent(event) {
        this.payload.event = event;
        return this;
    }
    /**
     * Define a URL que receberá os eventos (somente para eventos online).
     * @param handler URL pública que o Bitrix irá chamar
     */
    setHandler(handler) {
        this.payload.handler = handler;
        return this;
    }
    /**
     * Define o tipo de evento: online ou offline.
     * Por padrão é 'online'.
     * @param eventType 'online' ou 'offline'
     */
    setEventType(eventType) {
        this.payload.event_type = eventType;
        return this;
    }
    /**
     * Define o ID do usuário que autoriza o evento.
     * @param userId ID do usuário (inteiro)
     */
    setAuthType(userId) {
        this.payload.auth_type = userId;
        return this;
    }
    /**
     * Define o auth_connector, usado em eventos offline.
     * Isso evita loops ou notificações desnecessárias.
     * @param connector Chave de origem, como 'erp-sync'
     */
    setAuthConnector(connector) {
        this.payload.auth_connector = connector;
        return this;
    }
    /**
     * Define parâmetros adicionais (se o evento suportar).
     * @param options Objeto com configurações extras
     */
    setOptions(options) {
        this.payload.options = options;
        return this;
    }
    /**
     * Retorna o payload final para ser usado em `bitrix.callMethod('event.bind', payload)`
     */
    build() {
        return this.payload;
    }
}
export class EventBuilder extends BitrixBuilder {
    constructor() {
        super(...arguments);
        this.AVAIBLE_EVENTS = [
            "ONAPPUNINSTALL",
            "ONAPPINSTALL",
            "ONAPPUPDATE",
            "ONAPPPAYMENT",
            "ONAPPTEST",
            "ONAPPMETHODCONFIRM",
            "ONOFFLINEEVENT",
            "ONUSERADD",
            "ONCRMINVOICEADD",
            "ONCRMINVOICEUPDATE",
            "ONCRMINVOICEDELETE",
            "ONCRMINVOICESETSTATUS",
            "ONCRMLEADADD",
            "ONCRMLEADUPDATE",
            "ONCRMLEADDELETE",
            "ONCRMLEADUSERFIELDADD",
            "ONCRMLEADUSERFIELDUPDATE",
            "ONCRMLEADUSERFIELDDELETE",
            "ONCRMLEADUSERFIELDSETENUMVALUES",
            "ONCRMDEALADD",
            "ONCRMDEALUPDATE",
            "ONCRMDEALDELETE",
            "ONCRMDEALMOVETOCATEGORY",
            "ONCRMDEALUSERFIELDADD",
            "ONCRMDEALUSERFIELDUPDATE",
            "ONCRMDEALUSERFIELDDELETE",
            "ONCRMDEALUSERFIELDSETENUMVALUES",
            "ONCRMCOMPANYADD",
            "ONCRMCOMPANYUPDATE",
            "ONCRMCOMPANYDELETE",
            "ONCRMCOMPANYUSERFIELDADD",
            "ONCRMCOMPANYUSERFIELDUPDATE",
            "ONCRMCOMPANYUSERFIELDDELETE",
            "ONCRMCOMPANYUSERFIELDSETENUMVALUES",
            "ONCRMCONTACTADD",
            "ONCRMCONTACTUPDATE",
            "ONCRMCONTACTDELETE",
            "ONCRMCONTACTUSERFIELDADD",
            "ONCRMCONTACTUSERFIELDUPDATE",
            "ONCRMCONTACTUSERFIELDDELETE",
            "ONCRMCONTACTUSERFIELDSETENUMVALUES",
            "ONCRMQUOTEADD",
            "ONCRMQUOTEUPDATE",
            "ONCRMQUOTEDELETE",
            "ONCRMQUOTEUSERFIELDADD",
            "ONCRMQUOTEUSERFIELDUPDATE",
            "ONCRMQUOTEUSERFIELDDELETE",
            "ONCRMQUOTEUSERFIELDSETENUMVALUES",
            "ONCRMINVOICEUSERFIELDADD",
            "ONCRMINVOICEUSERFIELDUPDATE",
            "ONCRMINVOICEUSERFIELDDELETE",
            "ONCRMINVOICEUSERFIELDSETENUMVALUES",
            "ONCRMCURRENCYADD",
            "ONCRMCURRENCYUPDATE",
            "ONCRMCURRENCYDELETE",
            "ONCRMPRODUCTADD",
            "ONCRMPRODUCTUPDATE",
            "ONCRMPRODUCTDELETE",
            "ONCRMPRODUCTPROPERTYADD",
            "ONCRMPRODUCTPROPERTYUPDATE",
            "ONCRMPRODUCTPROPERTYDELETE",
            "ONCRMPRODUCTSECTIONADD",
            "ONCRMPRODUCTSECTIONUPDATE",
            "ONCRMPRODUCTSECTIONDELETE",
            "ONCRMACTIVITYADD",
            "ONCRMACTIVITYUPDATE",
            "ONCRMACTIVITYDELETE",
            "ONCRMREQUISITEADD",
            "ONCRMREQUISITEUPDATE",
            "ONCRMREQUISITEDELETE",
            "ONCRMREQUISITEUSERFIELDADD",
            "ONCRMREQUISITEUSERFIELDUPDATE",
            "ONCRMREQUISITEUSERFIELDDELETE",
            "ONCRMREQUISITEUSERFIELDSETENUMVALUES",
            "ONCRMBANKDETAILADD",
            "ONCRMBANKDETAILUPDATE",
            "ONCRMBANKDETAILDELETE",
            "ONCRMADDRESSREGISTER",
            "ONCRMADDRESSUNREGISTER",
            "ONCRMMEASUREADD",
            "ONCRMMEASUREUPDATE",
            "ONCRMMEASUREDELETE",
            "ONCRMDEALRECURRINGADD",
            "ONCRMDEALRECURRINGUPDATE",
            "ONCRMDEALRECURRINGDELETE",
            "ONCRMDEALRECURRINGEXPOSE",
            "ONCRMINVOICERECURRINGADD",
            "ONCRMINVOICERECURRINGUPDATE",
            "ONCRMINVOICERECURRINGDELETE",
            "ONCRMINVOICERECURRINGEXPOSE",
            "ONCRMTIMELINECOMMENTADD",
            "ONCRMTIMELINECOMMENTUPDATE",
            "ONCRMTIMELINECOMMENTDELETE",
            "ONCRMDYNAMICITEMADD",
            "ONCRMDYNAMICITEMUPDATE",
            "ONCRMDYNAMICITEMDELETE",
            "ONCRMDYNAMICITEMADD_147",
            "ONCRMDYNAMICITEMUPDATE_147",
            "ONCRMDYNAMICITEMDELETE_147",
            "ONCRMTYPEADD",
            "ONCRMTYPEUPDATE",
            "ONCRMTYPEDELETE",
            "ONCRMDOCUMENTGENERATORDOCUMENTADD",
            "ONCRMDOCUMENTGENERATORDOCUMENTUPDATE",
            "ONCRMDOCUMENTGENERATORDOCUMENTDELETE",
            "ONTASKADD",
            "ONTASKUPDATE",
            "ONTASKDELETE",
            "ONTASKCOMMENTADD",
            "ONTASKCOMMENTUPDATE",
            "ONTASKCOMMENTDELETE",
        ];
    }
    get BindBuilder() {
        return new EventBindBuilder();
    }
}
