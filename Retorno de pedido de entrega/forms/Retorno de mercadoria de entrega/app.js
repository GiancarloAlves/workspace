const EVENTO_INICIO = 2
const NOTIFICAR_VENDEDOR = 5
const ROTEIRIZAR = 7
const ACOMPANHAMENTO = 13

function taskHandler(){
    const TASK = Number(getWKNumState()) 
    console.log(TASK)


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            esconderPaineis()
            break

        case NOTIFICAR_VENDEDOR:
            $(`#abertura`).parent().addClass("blocked")
            $(`#roteiro`).hide()   
            $(`#acomp`).hide() 
            break

        case ROTEIRIZAR: 
            $(`#abertura`).parent().addClass("blocked")
            $(`#notifica-vendedor`).parent().addClass("blocked")
            $(`#acomp`).hide()   
            break

        case ACOMPANHAMENTO:
            mostrarTodasSecoes()
            $(`#abertura`).parent().addClass("blocked")
            $(`#notifica-vendedor`).parent().addClass("blocked")
            $(`#roteiro`).parent().addClass("blocked")
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

function validarProdutoEspecial(){ //só funciona quando a tarefa anda

    const PRODUTO_ESPECIAL = $("#validacao").val() === "***NF COM PRODUTO ESPECIAL***";
    console.log($("#validacao").val());
    console.log(PRODUTO_ESPECIAL)

    if (PRODUTO_ESPECIAL) {
      $('#validacao').addClass("produto-especial");
    }
    
}


