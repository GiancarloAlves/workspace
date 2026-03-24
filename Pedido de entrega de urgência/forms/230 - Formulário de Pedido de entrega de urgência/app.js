//PEDIDO DE ENTREGA DE URGÊNCIA

// CONSTANTES GLOBAIS
const EVENTO_INICIO = 2
const TRATATIVA = 5
const ACOMPANHAMENTO = 13
const TABLE__GRID_ID = `#pedido`

async function starter() {

    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#solicitante`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

    const FILTRO = 'A09_MATRICULA_VEND,' + document.getElementById('matSolicitante').value;

}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"

    // return PAPEIS_USUARIO
    return PAPEIS_USUARIO.includes(ID_PAPEL) ? "Supervisor" : "Vendedor"
}

async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor
    const MATRICULA_SUPERVISOR = DADOS_ADICIONAIS.content.extData["Matricula_supervisor"]

    $(`#supervisorSolicitante`).val(SUPERVISOR)
    $(`#matSupervisor`).val(MATRICULA_SUPERVISOR)
}

async function getDadosAdicionaisUser(user) {
    const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function taskHandler() {

    const TASK = Number(getWKNumState()) 
    const PEDIDO = document.getElementById('numped').value

    console.log(TASK)
    console.log(PEDIDO)

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            updateLED("led_abertura", true)

            $(`#tratativa`).addClass("blocked")
            $(`#fim`).addClass("blocked")
            
            recolherPainel(`#tratativa`)
            recolherPainel(`#fim`) 

            break

        case TRATATIVA:
            updateLED("led_tratativa", true)

            $(`#abertura`).addClass("blocked")
            $(`#fim`).addClass("blocked")
            
            recolherPainel(`#abertura`)
            recolherPainel(`#fim`) 

            validarProdutoEspecial()

            break

        case ACOMPANHAMENTO: 
            updateLED("led_fim", true)
            
            $(`#tratativa`).addClass("blocked")
            $(`#abertura`).addClass("blocked")
            
            recolherPainel(`#tratativa`)
            recolherPainel(`#abertura`) 

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
        wdkAddChild(`pedido`)
        filtrarZoomPaiFilho()
    })
    mostrarTodasSecoes()
    taskHandler()
    validarProdutoEspecial()

})

function recolherPainel(painel) {
    $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente
  
    $(painel).on('show.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
  }

  function bloquearPaineis(id) {
    $(".panel").filter(function() {
      return $(this).attr("id") !== id;
    }).addClass("blocked");
  }

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')
    const CODCLI = $(`#codcli`).val()
    const CLIENTE = $(`#cliente`).val()
    console.log(selectedItem)

    switch (inputId) {

        case `numped`:
            window[`codcli`].setValue(selectedItem.A02_COD_CLI)
            window[`cliente`].setValue(selectedItem.A03_CLIENTE)
            $(`#dataped`).val(selectedItem.A04_DT_PEDIDO)
            $(`#dtwms`).val(selectedItem.A05_DT_INTEGRACAO_WMS)
            $(`#status`).val(selectedItem.A06_STATUS_PEDIDO)
            $(`#statuswms`).val(selectedItem.A07_WMS_INTEGRACAO)
            $(`#qtditensesp`).val(selectedItem.A14_QT_ESPECIAL)
            $(`#validacao`).val(selectedItem.A15_ESPECIAL)
            validarProdutoEspecial()
            validaStatus()
            deployItem()
            break
            
        case `codcli`:
            // const CODCLI = $(`#codcli`).val()
            window[`cliente`].setValue(selectedItem.A03_CLIENTE)
            reloadZoomFilterValues(`numped`, `A02_COD_CLI,${CODCLI}`)
        break

        case `cliente`:
            window[`codcli`].setValue(selectedItem.A02_COD_CLI)
            reloadZoomFilterValues(`numped`, `A03_CLIENTE,${CLIENTE}`)
            break
        
        // case `filtroNF`:
        //     $(`#validacao`).val(selectedItem.A15_ESPECIAL)
    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")

}
// Função executada quando clicamos no x do zoom (prorrogação de títulos)
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {

        case `numped`:
            window[`cliente`].clear()
            window[`codcli`].clear()
            limparPaiFilho()
        break

        case `codcli`:
            window[`numped`].clear()
            window[`cliente`].clear()
            limparPaiFilho()
        break

        case `cliente`:
            window[`numped`].clear()
            window[`codcli`].clear()
            limparPaiFilho()
        break
   }
}
 
function validarProdutoEspecial(){ //só funciona quando a tarefa anda

    const PRODUTO_ESPECIAL = $("#validacao").val() == "PEDIDO COM PRODUTO ESPECIAL";

    if (PRODUTO_ESPECIAL) {
      $('#validacao').addClass("produto-especial");
    }
    else {
        // $('#validacao').addClass("produto-normal");  
    }
    
}

function validaStatus(){

    const STATUS = document.getElementById('status').value;
    console.log(STATUS)

    if(STATUS == "Bloqueado") {
        dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Pedido está bloqueado. Não será possível iniciar a solicitação.`})
    } 
}


function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 45000
    })
}

function updateLED(ledID, isActive) {
    if (isActive) {
      $(`#${ledID}`).removeClass('inativo').addClass('ativo');
      $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    } else {
      $(`#${ledID}`).removeClass('ativo').addClass('inativo');
      $('.led').not(`#${ledID}`).removeClass('inativo').addClass('ativo');
    }
  }

function ligarLED(ledID) {
    // Seleciona o LED específico com base no ID fornecido
    var ledEspecifico = $('#' + ledID);
  
    // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
    ledEspecifico.removeClass('inativo').addClass('ativo');
  
  }

function deployItem() { //FUNÇÃO PARA FAZER O DEPLOY DO PEDIDO INTEIRO

const ITEM = document.getElementById('numped').value;
console.log(ITEM)

var c2 = DatasetFactory.createConstraint('A01_PEDIDO', ITEM, ITEM, ConstraintType.MUST);
var constraints = new Array (c2)

var dataset = DatasetFactory.getDataset("ds_cancelamento_pedido_itens_winthor", null, constraints, null);
console.log(dataset)

for (var i=0;i<dataset.values.length;i++){
    wdkAddChild('pedido');
    $("#codprod___"+newId).val(dataset.values[i].A09_COD_PROD);
    $("#descprod___"+newId).val(dataset.values[i].A10_PRODUTO);
    $("#qtd___"+newId).val(dataset.values[i].A12_QT);
    $("#tipo___"+newId).val(dataset.values[i].A11_TIPO_PRODUTO);
}
}