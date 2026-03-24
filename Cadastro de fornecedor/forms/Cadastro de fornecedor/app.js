// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const COMPRAS = 5
const FIM = 17
const CORRECAO = 24

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    const SOLICITANTE = parent.WCMAPI.getUser()

    $(`#matricula`).val(MATRICULA_VENDEDOR)
    $('#solicitante').val(SOLICITANTE)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            updateLED("led_abertura", true)
            starter();
            recolherPainel('#abertura')
            $('#abertura').addClass("in")
            $('#correcao').attr('hidden', true);
            $('#compras').addClass("blocked")
            $('#fim').addClass("blocked")
            break

        case COMPRAS:
            updateLED("led_compras", true)
            recolherPainel('#compras')
            $('#abertura').addClass("in")
            $(`#fim`).val("sim")
            $('#fim').addClass("blocked")

            break

        case CORRECAO:
            updateLED("led_abertura", true)
            $('#correcao').removeAttr('hidden');
            $('#compras').addClass("blocked")
            $('#fim').addClass("blocked")
            break

        case FIM:
            updateLED("led_fim", true)
            $('#correcao').removeAttr('hidden');
            $('#compras').addClass("blocked")
    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(2)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

$(document).ready(() => {
    moment.locale("pt-br")

    taskHandler()
})

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

async function starter() {

    try {
        const tipoSolicitante = await obterTipoSolicitante();
        console.log(tipoSolicitante);

        if (tipoSolicitante === "Vendedor") {

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

function formatarCNPJ(CNPJ) {
    console.log(CNPJ)
    return CNPJ ? CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ""
}