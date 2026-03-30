// Constantes globais atividades

//VENDAS
const EVENTO_INICIO = 4;
const APROVACAO_SUPERVISOR = 9;

//LOGISTICA
const DEVOLUCAO = 18;

//PÓS VENDA
const VALIDACAO_APROVACAO = 11;
const FINALIZACAO_AVALIACAO = 21;

// Ordem sequencial dos LEDs no processo
const LED_SEQUENCE = [
  "led_abertura",
  "led_supervisor",
  "led_posvenda",
  "led_devolucao",
  "led_finalizacao_avaliacao",
];

function taskHandler() {
  const TASK = Number(getWKNumState());

  console.log(TASK);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      taskHandlerInicio();
      atualizarLEDs("led_abertura");
      recolherPainel("#registro-devolucao");
      break;

    case APROVACAO_SUPERVISOR:
      taskHandlerAprovacaoSupervisor();
      atualizarLEDs("led_supervisor");
      recolherPainel("#aprovacao-supervisor");
      break;

    case VALIDACAO_APROVACAO:
      taskHandlerValidacaoAprovacao();
      atualizarLEDs("led_posvenda");
      recolherPainel("#registro-devolucao");
      break;

    case DEVOLUCAO:
      taskHandlerDevolucao();
      atualizarLEDs("led_devolucao");
      recolherPainel("#realizar-recebimento");
      break;

    case FINALIZACAO_AVALIACAO:
      taskHandlerFinalizacaoAvaliacao();
      atualizarLEDs("led_finalizacao_avaliacao");
      recolherPainel("#finalizacao-pos-venda");
      break;
  }
}

// Liga apenas o LED da etapa atual, desliga todos os outros
function atualizarLEDs(ledAtual) {
  LED_SEQUENCE.forEach((led) => {
    if (led === ledAtual) {
      $(`#${led}`).removeClass("inativo").addClass("ativo");
    } else {
      $(`#${led}`).removeClass("ativo").addClass("inativo");
    }
  });
}

function recolherPainel(painel) {
  $(".panel-collapse").not(painel).removeClass("in");
}

