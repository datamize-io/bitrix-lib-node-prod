import { BitrixBuilder } from "../BitrixBuilder.builder.js";
import { OpenLineInterface, OpenChannelConfigInterface } from "../../interfaces/im/OpenLineInterface.interface.js";
/**
 * Builder para criar a estrutura de parâmetros usados em `imopenlines.config.add`
 * que adiciona um novo canal aberto no Bitrix24.
 */
export declare class OpenChannelConfigBuilder {
    private params;
    /**
     * Define as configurações do chatbot de boas-vindas.
     */
    setWelcomeBot(enable: "Y" | "N", botId?: number, join?: "first" | "always", time?: number, left?: "queue" | "close"): this;
    /**
     * Define se a linha de atendimento estará ativa.
     */
    setActive(value: "Y" | "N"): this;
    /**
     * Define o nome da linha de atendimento.
     */
    setLineName(name: string): this;
    /**
     * Configurações relacionadas ao CRM.
     */
    setCRM(enable: "Y" | "N", create?: string, forward?: "Y" | "N", source?: string, transferChange?: "Y" | "N"): this;
    /**
     * Define configurações da fila de operadores (QUEUE).
     */
    setQueue(type?: "evenly" | "strictly" | "all", time?: number, noAnswerTime?: number, users?: {
        ENTITY_TYPE: "user";
        ENTITY_ID: string;
    }[]): this;
    /**
     * Define se uma mensagem automática de boas-vindas será enviada e seu texto.
     */
    setWelcomeMessage(enabled: "Y" | "N", text?: string): this;
    /**
     * Define o envio da mensagem de consentimento de dados e o ID do contrato.
     */
    setAgreement(enabled: "Y" | "N", agreementId?: number): this;
    /**
     * Define o horário de atendimento e regras para feriados e fins de semana.
     */
    setWorktime(enable?: "Y" | "N", from?: string, to?: string, timezone?: string, holidays?: string, dayoff?: string[], dayoffRule?: string, dayoffText?: string): this;
    /**
     * Regras de fechamento de atendimento: manual, automático, tempos e mensagens.
     */
    setCloseRules(closeRule?: string, closeText?: string, fullCloseTime?: number, autoCloseRule?: string, autoCloseText?: string, autoCloseTime?: number): this;
    /**
     * Define mensagens de votação de qualidade do atendimento.
     */
    setVoteMessages(config: Record<string, string | "Y" | "N">): this;
    /**
     * Define o idioma do canal.
     */
    setLanguage(lang: string): this;
    /**
     * Define os dados visíveis dos operadores no chat (nome, avatar, etc).
     */
    setOperatorData(type: "profile" | "queue" | "hide", defaultData?: any, operatorData?: any): this;
    /**
     * Finaliza a construção e retorna o objeto final para enviar ao Bitrix.
     */
    build(): OpenChannelConfigInterface;
}
/**
 * Classe base para acesso ao builder de configuração do canal aberto.
 */
export declare abstract class OpenLineBuilder extends BitrixBuilder implements OpenLineInterface {
    get ConfigBuilder(): OpenChannelConfigBuilder;
}
