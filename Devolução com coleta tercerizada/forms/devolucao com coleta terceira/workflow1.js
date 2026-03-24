// Constantes globais atividades

//VENDAS
const EVENTO_INICIO = 4;
const APROVACAO_SUPERVISOR = 9;

//LOGISTICA
const DEVOLUCAO = 18;

//PÓS VENDA
const VALIDACAO_APROVACAO = 11;
const FINALIZACAO_AVALIACAO = 21;

function taskHandler() {
  const TASK = Number(getWKNumState());

  console.log(TASK);

  switch (TASK) {
    //MASTER VENDAS
    case 0:
    case EVENTO_INICIO:
      updateLED("led_abertura");
      break;

    case APROVACAO_SUPERVISOR:
      updateLED("led_supervisor");
      ligarLED("led_abertura");
      break;

    case VALIDACAO_APROVACAO:
      updateLED("led_posvenda");
      ligarLED("led_abertura");
      break;

    case DEVOLUCAO:
      updateLED("led_devolucao");
      ligarLED("led_abertura");
      break;

    case FINALIZACAO_AVALIACAO:
      updateLED("led_finalizacao_avaliacao");
      ligarLED("led_abertura");
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
