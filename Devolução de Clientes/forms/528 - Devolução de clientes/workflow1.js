// Constantes globais atividades

//VENDAS
const EVENTO_INICIO = 9;
const APROVACAO_SUPERVISOR = 13;
const AJUSTAR_DEVOLUCAO = 57;
const APROVACAO_GERENTE_VENDAS = 20;
const AVALIACAO_GERENTE_VENDAS = 129; //OBSOLETO
const CONFIRMAR_DEVOLUCAO = 69; //DEVOLUÇÃO FINALIZADA
const DECISAO_GERENTE = 108; //OBSOLETO
const APROVACAO_LOGISTICA = 177;

//COMPRAS
const AVALIACAO_COMPRAS = 124;
const ANALISAR_DEVOLUCAO = 106;

//LOGISTICA
const CRIAR_ROTEIRO = 111;
const REALIZAR_COLETA = 33; //CONFIRMAR RECEBIMENTO DO MATERIAL
const REALIZAR_RECEBIMENTO = 35;
const CONFIRMAR_COLETA = 88; //FALAR COM CLIENTE SOBRE ENVIO DO MATERIAL
const REVISAR_DEVOLUCAO = 45;
const RECEBIMENTO_AJUSTADO = 51;

//FINANCEIRO
const ALTERACAO_COBRANCA = 29;
const ACERTO_CREDITO = 43;
const DESFAZ_ALTERACAO_COBRANCA = [114, 163];
const ACERTO_CONTAS_RECEBER = 221;
const NOTIFICA_CONTAS_RECEBER = 215;

//DP
const APLICAR_ACAO = 67;

function taskHandler() {
  const TASK = Number(getWKNumState());
  const DESFAZ_ALTERACAO = DESFAZ_ALTERACAO_COBRANCA.includes(TASK) ? TASK : "";

  console.log(TASK);

  switch (TASK) {
    //MASTER VENDAS
    case 0:
    case EVENTO_INICIO:
      taskHandlerInicio();
      updateLED("led_abertura");
      break;

    case APROVACAO_SUPERVISOR:
      taskHandlerAprovacaoSupervisor();
      updateLED("led_supervisor");
      ligarLED("led_abertura");
      break;

    case AJUSTAR_DEVOLUCAO:
      taskHandlerAjustarDevolucao();
      updateLED("led_ajustar_devolucao");
      ligarLED("led_abertura");
      break;

    case APROVACAO_GERENTE_VENDAS:
      taskHandlerAprovacaoGerenteVendas();
      updateLED("led_gerente_vendas");
      break;

    case ALTERACAO_COBRANCA:
    case NOTIFICA_CONTAS_RECEBER:
      taskHandlerAlteracaoCobranca();
      updateLED("led_altcobranca");
      break;

    case REALIZAR_COLETA:
      taskHandlerRealizarColeta();
      updateLED("led_recebimento");
      break;

    case REALIZAR_RECEBIMENTO:
      taskHandlerRealizarRecebimento();
      updateLED("led_devolucao");
      ligarLED("led_abertura");
      break;

    case CONFIRMAR_COLETA:
      taskHandlerConfrimarColeta();
      updateLED("led_confirma_recebimento");
      break;

    case REVISAR_DEVOLUCAO:
      taskHandlerRevisarDevolucao();
      updateLED("led_revisar_devolucao");
      ligarLED("led_abertura");
      break;

    case RECEBIMENTO_AJUSTADO: // ESTADO OBSOLETO
      taskHandlerRecebimentoAjustado();
      break;

    case ACERTO_CREDITO:
    case ACERTO_CONTAS_RECEBER:
      taskHandlerAcertoCredito();
      updateLED("led_acerto");
      break;

    case DECISAO_GERENTE:
      taskHandlerDecisaoGerente();
      updateLED("led_acerto");
      break;

    case APLICAR_ACAO:
      taskHandlerAcao();
      updateLED("led_comportamental");
      break;

    case CONFIRMAR_DEVOLUCAO:
      taskHandlerConfirmarDevolucao();
      break;

    case ANALISAR_DEVOLUCAO:
      taskHandlerAnalisarDevolucao();
      break;

    case AVALIACAO_GERENTE_VENDAS: // ESTADO OBSOLETO
      taskHandlerAvaliacaoGerente();
      updateLED("led_gerente_vendas");
      break;

    case AVALIACAO_COMPRAS:
      taskHandlerAvaliacaoCompras();
      updateLED("led_abertura");
      break;

    case CRIAR_ROTEIRO:
      taskHandlerCriarRoteiro();
      updateLED("led_roteiro");
      break;

    case DESFAZ_ALTERACAO:
      taskHandlerDesfazAlteracao();
      updateLED("led_desfazcobranca");
      break;

    case APROVACAO_LOGISTICA:
      taskHandlerAprovaLogistica();
      updateLED("led_logistica");
      break;
  }
}
