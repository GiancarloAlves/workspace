const EVENTO_INICIO = 4;
const DESBLOQUEIO = 5;

function taskHandler() {
  const TASK = Number(getWKNumState());

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      updateLED("led_abertura");
      recolherOutrosPaineis("#dadosSolicitacao");
      break;

    case DESBLOQUEIO:
      updateLED("led_desbloqueio");
      recolherOutrosPaineis("#desbloqueio");
      break;
  }
}

function updateLED(ledID) {
  $(".led").not(`#${ledID}`).removeClass("ativo").addClass("inativo");
  $(`#${ledID}`).removeClass("inativo").addClass("ativo");
}

function recolherOutrosPaineis(painel) {
  $(".panel-collapse").not(painel).removeClass("in"); // Remove a classe 'in' de todos os painéis exceto o fornecido
  $(".panel-collapse").not(painel).addClass("blocked");
  $(painel)
    .on("show.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("up").addClass("down");
    })
    .on("hide.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("down").addClass("up");
    });
}

$(document).ready(() => {
  moment.locale("pt-br");

  taskHandler();
});
