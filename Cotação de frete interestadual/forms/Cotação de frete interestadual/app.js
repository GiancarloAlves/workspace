//MANUTENÇÃO E CANCELAMENTO DE PEDIDOS

// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const COTACAO = 5
const APROVACAO_GERENTE = 13
const CORRECAO = 11
const NOTIFICACAO = 15
const TABLE__GRID_ID = `#pedido`

async function starter() {

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#solicitante`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

    const FILTRO = 'A07_RCA,' + document.getElementById('matSolicitante').value;
    try {
        const tipoSolicitante = await obterTipoSolicitante();
        console.log(tipoSolicitante);

        if (tipoSolicitante === "Vendedor") {
            reloadZoomFilterValues('codcli', FILTRO);
            reloadZoomFilterValues('cliente', FILTRO);
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
    const PEDIDO = document.getElementById('numped').value

    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
        case CORRECAO:
            starter();
            updateLED("led_abertura", true);
            ligarLED("led_tabela");
            tratarPainel("abertura");

            break

        case COTACAO:
            tratarPainel("cotacao");
            ligarLED("led_cotacao");

            break

        case APROVACAO_GERENTE:
            tratarPainel("aprovacao");
            ligarLED("led_aprovacao");

            break

        case NOTIFICACAO:
            $('.panel-collapse').removeClass("in");
            $('.panel-collapse').addClass("blocked");

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
    })

    mostrarTodasSecoes()
    taskHandler()

})

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')
    const CODCLI = $(`#codcli`).val()
    const CLIENTE = $(`#cliente`).val()

    switch (inputId) {

        case `numped`:
            window[`codcli`].setValue(selectedItem.A02_COD_CLI)
            window[`cliente`].setValue(selectedItem.A03_CLIENTE)
            window[`cnpjCliente`].setValue(selectedItem.A10_CNPJ)
            var dataTratada = converterTimeStamp(selectedItem.A01_DATA)
            $(`#dataped`).val(dataTratada)
            $(`#entrega`).val(selectedItem.A09_ENTREGA)
            $(`#valor`).val(selectedItem.A05_VALOR)
            deployItem()
            break

        case `codcli`:
            window[`cliente`].setValue(selectedItem.A03_CLIENTE)
            reloadZoomFilterValues(`numped`, `A02_COD_CLI,${CODCLI}`)
            break

        case `cliente`:
            window[`codcli`].setValue(selectedItem.A02_COD_CLI)
            reloadZoomFilterValues(`numped`, `A03_CLIENTE,${CLIENTE}`)
            break
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
            limparPaiFilho()
            window[`cliente`].clear()
            window[`codcli`].clear()
            window[`cnpjCliente`].clear()
            break

        case `codcli`:
            limparPaiFilho()
            window[`numped`].clear()
            window[`cliente`].clear()
            window[`cnpjCliente`].clear()
            break

        case `cliente`:
            limparPaiFilho()
            window[`numped`].clear()
            window[`codcli`].clear()
            window[`cnpjCliente`].clear()

        case `cnpjCliente`:
            window[`numped`].clear()
            window[`codcli`].clear()
            window[`cliente`].clear()
            break
    }
}

function deployItem() {

    const ITEM = document.getElementById('numped').value;

    var c2 = DatasetFactory.createConstraint('A03_ORCAMENTO', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array(c2)

    var dataset = DatasetFactory.getDataset("ds_cotacao_fretes_form_winthor", null, constraints, null);

    for (var i = 0; i < dataset.values.length; i++) {
        wdkAddChild('pedido');
        $("#codprod___" + newId).val(dataset.values[i].A07_COD_PROD);
        $("#descprod___" + newId).val(dataset.values[i].A08_PRODUTO);
        $("#qtd___" + newId).val(dataset.values[i].A09_QT);
        $("#pesouni___" + newId).val(dataset.values[i].A10_PESO_BRUTO_UNI);
        $("#pesotot___" + newId).val(dataset.values[i].A11_PESO_BRUTO_TOTAL)
        $("#altura___" + newId).val(dataset.values[i].A12_ALTURA);
        $("#largura___" + newId).val(dataset.values[i].A13_LARGURA);
        $("#compr___" + newId).val(dataset.values[i].A14_COMPRIMENTO);
        $("#volume___" + newId).val(dataset.values[i].A15_VOLUME);
    }

    calcularPesoTotal()
    // calcularCubagem()
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
}

function calcularPesoTotal() {
    const TABLE_ID = Array.from($(`[tablename]`))
    const PESO = ".peso:gt(0)"
    let pesoTotal = 0;

    TABLE_ID.forEach(el => {
        const TABLE = `#${el.id}`;
        const VALORES = Array.from($(TABLE).find(PESO));

        VALORES.forEach(element => {
            const valor = parseFloat(element.value);
            pesoTotal += valor
        });
    });

    const pesoElement = document.getElementById("pesoTotal")
    pesoElement.value = pesoTotal.toFixed(2)
}

// function calcularCubagem() {
//     const TABLE_ID = Array.from($(`[tablename]`));
//     const VALOR_TOTAL_SELECTOR = ".volume:gt(0)";
//     const PESO = ".peso:gt(0)"
//     let cubagemTotal = 0;
//     let pesoTotal = 0;

//     TABLE_ID.forEach(el => {
//         const TABLE = `#${el.id}`;
//         const VALORES_VOLUME = Array.from($(TABLE).find(VALOR_TOTAL_SELECTOR));

//         VALORES_VOLUME.forEach(volumeElement => {
//             const valor = parseFloat(volumeElement.value);
//             cubagemTotal += valor;
//         });
//     });

//     TABLE_ID.forEach(el => {
//         const TABLE = `#${el.id}`;
//         const VALORES_VOLUME = Array.from($(TABLE).find(PESO));

//         VALORES_VOLUME.forEach(volumeElement => {
//             const valor2 = parseFloat(volumeElement.value);
//             pesoTotal += valor2;
//         });
//     });

//     // Multiplica a cubagem total por mil
//     // cubagemTotal *= 1000;

//     const cubagemElement = document.getElementById("cubagem");
//     const pesoElement = document.getElementById("pesoTotal");
//     cubagemElement.value = cubagemTotal;
//     pesoElement.value = pesoTotal;

// }   