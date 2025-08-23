import { OpenLineDialogBuilder } from "../../builders/im/OpenLineDialogBuilder.builder.js";
/**
 * Classe responsável por manipular sessões e diálogos do OpenLine no Bitrix24.
 * Estende o `OpenLineDialogBuilder` e implementa a interface `OpenLineDialogInterface`.
 *
 * Disponibiliza métodos para iniciar sessões, recuperar históricos, fixar atendimentos,
 * definir modo silencioso, atribuir avaliações e obter dados do diálogo a partir de diferentes parâmetros.
 *
 * Ele é o elo de relacionamento entre Sessões, Chats e Conectores.
 */
export class OpenLineDialog extends OpenLineDialogBuilder {
    /**
     * Recupera o histórico de mensagens de uma sessão.
     *
     * @param chatId ID do chat.
     * @param sessionId ID da sessão (SESSION_ID). Use sempre o SESSION_ID para evitar erro.
     *
     * @returns Histórico da sessão.
     */
    async getHistory(chatId, sessionId) {
        return await this.requestAndPatch("imopenlines.session.history.get", {
            CHAT_ID: chatId,
            SESSION_ID: sessionId,
        });
    }
    /**
     * Inicia uma nova sessão no chat.
     *
     * @param chatId ID do chat.
     * @returns Detalhes da sessão iniciada.
     */
    async start(chatId) {
        return await this.requestAndPatch("imopenlines.session.start", {
            CHAT_ID: chatId,
        });
    }
    /**
     * Inicia uma nova sessão a partir de uma mensagem específica.
     *
     * @param chatId ID do chat.
     * @param messageId ID da mensagem.
     * @returns `true` se iniciado com sucesso.
     */
    async startByMessage(chatId, messageId) {
        return await this.requestData("imopenlines.message.session.start", {
            CHAT_ID: chatId,
            MESSAGE_ID: messageId,
        });
    }
    /**
     * Inicia uma sessão a partir de um código de usuário.
     *
     * @param userCode Instância de `UserCodeBuilder`.
     * @returns Detalhes da sessão.
     */
    async startByUserCode(userCode) {
        const stringUserCode = typeof userCode == "string" ? userCode : userCode.build();
        return await this.requestAndPatch("imopenlines.session.open", {
            USER_CODE: stringUserCode,
        });
    }
    /**
     * Entra em uma sessão ativa de atendimento.
     *
     * @param chatId ID do chat.
     * @returns Resultado da operação.
     */
    async join(chatId) {
        return await this.requestAndPatch("imopenlines.session.join", {
            CHAT_ID: chatId,
        });
    }
    /**
     * Intercepta uma sessão de atendimento, assumindo-a.
     *
     * @param chatId ID do chat.
     * @returns Resultado da operação.
     */
    async intercept(chatId) {
        return await this.requestAndPatch("imopenlines.session.intercept", {
            CHAT_ID: chatId,
        });
    }
    /**
     * Fixa ou desafixa uma sessão de atendimento.
     *
     * @param chatId ID do chat.
     * @param enablePin "Y" para fixar, "N" para desafixar.
     * @returns Resultado da operação.
     */
    async pin(chatId, enablePin) {
        return await this.requestAndPatch("imopenlines.session.intercept", {
            CHAT_ID: chatId,
            ACTIVATE: enablePin,
        });
    }
    /**
     * Fixa todas as sessões ativas.
     *
     * @returns Resultado da operação.
     */
    async pinAll() {
        return await this.requestData("imopenlines.session.mode.pinAll");
    }
    /**
     * Desfixa todas as sessões.
     *
     * @returns Resultado da operação.
     */
    async unpinAll() {
        return await this.requestData("imopenlines.session.mode.unpinAll");
    }
    /**
     * Ativa ou desativa o modo silencioso para um atendimento.
     *
     * @param chatId ID do chat.
     * @param enablePin "Y" para ativar, "N" para desativar.
     * @returns Resultado da operação.
     */
    async silent(chatId, enablePin) {
        return await this.requestAndPatch("imopenlines.session.mode.silent", {
            CHAT_ID: chatId,
            ACTIVATE: enablePin,
        });
    }
    /**
     * Avalia uma sessão de atendimento.
     *
     * @param sessionId ID da sessão.
     * @param ratingNumber Nota da avaliação (1 a 5).
     * @param comment Comentário opcional.
     * @returns `true` se enviado com sucesso.
     */
    async rating(sessionId, ratingNumber, comment) {
        return await this.requestData("imopenlines.session.mode.silent", {
            SESSION_ID: sessionId,
            RATING: ratingNumber,
            COMMENT: comment,
        });
    }
    /**
     * Cria um lead a partir de um chat.
     *
     * @param chatId ID do chat.
     * @returns `true` se criado com sucesso.
     */
    async createLeadFromDialog(chatId) {
        return await this.requestData("imopenlines.crm.lead.create", {
            CHAT_ID: chatId,
        });
    }
    /**
     * Recupera informações do diálogo a partir do ID do chat.
     *
     * @param id ID do chat.
     * @returns Dados do diálogo.
     */
    async getByChatId(id) {
        return await this.requestAndPatch("imopenlines.dialog.get", {
            CHAT_ID: id,
        });
    }
    /**
     * Recupera informações do diálogo a partir do ID do diálogo.
     *
     * @param id ID do diálogo.
     * @returns Dados do diálogo.
     */
    async getByDialogId(id) {
        return await this.requestAndPatch("imopenlines.dialog.get", {
            DIALOG_ID: id,
        });
    }
    /**
     * Recupera informações do diálogo a partir do ID da sessão.
     *
     * @param id ID da sessão.
     * @returns Dados do diálogo.
     */
    async getBySessionId(id) {
        return await this.requestAndPatch("imopenlines.dialog.get", {
            SESSION_ID: id,
        });
    }
    /**
     * Recupera informações do diálogo a partir do código de usuário.
     *
     * @param userCode Instância de `UserCodeBuilder`.
     * @returns Dados do diálogo.
     */
    async getByUserCode(userCode) {
        const stringUserCode = typeof userCode == "string" ? userCode : userCode.build();
        return await this.requestAndPatch("imopenlines.dialog.get", {
            USER_CODE: stringUserCode,
        });
    }
}
