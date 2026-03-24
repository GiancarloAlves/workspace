// ANÁLISE DE CRÉDITO
// CONSTANTES GLOBAIS
const EVENTO_INICIO = 10
const AGUARDANDO_PAGAMENTO = 5
const ANEXAR_CS_OC = 31
const ANALISE_CREDITO = 17
const ANEXAR_OC = 34
const PAGAMENTO_ESTIPULADO = 46
const LIBERACAO_PEDIDO = 46
const ANALISE_NORBERTO = 26
const REANALISE_NORBERTO = 53
const RENEGOCIACAO_VENDEDOR = 52
const CANCELAMENTO_PEDIDO = 54
const TABLE__GRID_ID = `#pedido`

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            tratarPainel("abertura")
            updateLED("led_abertura", true)
            ligarLED("led_abertura")
            break;

        case AGUARDANDO_PAGAMENTO:
            tratarPainel("vendedor")
            updateLED("led_vendedor", true)
            ligarLED("led_vendedor")
            break;

        case ANEXAR_CS_OC:
            tratarPainel("anexarContratoEOC")
            updateLED("led_led_anexarContratoEOC", true)
            ligarLED("led_led_anexarContratoEOC")
            break;

        case ANALISE_CREDITO:
            tratarPainel("cred")
            updateLED("led_cred", true)
            ligarLED("led_cred")
            break;

        case ANEXAR_OC:
            tratarPainel("anexoOC")
            updateLED("led_anexoOC", true)
            ligarLED("led_anexoOC")
            break;

        case PAGAMENTO_ESTIPULADO:
            tratarPainel("pagamentoEstipulado")
            updateLED("led_pagamentoEstipulado", true)
            ligarLED("led_pagamentoEstipulado")
            break;

        case LIBERACAO_PEDIDO:
            tratarPainel("liberacaoPedido")
            updateLED("led_liberacaoPedido", true)
            ligarLED("led_liberacaoPedido")
            break;

        case ANALISE_NORBERTO:
            tratarPainel("MasterNorberto")
            updateLED("led_aprovacao", true)
            ligarLED("led_aprovacao")
            break;

        case REANALISE_NORBERTO:
            tratarPainel("ReanaliseNorberto")
            updateLED("led_Reaprovacao", true)
            ligarLED("led_Reaprovacao")    
            break;

        case RENEGOCIACAO_VENDEDOR:
            break;

        case CANCELAMENTO_PEDIDO:
            break;

        default:

            break;


    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(2)`).hide()
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
    })

    taskHandler()
})



// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    switch (inputId) {

        case `numped`:
            $("#prioridadeWms").val(selectedItem.A37_PRIORIDADE_WMS);
            $("#codcli").val(selectedItem.A03_COD_CLI);
            $("#cliente").val(selectedItem.A05_CLIENTE);
            $("#codcliprinc").val(selectedItem.A04_COD_CLI_PRINC);
            $("#posicao").val(selectedItem.A12_POSICAO);
            $("#dataPed").val(selectedItem.A02_DATA_PEDIDO);
            $("#codPraca").val(selectedItem.A35_COD_PRACA);
            $("#praca").val(selectedItem.A36_PRACA);
            $("#plano").val(selectedItem.A34_PLANO);
            $("#codCob").val(selectedItem.A31_COD_COB);
            $("#cobranca").val(selectedItem.A32_COBRANCA);
            $("#codPL").val(selectedItem.A33_COD_PL_PAG);
            $("#dtVencLimCred").val(selectedItem.A27_DTVENCLIMCRED);
            $("#titulosAbertos").val(selectedItem.A21_TITULOS_EM_ABERTO);
            $("#titulosPgAtraso").val(selectedItem.A25_TITULOS_PAGOS_ATRASADOS);
            $("#titulosVenc").val(selectedItem.A23_TITULOS_VENCIDOS);
            $("#solicitante").val(selectedItem.A08_VENDEDOR);
            $("#matSolicitante").val(selectedItem.A07_MAT_VENDEDOR);
            $("#supervisorSolicitante").val(selectedItem.A11_SUPERVISOR);
            $("#matSupervisor").val(selectedItem.A10_MAT_SUPERVISOR);
            $("#primeiraCompra").val(selectedItem.A28_PRIMEIRA_COMPRA);
            $("#ultimaCompra").val(selectedItem.A29_ULTIMA_COMPRA);
            $("#diasUltCompra").val(selectedItem.A30_DIAS_ULTIMA_COMPRA);

            // Formata os valores antes de exibi-los nos campos
            $("#cred302").val(formataValor(selectedItem.A17_LIMCRED_302));
            $("#valorPed").val(formataValor(selectedItem.A13_VL_ATEND));
            $("#credDispBL").val(formataValor(selectedItem.A16_DISPONIVEL_MENOS_P_B));
            $("#creditoReal").val(formataValor(selectedItem.A15_DISPONIVEL_REAL));
            $("#valorAberto").val(formataValor(selectedItem.A22_VALOR_ABERTO));
            $("#valorVenc").val(formataValor(selectedItem.A24_VALOR_VENCIDO));
            $("#valorPgAtrasado").val(formataValor(selectedItem.A26_VALOR_PAGO_ATRASADO));
            $("#saldoDisp").val(formataValor(selectedItem.A14_SALDO_DISPONIVEL));
            $("#pedidosPB").val(formataValor(selectedItem.A20_PEDIDOS_PEND_BLOQ));
            $("#creditoTotal").val(formataValor(selectedItem.A18_CREDITO_TOTAL));

            break

        case `cliente`:
            window["cod_cliente"].setValue(selectedItem.CODCLI);
            reloadZoomFilterValues(`cod_cliente`, `CODCLI,${selectedItem.CODCLI}`);
            reloadZoomFilterValues(`numNF`, `A01_CODCLI,${selectedItem.CODCLI}`);
            break

        case `parcela___${row}`:
            $(`#vencimentoOriginal___${row}`).val(converterTimeStamp(selectedItem.A15_DTVENCORIG));
            $(`#valorTitulo___${row}`).val(selectedItem.A10_VALOR);
            $(`#tituloProrrogado___${row}`).val(selectedItem.A28_PRORROGADO);
            $(`#status___${row}`).val(selectedItem.A21_ESTADO);
            break
    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")
}

// Função executada quando clicamos no x do zoom
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputName

    switch (inputId) {
        case `cod_cliente`:
            window["cliente"].clear()
            window["numNF"].clear()
            console.log(`${TABLE__GRID_ID}`)
            limparPaiFilho()
            break

        case `cliente`:
            window["cod_cliente"].clear()
            window["numNF"].clear()
            console.log(`${TABLE__GRID_ID}`)
            limparPaiFilho()
            break

        case `numNF`:
            limparPaiFilho()
            break
    }
}

async function starter() {

    // const FILTRO = 'MATRICULA,' + document.getElementById('matricula').value;
    try {
        const tipoSolicitante = await obterTipoSolicitante();
        console.log(tipoSolicitante);

        // LÓGICA PARA ANULAR O FILTRO DE CARTEIRA PARA SUPERVISORES
        //   if (tipoSolicitante === "Vendedor") {
        //     reloadZoomFilterValues('cod_cliente', FILTRO);
        //     reloadZoomFilterValues('cliente', FILTRO);
        //   }
    } catch (error) {
        console.log("Erro ao obter o tipoSolicitante:", error);
    }
}

async function obterTipoSolicitante() {

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

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
}

async function getDadosAdicionaisUser(user) {
    const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 5000
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

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

// function formataValor(valor) {
// const formatter = new Intl.NumberFormat('pt-BR', {
//     style: 'currency',
//     currency: 'BRL',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
// });

// return formatter.format(valor);
// }

function formataValor(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    if (Number.isNaN(valor)) {
        // O valor é NaN
        // Coloque seu código de validação aqui
        // Exemplo:
        console.log("O valor é NaN");
    } else {
        // O valor não é NaN
        return formatter.format(valor);
    }
}