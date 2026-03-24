const EVENTO_INICIO = 2
const ACOMPANHAMENTO = 13
const CANHOTO = 42

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)


    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            updateLED("led_abertura")
            tratarPainel("abertura")
            break

        case CANHOTO:
            updateLED("led_gestorCanhoto")
            tratarPainel("gestorCanhoto")
            $(`#abertura`).addClass("in");
            break

        case ACOMPANHAMENTO:
            updateLED("led_acomp")
            tratarPainel("acomp")
            break
    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

$(document).ready(() => {
    moment.locale("pt-br")

    taskHandler()
    validarProdutoEspecial()
})

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const COD_CLIENTE = $(`#codCliente`).val()

    switch (inputId) {

        case `codCliente`:
            window[`cliente`].setValue(selectedItem.A05_CLIENTE)
            reloadZoomFilterValues(`numNF`, "A04_COD_CLI," + COD_CLIENTE)
            break

        case `cliente`:
            window[`codCliente`].setValue(selectedItem.A04_COD_CLI)
            reloadZoomFilterValues(`numNF`, "A04_COD_CLI," + COD_CLIENTE)
            break

        case `numNF`:
            window[`codCliente`].setValue(selectedItem.A04_COD_CLI)
            window[`cliente`].setValue(selectedItem.A05_CLIENTE)
            $(`#vendedor`).val(selectedItem.A08_VENDEDOR)
            $(`#matVendedor`).val(selectedItem.A07_MATRICULA_VEN)
            $(`#datafat`).val(selectedItem.A13_DT_FAT_SEFAZ)
            $(`#plano`).val(selectedItem.A18_PLANO)
            $(`#endereco`).val(selectedItem.A24_ENDERECO)
            $(`#tipoTransportadora`).val(selectedItem.A30_TIPO_TRANSPORTE)
            $(`#validacao`).val(selectedItem.A03_PROD_ESPECIAL)
            $(`#transportadora`).val(selectedItem.A21_TRANSPORTADORA)
            $(`#qtditens`).val(selectedItem.A27_NUM_ITENS)
            $(`#qtditensesp`).val(selectedItem.A28_NUM_ITENS_ESP)
            $(`#qtdvolume`).val(selectedItem.A29_NUM_VOLUMES)
            $(`#cobranca`).val(selectedItem.A16_COBRANCA)
            $(`#codtransp`).val(selectedItem.A20_COD_FORNEC_FRETE)
            $(`#enderecoCompleto`).val(selectedItem.A24_ENDERECO)

    }
}

function validarProdutoEspecial() { //só funciona quando a tarefa anda

    const PRODUTO_ESPECIAL = $("#validacao").val() === "***NF COM PRODUTO ESPECIAL***";
    console.log($("#validacao").val());
    console.log(PRODUTO_ESPECIAL)

    if (PRODUTO_ESPECIAL) {
        $('#validacao').addClass("produto-especial");
    }

}

function tratarPainel(painel) {
    $('.panel-collapse').not(`#${painel}`).removeClass("in");
    $('.panel-collapse').not(`#${painel}`).addClass("blocked");
    // $('.panel-collapse').not(`#${painel}`).addClass("hide");
}

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
}

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
}
