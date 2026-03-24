// CONSTANTES GLOBAIS
const EVENTO_INICIO = 3
const CREDITO = 4
const VALIDAR = 11

function taskHandler() {
    const TASK = Number(getWKNumState())

    // const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    // $(`#matricula`).val(MATRICULA_VENDEDOR)
    // const FILTRO = 'MATRICULA,' + document.getElementById('matricula').value;
    // console.log(FILTRO)

    // reloadZoomFilterValues(`cod_cliente`, FILTRO)
    // reloadZoomFilterValues(`cliente`, FILTRO)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
        case VALIDAR:
            $(`#credito`).addClass("blocked")
            break

        case CREDITO:
            $(`#dados`).addClass("blocked")
            break
    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

function esconderBotoesPaiFilho() {
    $(`.remove-button`).hide()
    $(`.js-add`).hide()
}

$(document).ready(() => {
    moment.locale("pt-br")

    $(`.js-add`).on("click", e => {
        determinaAgente()
    })

    taskHandler()
})


// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    switch (inputId) {
        case `codCliente`:
            window["cliente"].setValue(selectedItem.CLIENTE)
            break

        case `cliente`:
            window["codCliente"].setValue(selectedItem.CODCLI)
            break

    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}


function determinaAgente() {
    var tipo = $("#tipo").val();
    var agente = "";
    var matAgente = "";

    switch (tipo) {

        case "À vista":
            agente = "Daiana Pedroso";
            matAgente = "314";
            break;

        case "Faturado":
            agente = "Maisa Rodrigues";
            matAgente = "535";
            break;

        default:
            agente = "Daiana Pedroso";
            matAgente = "314";
            break;
    }

    $("#agente").val(agente);
    $("#matAgente").val(matAgente);

}