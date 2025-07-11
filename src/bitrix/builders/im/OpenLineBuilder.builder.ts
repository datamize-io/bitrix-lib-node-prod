import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { OpenLineInterface, OpenChannelConfigInterface } from "../../interfaces/im/OpenLineInterface.interface.js";

/**
 * Builder para criar a estrutura de parâmetros usados em `imopenlines.config.add`
 * que adiciona um novo canal aberto no Bitrix24.
 */
export class OpenChannelConfigBuilder {
  private params: Record<string, any> = {};

  /**
   * Define as configurações do chatbot de boas-vindas.
   */
  setWelcomeBot(enable: "Y" | "N", botId?: number, join: "first" | "always" = "first", time: number = 60, left: "queue" | "close" = "queue") {
    this.params.WELCOME_BOT_ENABLE = enable;
    this.params.WELCOME_BOT_JOIN = join;
    this.params.WELCOME_BOT_ID = botId || 0;
    this.params.WELCOME_BOT_TIME = time;
    this.params.WELCOME_BOT_LEFT = left;
    return this;
  }

  /**
   * Define se a linha de atendimento estará ativa.
   */
  setActive(value: "Y" | "N") {
    this.params.ACTIVE = value;
    return this;
  }

  /**
   * Define o nome da linha de atendimento.
   */
  setLineName(name: string) {
    this.params.LINE_NAME = name;
    return this;
  }

  /**
   * Configurações relacionadas ao CRM.
   */
  setCRM(enable: "Y" | "N", create?: string, forward?: "Y" | "N", source?: string, transferChange?: "Y" | "N") {
    this.params.CRM = enable;
    if (create) this.params.CRM_CREATE = create;
    if (forward) this.params.CRM_FORWARD = forward;
    if (source) this.params.CRM_SOURCE = source;
    if (transferChange) this.params.CRM_TRANSFER_CHANGE = transferChange;
    return this;
  }

  /**
   * Define configurações da fila de operadores (QUEUE).
   */
  setQueue(type?: "evenly" | "strictly" | "all", time?: number, noAnswerTime?: number, users?: { ENTITY_TYPE: "user"; ENTITY_ID: string }[]) {
    if (type) this.params.QUEUE_TYPE = type;
    if (time) this.params.QUEUE_TIME = time;
    if (noAnswerTime) this.params.NO_ANSWER_TIME = noAnswerTime;
    if (users) this.params.QUEUE = users;
    return this;
  }

  /**
   * Define se uma mensagem automática de boas-vindas será enviada e seu texto.
   */
  setWelcomeMessage(enabled: "Y" | "N", text?: string) {
    this.params.WELCOME_MESSAGE = enabled;
    if (text) this.params.WELCOME_MESSAGE_TEXT = text;
    return this;
  }

  /**
   * Define o envio da mensagem de consentimento de dados e o ID do contrato.
   */
  setAgreement(enabled: "Y" | "N", agreementId?: number) {
    this.params.AGREEMENT_MESSAGE = enabled;
    if (agreementId !== undefined) this.params.AGREEMENT_ID = agreementId;
    return this;
  }

  /**
   * Define o horário de atendimento e regras para feriados e fins de semana.
   */
  setWorktime(
    enable?: "Y" | "N",
    from?: string,
    to?: string,
    timezone?: string,
    holidays?: string,
    dayoff?: string[],
    dayoffRule?: string,
    dayoffText?: string
  ) {
    if (enable) this.params.WORKTIME_ENABLE = enable;
    if (from) this.params.WORKTIME_FROM = from;
    if (to) this.params.WORKTIME_TO = to;
    if (timezone) this.params.WORKTIME_TIMEZONE = timezone;
    if (holidays) this.params.WORKTIME_HOLIDAYS = holidays;
    if (dayoff) this.params.WORKTIME_DAYOFF = dayoff;
    if (dayoffRule) this.params.WORKTIME_DAYOFF_RULE = dayoffRule;
    if (dayoffText) this.params.WORKTIME_DAYOFF_TEXT = dayoffText;
    return this;
  }

  /**
   * Regras de fechamento de atendimento: manual, automático, tempos e mensagens.
   */
  setCloseRules(closeRule?: string, closeText?: string, fullCloseTime?: number, autoCloseRule?: string, autoCloseText?: string, autoCloseTime?: number) {
    if (closeRule) this.params.CLOSE_RULE = closeRule;
    if (closeText) this.params.CLOSE_TEXT = closeText;
    if (fullCloseTime !== undefined) this.params.FULL_CLOSE_TIME = fullCloseTime;
    if (autoCloseRule) this.params.AUTO_CLOSE_RULE = autoCloseRule;
    if (autoCloseText) this.params.AUTO_CLOSE_TEXT = autoCloseText;
    if (autoCloseTime !== undefined) this.params.AUTO_CLOSE_TIME = autoCloseTime;
    return this;
  }

  /**
   * Define mensagens de votação de qualidade do atendimento.
   */
  setVoteMessages(config: Record<string, string | "Y" | "N">) {
    Object.assign(this.params, config);
    return this;
  }

  /**
   * Define o idioma do canal.
   */
  setLanguage(lang: string) {
    this.params.LANGUAGE_ID = lang;
    return this;
  }

  /**
   * Define os dados visíveis dos operadores no chat (nome, avatar, etc).
   */
  setOperatorData(type: "profile" | "queue" | "hide", defaultData?: any, operatorData?: any) {
    this.params.OPERATOR_DATA = type;
    if (defaultData) this.params.DEFAULT_OPERATOR_DATA = defaultData;
    if (operatorData) this.params.QUEUE_OPERATOR_DATA = operatorData;
    return this;
  }

  /**
   * Finaliza a construção e retorna o objeto final para enviar ao Bitrix.
   */
  build(): OpenChannelConfigInterface {
    return { PARAMS: this.params };
  }
}

/**
 * Classe base para acesso ao builder de configuração do canal aberto.
 */
export abstract class OpenLineBuilder extends BitrixBuilder implements OpenLineInterface {
  get ConfigBuilder(): OpenChannelConfigBuilder {
    return new OpenChannelConfigBuilder();
  }
}
