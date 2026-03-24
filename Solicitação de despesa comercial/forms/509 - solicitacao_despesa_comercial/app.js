//CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const APROVACAO = 5
const ANEXO = 6
const CP = 7
const REAVALIACAO = 18

function taskHandler(){
    
    const TASK = Number(getWKNumState())
    const VENDEDOR = parent.WCMAPI.getUser()
    $(`#vendedor`).val(VENDEDOR)
    console.log(TASK)

    switch (TASK){
    case 0:
    case EVENTO_INICIO:
        esconderVariaveis()
        $(`#gerencia`).hide()
        $(`#cp`).hide()
        $(`#reavaliacao`).hide()
        updateLED("led_abertura")
        recolherPainel("abertura")
        break

    case APROVACAO:
        reaplicarHide()
        $(`#cp`).addClass("blocked")
        $(`#reavaliacao`).addClass("blocked")
        updateLED("led_gerencia")
        recolherPainel("gerencia")
        $(`#abertura`).addClass("in")
        $(`#gerencia`).addClass("in")
        break

    case ANEXO:
        reaplicarHide()
        $(`#cp`).addClass("blocked")
        $(`#reavaliacao`).addClass("blocked")
        recolherPainel("gerencia")
        $(`#gerencia`).addClass("blocked")
        $(`#abertura`).addClass("in")

        dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `É necessário anexar a NF dos gastos nessa etapa!`})

        break        
    
    case CP:
        reaplicarHide()
        $(`#abertura`).addClass("blocked")
        $(`#gerencia`).addClass("blocked")
        $(`#reavaliacao`).addClass("blocked")
        updateLED("led_cp")
        $(`#abertura`).addClass("in")
        $(`#cp`).addClass("in")
        break

    case REAVALIACAO:
        reaplicarHide()
        $(`#abertura`).addClass("blocked")
        $(`#cp`).addClass("blocked")
        $(`#credito`).addClass("blocked")
        updateLED("led_reav")
        $(`#abertura`).addClass("in")
        break
    }
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    // const FILTRO = 'CODCLI,' + document.getElementById('matricula').value;
    // reloadZoomFilterValues(`comprador`, FILTRO)

    switch (inputId) {
        case `codCliente`:
            window["cliente"].setValue(selectedItem.CLIENTE)
            reloadZoomFilterValues(`numNF`, `CODCLI,${selectedItem.CODCLI}`)
            break

        case `cliente`:
            window["codCliente"].setValue(selectedItem.CODCLI)
            reloadZoomFilterValues(`numNF`, `CODCLI,${selectedItem.CODCLI}`)
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
    $('.form-group').removeClass('hide');


    var $modalidade = $('#modalidade');
    var $pix = $('#divpix');
    var $tipopix = $('#divtipopix');
    var $conta = $('#divconta');
    var $agencia = $('#divagencia');
    var $cnpj = $('#divcnpj');
    var $iniciocartao = $(`#diviniciocartao`)
    var $fimcartao = $(`#divfimcartao`)
    var $codbanco = $(`#divcodbanco`)

    $(document).ready(function() {
        
       $modalidade.change(function() {
            var selectedOption = $(this).val();
            if (selectedOption === 'Pix') {
                $pix.show();
                $tipopix.show();
                $conta.hide();
                $agencia.hide();
                $cnpj.hide();
                $iniciocartao.hide();
                $fimcartao.hide();
                $codbanco.hide()
                
            } 
            
            if (selectedOption === 'Cartão de crédito') {
                $pix.hide();
                $tipopix.hide();
                $conta.hide();
                $agencia.hide();
                $cnpj.hide();
                $iniciocartao.show();
                $fimcartao.show();
                $codbanco.hide()
            }              

            else if (selectedOption === 'TED/DOC') {
                $pix.hide();
                $tipopix.hide();
                $conta.show();
                $agencia.show();
                $cnpj.show();
                $iniciocartao.hide();
                $fimcartao.hide();    
                $codbanco.show();
                
            }
        });
    });
    
})

function esconderVariaveis(){
        var $pix = $('#divpix');
        var $tipopix = $('#divtipopix');
        var $conta = $('#divconta');
        var $agencia = $('#divagencia');
        var $cnpj = $('#divcnpj');
        var $iniciocartao = $(`#diviniciocartao`)
        var $fimcartao = $(`#divfimcartao`)
        var $codbanco = $(`#divcodbanco`)
        
        $pix.hide();
        $tipopix.hide();
        $conta.hide();
        $agencia.hide();
        $cnpj.hide();
        $iniciocartao.hide();
        $fimcartao.hide();
        $codbanco.hide()
}

function reaplicarHide(){

    var $pix = $('#divpix');
    var $tipopix = $('#divtipopix');
    var $conta = $('#divconta');
    var $agencia = $('#divagencia');
    var $cnpj = $('#divcnpj');
    var $iniciocartao = $(`#diviniciocartao`)
    var $fimcartao = $(`#divfimcartao`)
    var $codbanco = $(`#divcodbanco`)

        var modalidade = document.getElementById('modalidade').value
        console.log(modalidade)
        if (modalidade =="Pix"){
            $pix.show();
            $tipopix.show();
            $conta.hide();
            $agencia.hide();
            $cnpj.hide();
            $iniciocartao.hide();
            $fimcartao.hide();
            $codbanco.hide()
                  
        }

        if (modalidade =="TED/DOC") {
            $pix.hide();
            $tipopix.hide();
            $conta.show();
            $agencia.show();
            $cnpj.show();
            $iniciocartao.hide();
            $fimcartao.hide();
             $codbanco.hide()

        }
            
        if (modalidade =="Cartão de crédito") {
            $pix.hide();
            $tipopix.hide();
            $conta.hide();
            $agencia.hide();
            $cnpj.hide();
            $iniciocartao.show();
            $fimcartao.show();
            $codbanco.show()
         
        }

}

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
  }

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
  }

function recolherPainel(painel) {
  $('.panel-collapse').not(painel).removeClass('in');
}

function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 5000
    })
}