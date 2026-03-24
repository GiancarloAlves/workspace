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

const TABLE__GRID_ID = `#TabelaTitulos`

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    $(`#matricula`).val(MATRICULA_VENDEDOR)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter();
            updateLED("led_abertura", true)
            ligarLED("led_tabela")
            // esconderPaineis()
            dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: `Após escolher o número do título, é necessário adicionar pelo menos 1 parcela!` })
            $(`#tabela-titulos`).show()

            recolherPainel('#dadoscliente')
            $('#tabela-titulos').addClass("in")
            break

        case ANALISE_FINANCEIRA:
            updateLED("led_financeiro", true)
            $(`.remove-button`).hide()
            $(`#aprovacao`).addClass("blocked")
            $(`#analise-financeira`).show()

            $(`#tabela-titulos`).addClass("blocked")

            recolherPainel('#analise-financeira')
            $('#dadoscliente').addClass("in")
            $('#tabela-titulos').addClass("in")
            break

        case APROVACAO_DIRETOR:
            updateLED("led_aprovacao", true)
            mostrarTodasSecoes()
            $(`.remove-button`).hide()
            $(`#dadoscliente`).addClass("blocked")
            $(`#tabela-titulos`).addClass("blocked")
            $(`#analise-financeira`).addClass("blocked")
            $(`#reavalicao`).hide()

            recolherPainel('#aprovacao')
            $('#dadoscliente').addClass("in")
            $('#tabela-titulos').addClass("in")
            break

        case INFORMAR_VENDEDOR:
            updateLED("led_reaval", true)
            mostrarTodasSecoes()
            ligarLED("led_tabela")
            $(`#dadoscliente`).addClass("blocked")
            $(`#aprovacao`).addClass("blocked")
            $(`#analise-financeira`).addClass("blocked")
            $(`#aprovacao-diretoria`).addClass("blocked")

            recolherPainel('#reavaliacao')
            $('#dadoscliente').addClass("in")
            $('#tabela-titulos').addClass("in")
            break

        case ALTERAR_VENCIMENTO_TITULO:
            mostrarTodasSecoes()
            $(`#dadoscliente`).addClass("blocked")
            $(`#tabela-titulos`).addClass("blocked")
            $(`#analise-financeira`).addClass("blocked")
            $(`#aprovacao`).addClass("blocked")
            $(`#reavaliacao`).addClass("blocked")
            break
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
        wdkAddChild(`TabelaTitulos`)
        filtrarZoomPaiFilho()
    })

    taskHandler()
})

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}

function filtrarZoomPaiFilho() {
    const NUM_NF = $(`#numNF`).val()
    const COD_CLIENTE = $(`[name="cod_cliente"]`).val()

    console.log(NUM_NF)
    console.log(COD_CLIENTE)

    Array.from($(`:input[id*=parcela___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A06_NUMNOTA,${NUM_NF},A01_CODCLI,${COD_CLIENTE}`)
    })
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    switch (inputId) {
        case `cod_cliente`:
            window["cliente"].setValue(selectedItem.CLIENTE)
            reloadZoomFilterValues(`cliente`, `CODCLI,${selectedItem.CODCLI}`)
            reloadZoomFilterValues(`numNF`, `A01_CODCLI,${selectedItem.CODCLI}`)
            break

        case `numNF`:
            $("#risco").val(selectedItem.A04_RISCO_3)
            $("#posicao").val(selectedItem.A03_POSICAO)
            $('#additem').removeAttr('hidden');
            break

        case `cliente`:
            window["cod_cliente"].setValue(selectedItem.CODCLI)
            reloadZoomFilterValues(`cod_cliente`, `CODCLI,${selectedItem.CODCLI}`)
            reloadZoomFilterValues(`numNF`, `A01_CODCLI,${selectedItem.CODCLI}`)
            break

        case `parcela___${row}`:
            $(`#vencimentoOriginal___${row}`).val(converterTimeStamp(selectedItem.A15_DTVENCORIG))
            $(`#valorTitulo___${row}`).val(selectedItem.A10_VALOR)
            $(`#tituloProrrogado___${row}`).val(selectedItem.A28_PRORROGADO)
            $(`#status___${row}`).val(selectedItem.A21_ESTADO)
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

    const FILTRO = 'MATRICULA,' + document.getElementById('matricula').value;
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

function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 5000
    })
}

function recolherPainel(painel) {
    $('.panel-collapse').not(painel).removeClass("in");
}

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
}

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
}

function testePedido() {

    var analise = DatasetFactory.getDataset("ds_analise_cred_winthor", null, null, null);
    var dataset = DatasetFactory.getDataset("ds_analise_credito", null, null, null);


    for (var j = 0; j < analise.values.length; j++) {

        var pedidoNumero = analise.values[j].NUMPED;

        console.log("***Analise:" + pedidoNumero)

        for (var i = 0; i < dataset.values.length; i++) {
            var encontrouPedido = false;
            var numped = dataset.values[i].numped;
            console.log(numped)
            if (numped == pedidoNumero) {
                encontrouPedido = true;
            }
        }

        console.log("Status dessa análise:" + encontrouPedido)

        if (encontrouPedido == false) {
            console.log("Pedido não encontrado, abrindo solicitação")
            break;
        }

    }
    if (encontrouPedido) {
        $(`#procv`).val("Sim")
        console.log("ENTREI NO SIM")
    } else {
        $(`#procv`).val("Não")
        $(`#pedAnalise`).val(pedidoNumero)
        console.log("ENTREI NO NÃO")
    }
}