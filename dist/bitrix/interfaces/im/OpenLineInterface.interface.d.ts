/**
 * Interface que define a estrutura esperada para configurar um novo canal aberto no Bitrix24,
 * compatível com o método `imopenlines.config.add`.
 */
export interface OpenChannelConfigInterface {
    /**
     * Objeto que contém todos os parâmetros de configuração do canal.
     */
    PARAMS: {
        /**
         * Ativa ou desativa o uso de bot como operador inicial.
         */
        WELCOME_BOT_ENABLE?: "Y" | "N";
        /**
         * Define quando o bot será conectado ("first" apenas no primeiro atendimento, "always" sempre).
         */
        WELCOME_BOT_JOIN?: "first" | "always";
        /**
         * ID do bot usado para o primeiro atendimento.
         */
        WELCOME_BOT_ID?: number;
        /**
         * Tempo (em segundos) para o bot transferir o atendimento para a fila.
         */
        WELCOME_BOT_TIME?: number;
        /**
         * Define a ação ao encerrar o atendimento com o bot ("queue" transfere, "close" encerra).
         */
        WELCOME_BOT_LEFT?: "queue" | "close";
        /**
         * Ativa ou desativa o canal de atendimento.
         */
        ACTIVE?: "Y" | "N";
        /**
         * Nome visível do canal aberto.
         */
        LINE_NAME?: string;
        /**
         * Ativa ou desativa a integração com o CRM.
         */
        CRM?: "Y" | "N";
        /**
         * Define a entidade que será criada automaticamente no CRM (por exemplo, "lead" ou "deal").
         */
        CRM_CREATE?: string;
        /**
         * Permite ou não o redirecionamento automático com base em regras do CRM.
         */
        CRM_FORWARD?: "Y" | "N";
        /**
         * Fonte do CRM vinculada ao canal (por exemplo, "openline" ou personalizada).
         */
        CRM_SOURCE?: string;
        /**
         * Define se a mudança de responsável no CRM altera o operador no chat.
         */
        CRM_TRANSFER_CHANGE?: "Y" | "N";
        /**
         * Tipo de distribuição de mensagens da fila:
         * - "evenly": distribuição equilibrada
         * - "strictly": ordem fixa
         * - "all": envia para todos
         */
        QUEUE_TYPE?: "evenly" | "strictly" | "all";
        /**
         * Tempo de resposta (em segundos) para o operador antes de ser considerado inativo.
         */
        QUEUE_TIME?: number;
        /**
         * Tempo de espera (em segundos) antes de transferir por ausência de resposta.
         */
        NO_ANSWER_TIME?: number;
        /**
         * Lista de operadores na fila de atendimento.
         */
        QUEUE?: {
            ENTITY_TYPE: "user";
            ENTITY_ID: string;
        }[];
        /**
         * Ativa ou desativa a mensagem automática de boas-vindas.
         */
        WELCOME_MESSAGE?: "Y" | "N";
        /**
         * Texto da mensagem automática de boas-vindas.
         */
        WELCOME_MESSAGE_TEXT?: string;
        /**
         * Ativa ou desativa o aviso de consentimento com a política de privacidade.
         */
        AGREEMENT_MESSAGE?: "Y" | "N";
        /**
         * ID do contrato ou política de privacidade previamente criado.
         */
        AGREEMENT_ID?: number;
        /**
         * Ativa ou desativa a limitação por horário de atendimento.
         */
        WORKTIME_ENABLE?: "Y" | "N";
        /**
         * Hora inicial do expediente (formato HH:MM).
         */
        WORKTIME_FROM?: string;
        /**
         * Hora final do expediente (formato HH:MM).
         */
        WORKTIME_TO?: string;
        /**
         * Fuso horário do canal.
         */
        WORKTIME_TIMEZONE?: string;
        /**
         * Datas de feriados (formato "DD.MM.YYYY", separados por vírgula).
         */
        WORKTIME_HOLIDAYS?: string;
        /**
         * Dias da semana considerados como folga (por exemplo: ["SA", "SU"]).
         */
        WORKTIME_DAYOFF?: string[];
        /**
         * Regra aplicada fora do expediente ("text", "none", etc).
         */
        WORKTIME_DAYOFF_RULE?: string;
        /**
         * Texto enviado automaticamente fora do horário de atendimento.
         */
        WORKTIME_DAYOFF_TEXT?: string;
        /**
         * Regra de encerramento manual do atendimento ("none", "text", etc).
         */
        CLOSE_RULE?: string;
        /**
         * Texto usado ao encerrar o chat manualmente.
         */
        CLOSE_TEXT?: string;
        /**
         * Tempo total máximo do atendimento (em segundos).
         */
        FULL_CLOSE_TIME?: number;
        /**
         * Regra para encerramento automático do atendimento ("none", "text", etc).
         */
        AUTO_CLOSE_RULE?: string;
        /**
         * Texto usado ao encerrar automaticamente.
         */
        AUTO_CLOSE_TEXT?: string;
        /**
         * Tempo para encerramento automático (em segundos).
         */
        AUTO_CLOSE_TIME?: number;
        /**
         * Define o idioma da interface do canal (ex: "br", "en", "ru").
         */
        LANGUAGE_ID?: string;
        /**
         * Define quais dados do operador serão exibidos: "profile", "queue", ou "hide".
         */
        OPERATOR_DATA?: "profile" | "queue" | "hide";
        /**
         * Dados padrão de operador (nome, avatar, etc).
         */
        DEFAULT_OPERATOR_DATA?: any;
        /**
         * Dados visuais específicos para os operadores da fila.
         */
        QUEUE_OPERATOR_DATA?: any;
        /**
         * Campos adicionais e mensagens personalizadas, como mensagens de avaliação ou eventos customizados.
         */
        [key: string]: any;
    };
}
/**
 * Interface base do canal aberto, usada como contrato de implementação de métodos.
 */
export interface OpenLineInterface {
}
