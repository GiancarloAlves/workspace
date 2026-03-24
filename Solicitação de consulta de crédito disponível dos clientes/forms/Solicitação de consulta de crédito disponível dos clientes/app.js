const EVENTO_INICIO = 4
const INFORMACOES_ADICIONAIS = 14

async function starter() {
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    const VENDEDOR = parent.WCMAPI.getUser()
    const TIPO_SOLICITANTE = await userSupervisorVendas()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)
    $(`#vendedor`).val(VENDEDOR)

    const FILTRO = 'A16_MATRICULA,' + document.getElementById('matSolicitante').value;

    try {
        const tipoSolicitante = await obterTipoSolicitante();

        if (tipoSolicitante === "Vendedor") {
            reloadZoomFilterValues('codClient', FILTRO);
            reloadZoomFilterValues('nomeCliente', FILTRO);
        }
    } catch (error) {
        console.log("Erro ao obter o tipoSolicitante:", error);
    }
}

async function obterTipoSolicitante() {
    // Lógica para obter o valor do tipoSolicitante
    return await Promise.all([userSupervisorVendas(), getSupervisorVendedor()])
        .then(() => {
            const TIPO = document.getElementById('tipoSolicitante').value;
            return TIPO;
        });
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

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)
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

    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    $(`#matricula`).val(MATRICULA_VENDEDOR)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            updateLED("led_abertura")
            tratarPainel("abertura")
            break

        case INFORMACOES_ADICIONAIS:
            updateLED("led_credito")
            tratarPainel("credito")
            break
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

$(document).ready(() => {
    moment.locale("pt-br")

    taskHandler()
})

function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName

    switch (inputId) {

        case `codClient`:
            window[`nomeCliente`].setValue(selectedItem.A03_CLIENTE)
            $('#saldoDisponivel').val(selectedItem.A04_SALDO_DIPONIVEL)
            $('#disponivelReal').val(selectedItem.A05_DISPONIVEL_REAL)
            $('#creditoAberto').val(selectedItem.A18_CREDITO_ABERTO)
            $('#pedidosLiberados').val(selectedItem.A07_PEDIDOS_LIB)
            $('#valorAberto').val(selectedItem.A09_VALOR_ABERTO)
            $('#pedidosPendBloq').val(selectedItem.A08_PEDIDOS_PEND_BLOQ)
            $('#valorVencido').val(selectedItem.A13_VALOR_VENCIDO)
            $('#titulosVencidos').val(selectedItem.A12_TITULOS_VENCIDOS)
            $('#limiteCredito').val(selectedItem.A10_LIMCRED_302)
            $('#vencimentoCredito').val(selectedItem.A11_DT_VENC_LIMCRED)
            $('#bloqueio').val(selectedItem.A14_BLOQUEIO)
            break

        case `nomeCliente`:
            window[`codClient`].setValue(selectedItem.A02_COD_CLI)
            $('#saldoDisponivel').val(selectedItem.A04_SALDO_DIPONIVEL)
            $('#disponivelReal').val(selectedItem.A05_DISPONIVEL_REAL)
            $('#creditoAberto').val(selectedItem.A18_CREDITO_ABERTO)
            $('#pedidosLiberados').val(selectedItem.A07_PEDIDOS_LIB)
            $('#valorAberto').val(selectedItem.A09_VALOR_ABERTO)
            $('#pedidosPendBloq').val(selectedItem.A08_PEDIDOS_PEND_BLOQ)
            $('#valorVencido').val(selectedItem.A13_VALOR_VENCIDO)
            $('#titulosVencidos').val(selectedItem.A12_TITULOS_VENCIDOS)
            $('#limiteCredito').val(selectedItem.A10_LIMCRED_302)
            $('#vencimentoCredito').val(selectedItem.A11_DT_VENC_LIMCRED)
            $('#bloqueio').val(selectedItem.A14_BLOQUEIO)
            break

    }
}


function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    const clearFields = () => {
        $('#saldoDisponivel, #disponivelReal, #creditoAberto, #pedidosLiberados, #valorAberto, #pedidosPendBloq, #valorVencido, #limiteCredito, #vencimentoCredito, #bloqueio, #titulosVencidos').val('');
    };

    switch (inputId) {

        case `codClient`:
            window[`nomeCliente`].clear()

            clearFields()
            break

        case `nomeCliente`:
            window[`codClient`].clear()

            clearFields()
            break
    }
}
