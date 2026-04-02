// Constantes globais atividades

//VENDAS
const EVENTO_INICIO = 4;
const APROVACAO_SUPERVISOR = 9;

//LOGISTICA
const DEVOLUCAO = 18;
const LIBERACAO_PEDIDO_SUBSTITUTO = 30;

//PÓS VENDA
const VALIDACAO_APROVACAO = 11;
const FINALIZACAO_AVALIACAO = 21;

function taskHandler() {
  const TASK = Number(getWKNumState());

  console.log(TASK);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      taskHandlerInicio();
      updateLED("led_abertura");
      break;

    case APROVACAO_SUPERVISOR:
      taskHandlerAprovacaoSupervisor();
      updateLED("led_supervisor");
      break;

    case VALIDACAO_APROVACAO:
      taskHandlerValidacaoAprovacao();
      updateLED("led_posvenda");
      break;

    case LIBERACAO_PEDIDO_SUBSTITUTO:
      taskHandlerLiberacaoPedidoSubstituto();
      updateLED("led_liberacao_pedido_substituto");
      break;

    case DEVOLUCAO:
      taskHandlerDevolucao();
      updateLED("led_devolucao");
      break;

    case FINALIZACAO_AVALIACAO:
      taskHandlerFinalizacaoAvaliacao();
      updateLED("led_finalizacao_avaliacao");
      break;
  }
}

function updateLED(ledID) {
  $(".led").not(`#${ledID}`).removeClass("ativo").addClass("inativo");
  $(`#${ledID}`).removeClass("inativo").addClass("ativo");
}

function ligarLED(ledID) {
  $("#" + ledID)
    .removeClass("inativo")
    .addClass("ativo");
}

function recolherPainel(painel) {
  $(".panel-collapse").not(painel).removeClass("in");
}
