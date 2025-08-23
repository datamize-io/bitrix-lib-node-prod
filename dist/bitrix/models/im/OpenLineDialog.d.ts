import { OpenLineDialogBuilder, UserCodeBuilder } from "../../builders/im/OpenLineDialogBuilder.builder.js";
import { OpenLineDialogInterface } from "../../interfaces/im/OpenLineDialogInterface.interface.js";
/**
 * Classe responsável por manipular sessões e diálogos do OpenLine no Bitrix24.
 * Estende o `OpenLineDialogBuilder` e implementa a interface `OpenLineDialogInterface`.
 *
 * Disponibiliza métodos para iniciar sessões, recuperar históricos, fixar atendimentos,
 * definir modo silencioso, atribuir avaliações e obter dados do diálogo a partir de diferentes parâmetros.
 *
 * Ele é o elo de relacionamento entre Sessões, Chats e Conectores.
 */
export declare class OpenLineDialog extends OpenLineDialogBuilder implements OpenLineDialogInterface {
    /**
     * Recupera o histórico de mensagens de uma sessão.
     *
     * @param chatId ID do chat.
     * @param sessionId ID da sessão (SESSION_ID). Use sempre o SESSION_ID para evitar erro.
     *
     * @returns Histórico da sessão.
     */
    getHistory(chatId: string | number, sessionId: string | number): Promise<any>;
    /**
     * Inicia uma nova sessão no chat.
     *
     * @param chatId ID do chat.
     * @returns Detalhes da sessão iniciada.
     */
    start(chatId: string | number): Promise<any>;
    /**
     * Inicia uma nova sessão a partir de uma mensagem específica.
     *
     * @param chatId ID do chat.
     * @param messageId ID da mensagem.
     * @returns `true` se iniciado com sucesso.
     */
    startByMessage(chatId: string | number, messageId: string | number): Promise<boolean>;
    /**
     * Inicia uma sessão a partir de um código de usuário.
     *
     * @param userCode Instância de `UserCodeBuilder`.
     * @returns Detalhes da sessão.
     */
    startByUserCode(userCode: UserCodeBuilder | string): Promise<any>;
    /**
     * Entra em uma sessão ativa de atendimento.
     *
     * @param chatId ID do chat.
     * @returns Resultado da operação.
     */
    join(chatId: string | number): Promise<any>;
    /**
     * Intercepta uma sessão de atendimento, assumindo-a.
     *
     * @param chatId ID do chat.
     * @returns Resultado da operação.
     */
    intercept(chatId: string | number): Promise<any>;
    /**
     * Fixa ou desafixa uma sessão de atendimento.
     *
     * @param chatId ID do chat.
     * @param enablePin "Y" para fixar, "N" para desafixar.
     * @returns Resultado da operação.
     */
    pin(chatId: string | number, enablePin: "Y" | "N"): Promise<any>;
    /**
     * Fixa todas as sessões ativas.
     *
     * @returns Resultado da operação.
     */
    pinAll(): Promise<any>;
    /**
     * Desfixa todas as sessões.
     *
     * @returns Resultado da operação.
     */
    unpinAll(): Promise<any>;
    /**
     * Ativa ou desativa o modo silencioso para um atendimento.
     *
     * @param chatId ID do chat.
     * @param enablePin "Y" para ativar, "N" para desativar.
     * @returns Resultado da operação.
     */
    silent(chatId: string | number, enablePin: "Y" | "N"): Promise<any>;
    /**
     * Avalia uma sessão de atendimento.
     *
     * @param sessionId ID da sessão.
     * @param ratingNumber Nota da avaliação (1 a 5).
     * @param comment Comentário opcional.
     * @returns `true` se enviado com sucesso.
     */
    rating(sessionId: string | number, ratingNumber?: 1 | 2 | 3 | 4 | 5, comment?: string): Promise<boolean>;
    /**
     * Cria um lead a partir de um chat.
     *
     * @param chatId ID do chat.
     * @returns `true` se criado com sucesso.
     */
    createLeadFromDialog(chatId: string | number): Promise<boolean>;
    /**
     * Recupera informações do diálogo a partir do ID do chat.
     *
     * @param id ID do chat.
     * @returns Dados do diálogo.
     */
    getByChatId(id: string | number): Promise<any>;
    /**
     * Recupera informações do diálogo a partir do ID do diálogo.
     *
     * @param id ID do diálogo.
     * @returns Dados do diálogo.
     */
    getByDialogId(id: string | number): Promise<any>;
    /**
     * Recupera informações do diálogo a partir do ID da sessão.
     *
     * @param id ID da sessão.
     * @returns Dados do diálogo.
     */
    getBySessionId(id: string | number): Promise<any>;
    /**
     * Recupera informações do diálogo a partir do código de usuário.
     *
     * @param userCode Instância de `UserCodeBuilder`.
     * @returns Dados do diálogo.
     */
    getByUserCode(userCode: UserCodeBuilder | string): Promise<any>;
    /**
     * Inicia uma bifurcação através de uma mensagem.
     *
     * @param CHAT_ID Número encontrado em Dialog.data.id.
     * @param MESSAGE_ID Mensagem enviada, por padrão Dialog.data.last_message_id.
     * @returns Resposta do Bitrix.
     */
    startNewDialogSession(CHAT_ID?: number | null, MESSAGE_ID?: number | null): Promise<any>;
}
