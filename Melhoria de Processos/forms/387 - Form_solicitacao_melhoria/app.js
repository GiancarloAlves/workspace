const EVENTO_INICIO = 3
const ANALISE_SUPERVISOR = 17
const ANALISE_TI = 4
const VALIDAR_SOLUCAO = 5

$(document).ready(() => {
    moment.locale("pt-br")

    taskHandler()
})

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            tratarPainel("abertura")
            break

        case ANALISE_SUPERVISOR:
            tratarPainel("analiseSup")
            break

        case ANALISE_TI:
            break

        case VALIDAR_SOLUCAO:
            // tratarPainel("fechamento")
            break
    }
}

async function starter() {
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    const VENDEDOR = parent.WCMAPI.getUser()

    $(`#matricula`).val(MATRICULA_VENDEDOR)
    $(`#solicitante`).val(VENDEDOR)

    try {
        const tipoSolicitante = await obterTipoSolicitante();
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

async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor
    const MATRICULA_SUPERVISOR = DADOS_ADICIONAIS.content.extData["Matricula_supervisor"]

    $(`#supervisorSolicitante`).val(SUPERVISOR)
    $(`#matSupervisor`).val(MATRICULA_SUPERVISOR)
}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"

    // return PAPEIS_USUARIO
    return PAPEIS_USUARIO.includes(ID_PAPEL) ? "Supervisor" : "Vendedor"
}

async function getDadosAdicionaisUser(user) {
    const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function tratarPainel(painel) {
    $('.panel-collapse').not(`#${painel}`).removeClass("in");
    $('.panel-collapse').not(`#${painel}`).addClass("blocked");
    // $('.panel-collapse').not(`#${painel}`).addClass("hide");
}