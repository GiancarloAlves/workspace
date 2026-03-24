// CONSTANTES GLOBAIS
const EVENTO_INICIO = 3
const ALTERACAO = 4


async function starter() {

    const MATRICULA_USUARIO = parent.WCMAPI.getUserCode()
    const USUARIO = parent.WCMAPI.getUser()

    $(`#matricula`).val(MATRICULA_USUARIO)
    $(`#usuario`).val(USUARIO)
    const FILTRO = 'MATRICULA,' + document.getElementById('matricula').value;

    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)

    try {
        const tipoSolicitante = await obterTipoSolicitante();
        console.log(tipoSolicitante);

        if (tipoSolicitante === "Usuário") {
            console.log("USUÁRIO COMUM")
            // COLOCAR ALGUMA CONDIÇÃO
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

async function minhaFuncaoPrincipal() {

}


function taskHandler() {

    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            starter()
            dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: `Após preencher os dados, é necessário anexar o orçamento em PDF!` })
            $(`#cadastro`).addClass("blocked")
            break

        case ALTERACAO:
            $(`#dadoscliente`).addClass("blocked")
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
})

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
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

        case `cliente`:
            window["cod_cliente"].setValue(selectedItem.CODCLI)
            reloadZoomFilterValues(`cod_cliente`, `CODCLI,${selectedItem.CODCLI}`)
            reloadZoomFilterValues(`numNF`, `A01_CODCLI,${selectedItem.CODCLI}`)
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
            break

        case `cliente`:
            window["cod_cliente"].clear()
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

    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC || papel == ID_PAPELD) ? "Supervisor" : "Usuário";
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

function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 5000
    })
}