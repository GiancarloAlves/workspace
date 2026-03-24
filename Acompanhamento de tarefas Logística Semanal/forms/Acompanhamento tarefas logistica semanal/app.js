const EVENTO_INICIO = 25
const REVISAR_ITENS_BLOQUEADOS = 24
const REVISAR_PEDIDOS_PARADOS = 15
const CHECK_LIST_CARRINHOS_OP = 21
const PERCENT_FRETES_TRANSP = 28

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:

            break

        case REVISAR_ITENS_BLOQUEADOS:
            tratarPainel("estoque")
            break
        case REVISAR_PEDIDOS_PARADOS:
            tratarPainel("saida")
            break

        case CHECK_LIST_CARRINHOS_OP:
            tratarPainel("saida")
            break

        case PERCENT_FRETES_TRANSP:
            tratarPainel("viaAuto")
            break
    }
}

function tratarPainel(painel) {
    $('.panel-primary').not(`.${painel}`).addClass("blocked");
}

$(document).ready(function () {
    taskHandler()
});