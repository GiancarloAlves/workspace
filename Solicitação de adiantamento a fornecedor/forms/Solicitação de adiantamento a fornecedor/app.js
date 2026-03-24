//CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const ESTORNO = 13
const FIM = 17


function taskHandler(){
    
    const TASK = Number(getWKNumState())
    const VENDEDOR = parent.WCMAPI.getUser()
    $(`#vendedor`).val(VENDEDOR)

    switch (TASK){
    case 0:
    case EVENTO_INICIO:
        esconderVariaveis()
        $(`#cp`).hide()
        break

    case ESTORNO:
        reaplicarHide()
        $(`#abertura`).addClass("blocked")
        break    

    case FIM:
        console.log(FIM)
        reaplicarHide()
        $(`#abertura`).parent().addClass("blocked")
        $(`#cp`).parent().addClass("blocked")
        break
    }
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const FILTRO = 'A10_CODFORNEC,' + document.getElementById('codForn').value;
    console.log(FILTRO)
    // reloadZoomFilterValues(`comprador`, FILTRO)

    switch (inputId) {
        case `codForn`:
            window["fornecedor"].setValue(selectedItem.FORNECEDOR)
            reloadZoomFilterValues(`numOC`, FILTRO)
            break

        case `fornecedor`:
            window["codForn"].setValue(selectedItem.CODCLI)
            reloadZoomFilterValues(`numOC`, FILTRO)
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
            
        })
 
function esconderVariaveis(){
        var $pix = $('#divpix');
        var $tipopix = $('#divtipopix');
        var $conta = $('#divconta');
        var $agencia = $('#divagencia');
        var $cnpj = $('#divcnpj');
        var $codbanco = $(`#divcodbanco`)
        
        $pix.hide();
        $tipopix.hide();
        $conta.hide();
        $agencia.hide();
        $cnpj.hide();
        $codbanco.hide()
}

function reaplicarHide(){

    var $pix = $('#divpix');
    var $tipopix = $('#divtipopix');
    var $conta = $('#divconta');
    var $agencia = $('#divagencia');
    var $cnpj = $('#divcnpj');
    var $codbanco = $(`#divcodbanco`)

        var modalidade = document.getElementById('modalidade').value
        console.log(modalidade)
        if (modalidade =="Pix"){
            $pix.show();
            $tipopix.show();
            $conta.hide();
            $agencia.hide();
            $cnpj.hide();
            $codbanco.hide()
                  
        }

        if (modalidade =="TED/DOC") {
            $pix.hide();
            $tipopix.hide();
            $conta.show();
            $agencia.show();
            $cnpj.show();
            $codbanco.show()

        }
    }