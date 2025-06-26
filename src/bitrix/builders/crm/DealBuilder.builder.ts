import { ItemBuilder } from "./ItemBuilder.builder.js";

export abstract class DealBuilder extends ItemBuilder {
  protected defaultParams: Record<string, any | null> = {
    entityTypeId: 2,
    useOriginalUfNames: "Y",
    select: ["*"],
  };

  /**
   * Define um contato principal para a negociação.
   *
   * @param value Objeto ou ID do contato
   * @returns A própria instância da negociação
   */
  setContact(value: any): DealBuilder {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("contactId", value);
    return this;
  }

  /**
   * Define múltiplos contatos para a negociação.
   *
   * @param value Lista de objetos ou IDs dos contatos
   * @returns A própria instância da negociação
   */
  setContacts(value: any[]): DealBuilder {
    if (!value) return this;
    value = value.map((v) => (typeof v === "object" ? v.data.ID : v));
    this.setField("contactIds", value);
    return this;
  }

  /**
   * Define o nome/título da negociação.
   *
   * @param value Nome ou título
   * @returns A própria instância da negociação
   */
  setName(value: any): DealBuilder {
    if (!value) return this;
    this.setField("title", value);
    return this;
  }

  /**
   * Define o pipeline (categoria) da negociação.
   *
   * @param value Objeto ou ID da categoria
   * @returns A própria instância da negociação
   */
  setPipeline(value: any): DealBuilder {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("categoryId", value);
    return this;
  }

  /**
   * Define a etapa do funil para a negociação.
   *
   * @param value Objeto ou ID da etapa
   * @returns A própria instância da negociação
   */
  setStage(value: any = null): DealBuilder {
    if (!value) return this;
    value = value.data ? value.data.STATUS_ID : value;
    this.setField("stageId", value);
    return this;
  }

  /**
   * Define o valor financeiro da negociação.
   *
   * @param value Valor monetário
   * @param currency Código da moeda (padrão: 'BRL')
   * @returns A própria instância da negociação
   */
  setValue(value: any, currency: string = "BRL"): DealBuilder {
    if (!value) return this;
    this.setCurrency(currency);
    this.setField("opportunity", value);
    return this;
  }

  /**
   * Define a moeda da negociação.
   *
   * @param value Código da moeda (padrão: 'BRL')
   * @returns A própria instância da negociação
   */
  setCurrency(value: string = "BRL"): DealBuilder {
    if (!value) return this;
    this.setField("currencyId", value);
    return this;
  }

  /**
   * Define o status de visibilidade da negociação.
   *
   * @param value `true` para visível, `false` para oculta
   * @returns A própria instância da negociação
   */
  setStatus(value: boolean = true): DealBuilder {
    if (value === undefined || value === null) return this;
    this.setField("opened", value ? "Y" : "N");
    return this;
  }

  /**
   * Define o identificador de origem da negociação.
   *
   * @param value ID da origem
   * @returns A própria instância da negociação
   */
  setOriginId(value: any): DealBuilder {
    if (!value) return this;
    this.setField("originId", value);
    return this;
  }

  /**
   * Define a origem da negociação com base em dados externos.
   *
   * @param value Objeto com ID da origem
   * @returns A própria instância da negociação
   */
  setSource(value: any): DealBuilder {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    const source = this.getData().source || {};
    source.id_ = value;
    this.setField("source", source);
    return this;
  }

  /**
   * Define parâmetros de rastreamento UTM para a negociação.
   *
   * @param utms Objeto com dados UTM
   * @returns A própria instância da negociação
   */
  setTrack(utms: any): DealBuilder {
    if (!utms) return this;
    const { utm_campaign, utm_source, utm_medium, utm_content, utm_term } = utms;
    this.setField("utmCampaign", utm_campaign);
    this.setField("utmSource", utm_source);
    this.setField("utmMedium", utm_medium);
    this.setField("utmContent", utm_content);
    this.setField("utmTerm", utm_term);
    return this;
  }

  /**
   * Define um campo da negociação com suporte a campos personalizados.
   *
   * @param field Nome do campo
   * @param value Valor a ser definido
   * @returns A própria instância da negociação
   */
  setField(field: string, value: any): this {
    if (value === undefined || value === null) return this;
    const fullField = field.startsWith("UF_CRM_") || !field.startsWith("UF_CRM") ? field : "UF_CRM_" + field;
    super.setField(fullField, value);
    return this;
  }

  /**
   * Define o responsável (usuário) pela negociação.
   *
   * @param value Objeto ou ID do usuário
   * @returns A própria instância da negociação
   */
  setUser(value: any): DealBuilder {
    if (!value) return this;
    value = value.data ? value.data.ID : value;
    this.setField("assignedById", value);
    return this;
  }
}
