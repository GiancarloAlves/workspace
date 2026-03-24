// CADASTRO E COMPRA DE ITEM NOVO
// CONSTANTES GLOBAIS
const EVENTO_INICIO      = 3
const CADASTRO           = 20
const COLOCACAO_PEDIDO   = 73
const COMPRA             = 37
const FOLLOW             = 81
const RECEBIMENTO        = 10
const LIBERACAO_RASTREIO = 75
const LIBERACAO_PEDIDO   = 85
const FIM                = 87
const TABLE__GRID_ID     = `#pedido`

async function starter() {

    getSupervisorVendedor()

    const TIPO_SOLICITANTE   = await userSupervisorVendas()
    const VENDEDOR           = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#solicitante`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

    const FILTRO = 'A09_MATRICULA_VEND,' + document.getElementById('matSolicitante').value;
}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO   = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL         = "SUPERVISOR_DE_VENDAS"

    // return PAPEIS_USUARIO
    return PAPEIS_USUARIO.includes(ID_PAPEL) ? "Supervisor" : "Vendedor"
}


async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS     = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR           = DADOS_ADICIONAIS.content.extData.Supervisor
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

    const TASK   = Number(getWKNumState())
    const PEDIDO = document.getElementById('numped').value

    console.log(TASK)

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:

            starter()
            updateLED("led_abertura")
            ligarLED("led_tabela")
            tratarPainel("abertura")
            $(`[data-cod]`).hide()
            break

        case CADASTRO:
            updateLED("led_abertura")
            tratarPainel("abertura")
            $(`[data-cod]`).show()
            break

        case COLOCACAO_PEDIDO:
            updateLED("led_pedido")
            tratarPainel("dadospedido")
            break

        case COMPRA:
            updateLED("led_pedido")
            tratarPainel("dadospedido")                       
            break

        case FOLLOW:
            updateLED("led_follow")
            atualizaValores()
            tratarPainel("follow")
            break

        case RECEBIMENTO:
            updateLED("led_recebimento")
            atualizaValores()
            tratarPainel("recebimento")
            break

       case LIBERACAO_PEDIDO:
            updateLED("led_liberacao")
            $("#subprocesso").val("sim")
            tratarPainel("liberacao")
            atualizaValores()

            const status_lib = document.getElementById("status2")
            if(status_lib !== "Liberado"){
            dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Pedido está com status diferente de Liberado. Pedido precisa estar liberado para o processo continuar`})}

            break

        case LIBERACAO_RASTREIO:
            updateLED("led_rastreio")
            $("#subprocesso").val("sim")
            tratarPainel("rastreio")
            break

        case FIM:
            updateLED("led_finalizacao")
            tratarPainel("finalizacao")         
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
        wdkAddChild(`tabcadastro`)
        // filtrarZoomPaiFilho()
    })
    mostrarTodasSecoes()
    taskHandler()

})


// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {

    const inputId     = selectedItem.inputName
    const [, row]     = selectedItem.inputName.split('___')
    const COD_CLIENTE = $(`#codClienteVal`).val()

    switch (inputId) {

        case `numped`:
            window[`codcli`].setValue(selectedItem.A02_COD_CLI)
            window[`cliente`].setValue(selectedItem.A03_CLIENTE)
            $(`#dataped`).val(selectedItem.A04_DT_PEDIDO)
            $(`#dtwms`).val(selectedItem.A05_DT_INTEGRACAO_WMS)
            $(`#status`).val(selectedItem.A06_STATUS_PEDIDO)
            $(`#status2`).val(selectedItem.A06_STATUS_PEDIDO)
            $(`#statuswms`).val(selectedItem.A07_WMS_INTEGRACAO)
            $(`#qtditensesp`).val(selectedItem.A14_QT_ESPECIAL)
            $(`#validacao`).val(selectedItem.A15_ESPECIAL)
            validaStatus()
            deployItem()
            break
            
        case `codfornec`:
            window[`fornecedor`].setValue(selectedItem.FORNECEDOR)
            $(`#comprador`).val(selectedItem.NOME)
            $(`#matcomprador`).val(selectedItem.CODCOMPRADOR)

            break
            
        case `fornecedor`:
            window[`codfornec`].setValue(selectedItem.CODFORNEC)
            $(`#comprador`).val(selectedItem.NOME)
            $(`#matcomprador`).val(selectedItem.CODCOMPRADOR)

            break      
        
        case `codClienteVal`:
            window[`clienteVal`].setValue(selectedItem.A02_CLIENTE)
            reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
            break
    
        case `clienteVal`:
            window[`codClienteVal`].setValue(selectedItem.A01_COD_CLI)
            reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
            break
    
        case `numNF`:
            window[`codClienteVal`].setValue(selectedItem.A01_COD_CLI)
            window[`clienteVal`].setValue(selectedItem.A02_CLIENTE)
            $(`#pedido2`).val(selectedItem.A04_PEDIDO)
            avaliaNF()
            break

        case `oc___${row}`:
            // $(`#qtdc___${row}`).val(selectedItem.A15_QT_PEDIDA)
            $(`#dtcompra___${row}`).val(selectedItem.A16_DT_COMPRA)
            $(`#prevent___${row}`).val(selectedItem.A17_PREVISAO_ENTREGA)

            // reloadZoomFilterValues(`numeroNF___${row}`, `NUMNOTA,${selectedItem.NUMNOTA}`)
            // reloadZoomFilterValues(`descProduto___${row}`, `DESCRICAO,${selectedItem.DESCRICAO}`)
            break
        }
}

function avaliaNF(){
    const pedido  = document.getElementById('numped').value;
    const pedido2 = document.getElementById('pedido2').value;
    console.log(pedido)
    console.log(pedido2)

    if(pedido != pedido2) { dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `O pedido desta NF não é o mesmo que iniciou o processo`})}
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
            limparPaiFilho()
            window[`cliente`].clear()
            window[`codcli`].clear()

        break

        case `codcli`:
            limparPaiFilho()
            window[`numped`].clear()
            window[`cliente`].clear()
        break

        case `cliente`:
            limparPaiFilho()
            window[`numped`].clear()
            window[`codcli`].clear()
        break
   }
}

function deployItem() {

    const ITEM = document.getElementById('numped').value;

    var c2 = DatasetFactory.createConstraint('A01_PEDIDO', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_compra_praca_itens_winthor", null, constraints, null);

    for (var i=0;i<dataset.values.length;i++){
        wdkAddChild('pedido');
        $("#codprod2___"+newId).val(dataset.values[i].A09_COD_PROD);
        $("#descprod___"+newId).val(dataset.values[i].A10_PRODUTO);
        $("#tipo___"+newId).val(dataset.values[i].A11_TIPO_PRODUTO);
        $("#qtd___"+newId).val(dataset.values[i].A12_QT);
        $("#a13codf___"+newId).val(dataset.values[i].A13_COD_FORNEC);
        $("#a14forn___"+newId).val(dataset.values[i].A14_FORNECEDOR);
        // $("#a17matcomp___"+newId).val(dataset.values[i].A17_MATRICULA_COMPRADOR);
        $("#a18comp___"+newId).val(dataset.values[i].A18_COMPRADOR);
 
        const PRODUTO_ESPECIAL = $("#tipo___"+newId).val() == "PRODUTO ESPECIAL";
      
        if (PRODUTO_ESPECIAL) {
          $("#tipo___"+newId).addClass("produto-especial");
        }

        const ANALISE_COMPRAS = $("#tipo___"+newId).val() == "VERIFICAR SETOR DE COMPRAS";

        if (ANALISE_COMPRAS) {
            $("#tipo___"+newId).addClass("analise-compras");
          }

        const MATCOMP = dataset.values[i].A17_MATRICULA_COMPRADOR;
        console.log(MATCOMP)
        
        if(MATCOMP == "209"){
            $(`#matcompras1`).val(dataset.values[i].A17_MATRICULA_COMPRADOR);
            $(`#compras1`).val(dataset.values[i].A18_COMPRADOR);
            console.log("ENTREI NO 209")
        }

        if(MATCOMP == "356"){
            $(`#matcompras2`).val(dataset.values[i].A17_MATRICULA_COMPRADOR);
            $(`#compras2`).val(dataset.values[i].A18_COMPRADOR);
            console.log("ENTREI NO 356")
        }
        
        if(MATCOMP == "460"){
            $(`#matcompras3`).val(dataset.values[i].A17_MATRICULA_COMPRADOR);
            $(`#compras3`).val(dataset.values[i].A18_COMPRADOR);
            console.log("ENTREI NO 460")
        }
    
        if(MATCOMP == "17"){
            $(`#matcompras4`).val(dataset.values[i].A17_MATRICULA_COMPRADOR);
            $(`#compras4`).val(dataset.values[i].A18_COMPRADOR);
            console.log("ENTREI NO 17")
        }    
    }
}

function atualizaValores(){

    const ITEM = document.getElementById('numped').value;

    var c2 = DatasetFactory.createConstraint('A01_PEDIDO', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_compra_praca_form_winthor", null, constraints, null);
    console.log(dataset)

    $("#dtwms").val(dataset.values[0].A05_DT_INTEGRACAO_WMS);
    $("#status").val(dataset.values[0].A06_STATUS_PEDIDO);
    $("#statuswms").val(dataset.values[0].A07_WMS_INTEGRACAO);
   
}

function validaStatus(){

    const STATUS = document.getElementById('status').value;
    const STATUSWMS = document.getElementById('statuswms').value;

    if(STATUS !== "Pendente") {
        dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Pedido possui status diferente de pendente ou liberado. Só é possível continuar se o pedido estiver pendente ou liberado.`})
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

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
}

function ligarLED(ledID) {
    // Seleciona o LED específico com base no ID fornecido
    var ledEspecifico = $('#' + ledID);
  
    // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
    ledEspecifico.removeClass('inativo').addClass('ativo');
}

  function recolherPainel(painel) {
    console.log(painel)
    $('.panel-collapse').not(`#${painel}`).removeClass("in");
}


function convertePrazo() {
    // Obter a data de entrada do usuário no formato "dd/mm/yyyy"
    var entrada = document.getElementById('entrada').value;
  
    // Separar os valores da variável entrada
    var valoresSeparados = entrada.split(/[\/ :]/);
  
    // Atribuir os valores às novas variáveis
    var dia     = valoresSeparados[0];
    var mes     = valoresSeparados[1];
    var ano     = valoresSeparados[2];
    var hora    = valoresSeparados[3];
    var minuto  = valoresSeparados[4];
    var segundo = valoresSeparados[5];
  
    // Calcule o prazo em minutos (ou qualquer outra lógica necessária)
    var prazodia = (hora * 60 * 60) + (minuto * 60);
  
    // Atribua os valores aos campos de destino
    document.getElementById('dia').value      = dia;
    document.getElementById('mes').value      = mes;
    document.getElementById('ano').value      = ano;

          // Exibir as novas variáveis no console (opcional)
      console.log("Dia: " + dia);
      console.log("Mês: " + mes);
      console.log("Ano: " + ano);
}

function filtrarZoomPaiFilho() { //FUNÇÃO DA DEVOLUÇÃO, PRECISA AJUSTAR
    const NUM_NF = $(`#numNF`).val()
    const COD_CLIENTE = $(`[name="cod_cliente"]`).val()

    console.log(NUM_NF)
    console.log(COD_CLIENTE)

    Array.from($(`:input[id*=parcela___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A06_NUMNOTA,${NUM_NF},A01_CODCLI,${COD_CLIENTE}`)
    })
}

function tratarPainel(painel) {
    $('.panel-collapse').not(`#${painel}`).removeClass("in");
    $('.panel-collapse').not(`#${painel}`).addClass("blocked");
    }

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
    }

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
    }

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")
    $(`${TABLE__GRID_ID2} .remove-button:gt(0)`).trigger("click")
    }