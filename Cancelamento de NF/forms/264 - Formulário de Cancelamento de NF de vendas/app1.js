const EVENTO_INICIO = 6
const APROVACAO_SUPERVISOR = 8
const APROVACAO_COMPRAS = 9
const CANCELAMENTO = 10
const REAVALIACAO = 50

async function starter() {
    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#vendedor`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

    const FILTRO = 'A14_MATRICULA_VEN,' + document.getElementById('matSolicitante').value
    // reloadZoomFilterValues(`codCliente`, FILTRO)

    // reloadZoomFilterValues(`cliente`, 'A14_MATRICULA_VEN,' + document.getElementById('matSolicitante').value)

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
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            $(`#supervisor`).addClass("blocked")
            $(`#compras`).addClass("blocked")
            $(`#reavaliacao`).addClass("blocked")
            $(`#cancelamento`).addClass("blocked")
            updateLED("led_abertura", true)

            recolherPainel(`#supervisor`)
            recolherPainel(`#reavaliacao`)
            recolherPainel(`#compras`)
            recolherPainel(`#cancelamento`)

            preencheValores()

            break

        case APROVACAO_SUPERVISOR:
            updateLED("led_supervisor", true)
            $(`#abertura`).addClass("blocked")
            $(`#compras`).addClass("blocked")
            $(`#reavaliacao`).addClass("blocked")
            $(`#cancelamento`).addClass("blocked")

            recolherPainel(`#abertura`)
            recolherPainel(`#reavaliacao`)
            recolherPainel(`#compras`)
            recolherPainel(`#cancelamento`)

            break

        case APROVACAO_COMPRAS:
            updateLED("led_compras", true)
            $(`#supervisor`).addClass("blocked")
            $(`#abertura`).addClass("blocked")
            $(`#reavaliacao`).addClass("blocked")
            $(`#cancelamento`).addClass("blocked")

            recolherPainel(`#supervisor`)
            recolherPainel(`#reavaliacao`)
            recolherPainel(`#abertura`)
            recolherPainel(`#cancelamento`)
            break

        case CANCELAMENTO:
            updateLED("led_cancelamento", true)
            mostrarTodasSecoes()
            preencheValores()
            $(`#supervisor`).addClass("blocked")
            $(`#compras`).addClass("blocked")
            $(`#reavaliacao`).addClass("blocked")
            $(`#abertura`).addClass("blocked")

            recolherPainel(`#supervisor`)
            recolherPainel(`#reavaliacao`)
            recolherPainel(`#compras`)
            recolherPainel(`#abertura`)
            break

        case REAVALIACAO:
            updateLED("led_reaval", true)
            $(`#supervisor`).addClass("blocked")
            $(`#compras`).addClass("blocked")
            $(`#abertura`).addClass("blocked")
            $(`#cancelamento`).addClass("blocked")

            recolherPainel(`#supervisor`)
            recolherPainel(`#abertura`)
            recolherPainel(`#compras`)
            recolherPainel(`#cancelamento`)
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
            window[`cliente`].setValue(selectedItem.A02_CLIENTE)
            reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
            break

        case `cliente`:
            window[`codCliente`].setValue(selectedItem.A01_COD_CLI)
            reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
            break

        case `numNF`:
            window[`codCliente`].setValue(selectedItem.A01_COD_CLI)
            window[`cliente`].setValue(selectedItem.A02_CLIENTE)
            $(`#valornota`).val(selectedItem.A05_VALOR)
            $(`#cobranca`).val(selectedItem.A07_COBRANCA)
            $(`#plano`).val(selectedItem.A09_PLANO)
            $(`#datafat`).val(selectedItem.A12_DT_SEFAZ)
            $(`#validacao`).val(selectedItem.A18_VALIDACAO)
            $(`#pedido`).val(selectedItem.A04_PEDIDO)
            $(`#subprocesso`).val("nao")
            validarProdutoEspecial()
    }
}

function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {

        case `codCliente`:
            window[`numNF`].clear()
            window[`cliente`].clear()
            break

        case `numNF`:
            window[`codCliente`].clear()
            window[`cliente`].clear()
            break

        case `cliente`:
            window[`numNF`].clear()
            window[`codCliente`].clear()
            break
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

function preencheValores() {

    const ITEM = document.getElementById('numNF').value;
    console.log(ITEM)

    var c2 = DatasetFactory.createConstraint('A03_NOTA', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array(c2)

    var dataset = DatasetFactory.getDataset("ds_cancelamento_de_notas_Winthor", null, constraints, null);
    console.log(dataset)

    // window[`codCliente`].setValue(dataset.values[0].A01_COD_CLI)
    // window[`cliente`].setValue(dataset.values[0].A02_CLIENTE)
    $("#valornota").val(dataset.values[0].A05_VALOR);
    $("#cobranca").val(dataset.values[0].A07_COBRANCA);
    $("#plano").val(dataset.values[0].A09_PLANO);
    $("#datafat").val(dataset.values[0].A12_DT_SEFAZ);
    $("#validacao").val(dataset.values[0].A18_VALIDACAO);
    $("#pedido").val(dataset.values[0].A04_PEDIDO);

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

function recolherPainel(painel) {
    $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente

    $(painel).on('show.bs.collapse', function () {
        $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function () {
        $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
}