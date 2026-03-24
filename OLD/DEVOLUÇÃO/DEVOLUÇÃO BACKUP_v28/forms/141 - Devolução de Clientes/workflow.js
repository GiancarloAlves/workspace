// Constantes globais atividades
const EVENTO_INICIO = 9
const APROVACAO_SUPERVISOR = 13
const AJUSTAR_DEVOLUCAO = 57
const APROVACAO_GERENTE_VENDAS = 20
const AVALIACAO_GERENTE_VENDAS = 129
const AVALIACAO_COMPRAS = 124
const CRIAR_ROTEIRO = 111
const ALTERACAO_COBRANCA = 29
const REALIZAR_COLETA = 33
const REALIZAR_RECEBIMENTO = 35
const CONFIRMAR_COLETA = 88
const REVISAR_DEVOLUCAO = 45
const RECEBIMENTO_AJUSTADO = 51
const ACERTO_CREDITO = 43
const DECISAO_GERENTE = 108
const APLICAR_ACAO = 67
const CONFIRMAR_DEVOLUCAO = 69
const ANALISAR_DEVOLUCAO = 106
const DESFAZ_ALTERACAO_COBRANCA = [114, 117]

function taskHandler() {
    const TASK = Number(getWKNumState()) 
    const DESFAZ_ALTERACAO = DESFAZ_ALTERACAO_COBRANCA.includes(TASK) ? TASK : ""
       
    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            taskHandlerInicio()
            break

        case APROVACAO_SUPERVISOR: 
            taskHandlerAprovacaoSupervisor()
            break

        case AJUSTAR_DEVOLUCAO: 
            taskHandlerAjustarDevolucao()
            break

        case APROVACAO_GERENTE_VENDAS: 
            taskHandlerAprovacaoGerenteVendas()
            break

        case ALTERACAO_COBRANCA: 
            taskHandlerAlteracaoCobranca()
            break

        case REALIZAR_COLETA: 
            taskHandlerRealizarColeta()
            break

        case REALIZAR_RECEBIMENTO: 
            taskHandlerRealizarRecebimento()
            break

        case CONFIRMAR_COLETA: 
            taskHandlerConfrimarColeta()
            break

        case REVISAR_DEVOLUCAO: 
            taskHandlerRevisarDevolucao()
            break

        case RECEBIMENTO_AJUSTADO: 
            taskHandlerRecebimentoAjustado()
            break

        case ACERTO_CREDITO: 
            taskHandlerAcertoCredito()
            break

        case DECISAO_GERENTE: 
            taskHandlerDecisaoGerente()
            break

        case APLICAR_ACAO: 
            taskHandlerAcao()
            break

        case CONFIRMAR_DEVOLUCAO: 
            taskHandlerConfirmarDevolucao()
            break

        case ANALISAR_DEVOLUCAO: 
            taskHandlerAnalisarDevolucao()
            break

        case AVALIACAO_GERENTE_VENDAS: 
            taskHandlerAvaliacaoGerente()
            break

        case AVALIACAO_COMPRAS: 
            taskHandlerAvaliacaoCompras()
            break

        case CRIAR_ROTEIRO: 
            taskHandlerCriarRoteiro()
            break

        case DESFAZ_ALTERACAO: 
            taskHandlerDesfazAlteracao()
            break
    }
}