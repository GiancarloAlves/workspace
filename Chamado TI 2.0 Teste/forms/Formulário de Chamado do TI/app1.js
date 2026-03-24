// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const TRATATIVA = 7
const ESCLARECIMENTO = 14
const GERENTE = 38
const FIM = 16
const TABLE__GRID_ID = `#requisicaoti`

async function starter() {

    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#vendedor`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)
    $(`#matricula`).val(MATRICULA_VENDEDOR)

    // document.getElementById("tipo").disabled = true;

}

function filtros() {

    const SUBTIPO = $(`#subtipo`).val()

    var dataset = DatasetFactory.getDataset("ds_solicitacao_ti_winthor", null, null, null);
    removerDuplicatasDataset(dataset, "tipo", "A05_TIPO");

    var dataset = DatasetFactory.getDataset("ds_solicitacao_ti_winthor", null, null, null);
    removerDuplicatasDataset(dataset, "subtipo", "A06_SUBTIPO");

    aplicaSubtipo()

    $('#subtipo').on('change', function () {
        const SUBTIPO = $(`#subtipo`).val()
        console.log(SUBTIPO)
        window["solicitacao"].clear()
        reloadZoomFilterValues(`solicitacao`, `A06_SUBTIPO,${SUBTIPO}`)
    })


}

function taskHandler() {

    const TASK = Number(getWKNumState())
    const MATERIAL = $(`#reqmaterial`).val()

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            updateLED("led_abertura", true)
            esconderPaineis()
            starter()
            filtros()
            $("#matAgente").attr("readonly", true);
            break

        case TRATATIVA:


            habilitaInfo()
            updateLED("led_ti", true)
            if (MATERIAL == "ESPECIAL") {
                $("input[name='confgerente'][value='Sim']").prop("checked", true).attr("readonly", true);
                $("input[name='confgerente'][value='Não']").attr("readonly", true);
            } else {
                $("input[name='confgerente'][value='Sim']").attr("readonly", false);
                $("input[name='confgerente'][value='Não']").attr("readonly", false);
            }

            mostrarTodasSecoes()
            filtros()
            recolherPainel('#aprovacao-gerente')
            recolherPainel('#finalizacao')
            $(`#aprovacao-gerente`).addClass("blocked")
            $(`#finalizacao`).addClass("blocked")
            $('#dadosSolic').show()
            break

        case ESCLARECIMENTO:
            habilitaInfo()
            $(`#abertura`).addClass("blocked")
            recolherPainel('#aprovacao-gerente')
            $(`#aprovacao-gerente`).addClass("blocked")
            $(`#acao-ti`).addClass("blocked")

        case FIM:
            habilitaInfo()
            updateLED("led_fim", true)
            $(`#acao-ti`).addClass("blocked")
            recolherPainel('#aprovacao-gerente')
            recolherPainel('#abertura')
            $(`#aprovacao-gerente`).addClass("blocked")
            break

        case GERENTE:
            habilitaInfo()
            updateLED("led_gerente", true)
            ligarLED("led_material")
            console.log(MATERIAL)
            $(`#acao-ti`).addClass("blocked")
            $(`#finalizacao`).addClass("blocked")
            recolherPainel('#acao-ti')
            recolherPainel('#finalizacao')

            if (MATERIAL == "NAO") {
                recolherPainel('#aprovacao-req')
                $(`#aprovacao-req`).addClass("blocked")
            }
            else {

            }

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

    // return PAPEIS_USUARIO.includes(ID_PAPEL||ID_PAPELA||ID_PAPELB||ID_PAPELC) ? "Supervisor" : "Vendedor"
    // return PAPEIS_USUARIO.includes(ID_PAPELA) ? "Supervisor" : "Vendedor"
    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC) ? "Supervisor" : "Usuário comum";
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
        headers: { "Content-type": "application/json;charset=UTF-8" }
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

    $(painel).on('show.bs.collapse', function () {
        $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function () {
        $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
}

function determinaAgente() {
    var codtipo = $("#codTipo").val();
    var agente = "";
    var matAgente = "";

    switch (codtipo) {

        case "INFRAESTRUTURA":
            agente = "Max Gomes";
            matAgente = "408";
            break;

        case "PROCESSOS":
            agente = "Bruno Pires";
            matAgente = "411";
            break;

        case "SISTEMAS":
            agente = "Toni Manito";
            matAgente = "232";
            break;

        default:
            agente = "Indeterminado";
            matAgente = "408";
            break;
    }

    $("#agente").val(agente);
    $("#matAgente").val(matAgente);

}

$(document).ready(() => {
    moment.locale("pt-br")

    $(`.js-add`).on("click", e => {
        wdkAddChild(`requisicaoti`)
        filtrarZoomPaiFilho()
    })

    taskHandler()

})

function aplicaSubtipo() {
    $('#tipo').on('change', function () {

        window["solicitacao"].clear()
        var selectElement = document.getElementById("subtipo");

        while (selectElement.options.length > 0) { selectElement.remove(0); }     // Limpar o combobox removendo todas as opções existentes

        var TIPO = $(this).val();
        var c1 = DatasetFactory.createConstraint('A05_TIPO', TIPO, TIPO, ConstraintType.MUST);
        var constraints = new Array(c1)

        // const CONSTRAINT = $('#tipo').val()
        var dataset = DatasetFactory.getDataset("ds_solicitacao_ti_winthor", null, constraints, null);

        removerDuplicatasDataset(dataset, "subtipo", "A06_SUBTIPO")

    });
}

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}


// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')
    const TIPO_SOLICITACAO = $(`#tipo`).val()
    const SUBTIPO = $(`#subtipo`).val()

    switch (inputId) {

        // os dois casos abaixo eram usados quanto tipo e subtipo eram datasets
        // case `tipo`:
        // // reloadZoomFilterValues(`subtipo`, `A05_TIPO,${TIPO_SOLICITACAO}`)
        // const CONSTRAINT = document.getElementById("tipo");
        // var dataset = DatasetFactory.getDataset("ds_solicitacao_ti_winthor", null, CONSTRAINT, null);
        // removerDuplicatasDataset(dataset, "subtipo","A06_SUBTIPO")
        // determinaAgente()
        // break

        // case `subtipo`:
        // window[`tipo`].setValue(selectedItem.A05_TIPO)
        // reloadZoomFilterValues(`solicitacao`, `A06_SUBTIPO,${SUBTIPO}`)
        // break

        case `solicitacao`:
            $(`#tipo`).val(selectedItem.A05_TIPO)
            aplicaSubtipo()
            $(`#subtipo`).val(selectedItem.A06_SUBTIPO)
            $(`#aprovgerente`).val(selectedItem.A03_APROVACAO_GERENTE)
            $(`#reqmaterial`).val(selectedItem.A04_REQUISICAO_MATERIAL)
            $(`#tpassumir`).val(selectedItem.A08_TEMPO_ASSUMIR)
            $(`#tpconcluir`).val(selectedItem.A09_TEMPO_CONCLUIR)
            $(`#urgencia`).val(selectedItem.A07_URGENCIA)
            $(`#codTipo`).val(selectedItem.A05_TIPO)
            determinaAgente()
            convertePrazo()
            habilitaInfo()
        // document.getElementById("subtipo").disabled = true;

        case `numreq`:
            // window[`requisitante`].setValue(selectedItem.A11_REQUISITANTE)
            // window[`datareq`].setValue(selectedItem.A02_DATA)       
            break

        case `requisitante`:
            reloadZoomFilterValues(`datareq`, `A02_DATA,${selectedItem.A02_DATA}`)
            reloadZoomFilterValues(`numreq`, `A01_REQUISICAO,${selectedItem.A01_REQUISICAO}`)
            break

        case `datareq`:
            reloadZoomFilterValues(`requisitante`, `A11_REQUISITANTE,${selectedItem.A11_REQUISITANTE}`)
            reloadZoomFilterValues(`numreq`, `A01_REQUISICAO,${selectedItem.A01_REQUISICAO}`)
            break

        case `cod_cliente`:
            window["cliente"].setValue(selectedItem.CLIENTE)
            break

        case `cliente`:
            window["cod_cliente"].setValue(selectedItem.CODCLI)
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
            $(`#subtipo`).val("")
            $(`#aprovgerente`).val("")
            $(`#reqmaterial`).val("")
            $(`#tpassumir`).val("")
            $(`#tpconcluir`).val("")
            $(`#urgencia`).val("")
            $(`#prazo`).val("")
            $(`#agente`).val("")
            break

        case `solicitacao`:
            $(`#tipo`).val("")
            $(`#subtipo`).val("")
            $(`#aprovgerente`).val("")
            $(`#reqmaterial`).val("")
            $(`#tpassumir`).val("")
            $(`#tpconcluir`).val("")
            $(`#urgencia`).val("")
            $(`#prazo`).val("")
            $(`#agente`).val("")
        // document.getElementById("subtipo").disabled = false;

    }
}

function removerDuplicatasDataset(dataset, selectId, columnName) {
    var valoresUnicos = [];

    for (var i = 0; i < dataset.values.length; i++) {
        var valor = dataset.values[i][columnName];

        if (valoresUnicos.indexOf(valor) === -1) {
            valoresUnicos.push(valor);
        }
    }

    valoresUnicos.unshift("Selecione uma opção");
    var selectElement = document.getElementById(selectId);

    for (var i = 0; i < valoresUnicos.length; i++) {
        var option = document.createElement("option");
        option.value = valoresUnicos[i];
        option.text = valoresUnicos[i];
        selectElement.appendChild(option);
    }

}

function deployRequisicao() {

    const REQUISICAO = document.getElementById('numreq').value;
    console.log(REQUISICAO)

    var c1 = DatasetFactory.createConstraint('A01_REQUISICAO', REQUISICAO, REQUISICAO, ConstraintType.MUST);
    var constraints = new Array(c1)

    var dataset = DatasetFactory.getDataset("ds_requisicao_ti_winthor", null, constraints, null);

    for (var i = 0; i < dataset.values.length; i++) {
        wdkAddChild('requisicaoti');

        $("#codprod___" + newId).val(dataset.values[i].A03_COD_PRODUTO);
        $("#descprod___" + newId).val(dataset.values[i].A04_PRODUTO);
        $("#qtd___" + newId).val(dataset.values[i].A05_QTD);
        $("#valor___" + newId).val(dataset.values[i].A07_VLR_TOTAL);

    }
}

function convertePrazo() {
    // Obter o valor em minutos do campo tpconcluir
    var minutos = parseInt(document.getElementById('tpconcluir').value);

    // Calcular a data/hora atual
    var dataAtual = new Date();

    // Adicionar os minutos ao horário atual
    var prazo = new Date(dataAtual.getTime() + minutos * 60000); // Multiplica por 60000 para converter minutos em milissegundos

    var formattedPrazo = ("0" + prazo.getDate()).slice(-2) + "/" +
        ("0" + (prazo.getMonth() + 1)).slice(-2) + "/" +
        prazo.getFullYear() + " " +
        ("0" + prazo.getHours()).slice(-2) + ":" +
        ("0" + prazo.getMinutes()).slice(-2) + ":" +
        ("0" + prazo.getSeconds()).slice(-2);

    console.log(prazo);
    console.log(formattedPrazo);

    // Atribui o valor da variável ao campo de prazo
    document.getElementById('prazo').value = formattedPrazo;

    // Separar os valores da variável formattedPrazo
    var valoresSeparados = formattedPrazo.split(/[\/ :]/);

    // Atribuir os valores às novas variáveis
    var dia = valoresSeparados[0];
    var mes = valoresSeparados[1];
    var ano = valoresSeparados[2];
    var hora = valoresSeparados[3];
    var minuto = valoresSeparados[4];
    var segundo = valoresSeparados[5];

    var prazodia = (hora * 60 * 60) + (minuto * 60);

    document.getElementById('dia').value = dia;
    document.getElementById('mes').value = mes;
    document.getElementById('ano').value = ano;
    document.getElementById('prazodia').value = prazodia;

    // Exibir as novas variáveis no console (opcional)
    // console.log("Dia: " + dia);
    // console.log("Mês: " + mes);
    // console.log("Ano: " + ano);
    // console.log("Hora:" + hora);
    // console.log("Minuto:" + minuto)
    // console.log("Segundo:" + segundo)
    // console.log("Prazo do Dia: " + prazodia);
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

function habilitaInfo() {
    const EXTRACAO = $(`#solicitacao`).val();
    const PROBLEMA = EXTRACAO[0];

    console.log(PROBLEMA);

    $(`#problema`).val(PROBLEMA)

    if (PROBLEMA == "NÃO CONSIGO COMPLETAR SOLICITAÇÃO" || PROBLEMA == "ITEM/NF NÃO APARECE") {
        // Mostra a div com o ID "dadosSolic"
        $('#dadosSolic').show();
    } else { $('#dadosSolic').hide(); }
}
