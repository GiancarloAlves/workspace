// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const TRATATIVA = 7
const ESCLARECIMENTO = 14
const GERENTE = 38
const FIM = 16

async function starter() {

        // Busca o supervisor do vendedor
        getSupervisorVendedor()

        const TIPO_SOLICITANTE = await userSupervisorVendas()
        const VENDEDOR = parent.WCMAPI.getUser()
        const MATRICULA_USUARIO = parent.WCMAPI.getUserCode()
    
        $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
        $(`#vendedor`).val(VENDEDOR)
        $(`#matSolicitante`).val(MATRICULA_VENDEDOR)
        $(`#matricula`).val(MATRICULA_USUARIO)

        // getSupervisorUsuario()
}

function taskHandler(){
    
    const TASK = Number(getWKNumState()) 

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            esconderPaineis()
            break

        case TRATATIVA: 
            mostrarTodasSecoes()
            $(`#abertura`).addClass("blocked")
            recolherPainel('#aprovacao-gerente')
            recolherPainel('#finalizacao')
            $(`#aprovacao-gerente`).addClass("blocked")
            $(`#finalizacao`).addClass("blocked")
            break

        case FIM: 
            $(`#acao-ti`).addClass("blocked")
            recolherPainel('#aprovacao-gerente')
            recolherPainel('#abertura')
            $(`#aprovacao-gerente`).addClass("blocked")
            break

        case GERENTE:
            $(`#abertura`).addClass("blocked")
            $(`#acao-ti`).addClass("blocked")
            $(`#finalizacao`).addClass("blocked")
            break    

    }
}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"
    const ID_PAPELA = "GERENTE_DE_COMPRAS"
    const ID_PAPELB = "GERENTE_DE_VENDAS"
    const ID_PAPELC = "GERENTE_DE_LOGISTICA"
    const ID_PAPELD = "admin"

    // return PAPEIS_USUARIO.includes(ID_PAPEL||ID_PAPELA||ID_PAPELB||ID_PAPELC) ? "Supervisor" : "Vendedor"
    // return PAPEIS_USUARIO.includes(ID_PAPELA) ? "Supervisor" : "Vendedor"
    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC || papel === ID_PAPELD) ? "Supervisor" : "Usuário comum";
}

async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor
    const MATRICULA_SUPERVISOR = DADOS_ADICIONAIS.content.extData["Matricula_supervisor"]

    $(`#supervisorSolicitante`).val(SUPERVISOR)
    $(`#matSupervisor`).val(MATRICULA_SUPERVISOR)
}

// function getSupervisorUsuario(){

//     var matricula = $('#matricula').val(); // Obter a matrícula do usuário do campo "matricula"
//     var nomeUsuario;
    
//     var constraints = [
//       DatasetFactory.createConstraint("MATRICULA", matricula, matricula, ConstraintType.MUST)
//     ];
    
//     var dataset = DatasetFactory.getDataset("ds_consulta_usuarios_winthor", null, constraints, null); // Consultar o dataset "ds_consulta_usuarios_winthor" com as constraints
//     if (dataset && dataset.values.length > 0) {
//       nomeUsuario = dataset.values[0]["NOME"]; // Obter o valor do campo "NOME" do primeiro registro retornado pelo dataset
//     }
    
//     console.log("Nome do usuário: " + nomeUsuario);
    
//     // Exibir o nome do usuário em algum lugar da página
//     $('#supervisorSolicitante').text(nomeUsuario);

// }


async function getDadosAdicionaisUser(user) {
    const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })

    const DATA = await RESPONSE.json()
    return DATA
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

function recolherPainel(painel) {
    $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente
  
    $(painel).on('show.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
  }


function determinaAgente(){
var tipo = $("#tipo").val();
var agente = "";
var matAgente = "";

switch (tipo) {
  case "INFRAESTRUTURA":
    agente = "Max Gomes";
    matAgente = "408";
    break;
  case "PROCESSO":
    agente = "Bruno Pires";
    matAgente = "411";
    break;
  case "SISTEMAS":
    agente = "Toni Manito";
    matAgente = "232";
    break;
}

$("#agente").val(agente);
$("#matAgente").val(matAgente);

}

// Exibindo os valores das variáveis no console
console.log("Agente:", agente);
console.log("Matrícula do Agente:", matAgente);


$(document).ready(() => {
    moment.locale("pt-br")

    $(`.js-add`).on("click", e => {
        wdkAddChild(`TabelaTitulos`)
        filtrarZoomPaiFilho()
    })

    taskHandler()

    // var $subtipo = $('#subtipo');
    // var $solicitacao = $('#solicitacao');
    // var $aprgerente = $('#divtipopix');
    // var $conta = $('#divconta');
    // var $agencia = $('#divagencia');
    // var $cnpj = $('#divcnpj');
    // var $iniciocartao = $(`#diviniciocartao`)
    // var $fimcartao = $(`#divfimcartao`)
    // var $numNF = $(`#divnumNF`)

    var dataset = DatasetFactory.getDataset("ds_solicitacao_ti_winthor", null, null, null);
    var valoresUnicos = removerDuplicatasDataset(dataset);
    var tipo = [];
})


function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}

function filtrarZoomPaiFilho() {
    const CODFORNECEDOR = $(`#codfornec`).val()
    const MATRICULA =  $(`[name="matricula"]`).val()
    const OC = $(`#mainOC`).val()
    // document.getElementById('matricula').value;

   
    Array.from($(`:input[id*=codprod___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A06_MATRICULA,${MATRICULA},A10_CODFORNEC,${CODFORNECEDOR}`)

    })

    // Array.from($(`:input[id*=descprod___]`)).map(el => {
    //     reloadZoomFilterValues(el.id, `A05_RCA,${MATRICULA},A19_COMPRADOR,${COMPRADOR}`)
      
    // })
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')
    const TIPO_SOLICITACAO = $(`#tipo`).val()
    const SUBTIPO = $(`#subtipo`).val()
        
    switch (inputId) {


        case `tipo`:
        reloadZoomFilterValues(`subtipo`, `A05_TIPO,${TIPO_SOLICITACAO}`)
        determinaAgente()
        break

        case `subtipo`:
        window[`tipo`].setValue(selectedItem.A05_TIPO)
        reloadZoomFilterValues(`solicitacao`, `A06_SUBTIPO,${SUBTIPO}`)
        break

        case `solicitacao`:
        window[`tipo`].setValue(selectedItem.A05_TIPO)
        window[`subtipo`].setValue(selectedItem.A06_SUBTIPO)
        $(`#aprovgerente`).val(selectedItem.A03_APROVACAO_GERENTE)
        $(`#reqmaterial`).val(selectedItem.A04_REQUISICAO_MATERIAL)
        $(`#tpassumir`).val(selectedItem.A08_TEMPO_ASSUMIR)
        $(`#tpconcluir`).val(selectedItem.A09_TEMPO_CONCLUIR)
        $(`#urgencia`).val(selectedItem.A07_URGENCIA)
               

        // case `codfornec`:
        //     window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)
        //     $(`#comprador`).val(selectedItem.A19_COMPRADOR)
        //     $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
        //     $('#additem').removeAttr('hidden');
        //     // $('#listaoc').attr('hidden', true);
        //     // $('#listaitem').attr('hidden', true);
        //     disableMainOC();
        //     disablePesqprod();
        //     break
            

        // case `fornecedor`:
        //     window[`codfornec`].setValue(selectedItem.A10_CODFORNEC)
        //     $(`#comprador`).val(selectedItem.A19_COMPRADOR)
        //     $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
        //     $('#additem').removeAttr('hidden');
        //     // $('#listaoc').attr('hidden', true);
        //     // $('#listaitem').attr('hidden', true);
        //     disableMainOC();
        //     disablePesqprod();
        //     break

        // case `codprod___${row}`:
        //     $(`#descprod___${row}`).val(selectedItem.A09_DESCRICAO)
        //     $(`#oc___${row}`).val(selectedItem.A14_PEDIDO_COMPRA)
        //     $(`#qtdcomprada___${row}`).val(selectedItem.A15_QT_PEDIDA)
        //     $(`#comprador2___${row}`).val(selectedItem.A19_COMPRADOR)
        //     $('#listaoc').attr('hidden', true);
        //     $('#listaitem').attr('hidden', true);

        // case `mainOC`:
        //     window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)
        //     window[`codfornec`].setValue(selectedItem.A10_CODFORNEC)
        //     $(`#comprador`).val(selectedItem.A19_COMPRADOR)
        //     $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
        //     $('#additem').removeAttr('hidden');
        //     // $('#listaitem').attr('hidden', true);
        //     disablePesqprod();

        // case `pesqcod`:
        //     window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)
        //     window[`codfornec`].setValue(selectedItem.A10_CODFORNEC)
        //     $(`#comprador`).val(selectedItem.A19_COMPRADOR)
        //     $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
        //     $('#additem').removeAttr('hidden');
        //     // $('#listaoc').attr('hidden', true);
        //     disableMainOC();

    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

// Função executada quando clicamos no x do zoom (prorrogação de títulos)
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {
        case `tipo`:
        window["subtipo"].clear()
        window["solicitacao"].clear()
        break

        case `subtipo`:
        window["solicitacao"].clear()
        break

   }
}


function removerDuplicatasDataset(dataset) {

    var valoresUnicos = [];
    
    for (var i = 0; i < dataset.values.length; i++) {
      var valor = dataset.values[i]["A05_TIPO"]; // Substitua "A05_TIPO" pelo nome correto da coluna
    
      if (valoresUnicos.indexOf(valor) === -1) {
        valoresUnicos.push(valor);

      }
    }
}


