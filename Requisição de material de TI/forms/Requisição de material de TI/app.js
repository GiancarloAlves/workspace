const EVENTO_INICIO = 4
const APROVACAO_SUPERVISOR = 5
const REVISAO_ENTREGA = 14
const REVISAO_RECEBIMENTO = 19


async function starter() {
    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#vendedor`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

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
    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC) ? "Supervisor" : "Vendedor";
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
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function taskHandler(){
    const TASK = Number(getWKNumState()) 
    console.log(TASK) 


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            starter()
            esconderPaineis()
            $(`#aprovacao-supervisor`).addClass("blocked")   
            break

        case APROVACAO_SUPERVISOR: 
            $(`#aprovacao-supervisor`).show()
            $(`#abertura`).parent().addClass("blocked")
            $(`#recebimento`).hide()   
            $(`#entrega`).hide()   
            break

        case REVISAO_ENTREGA: 
            $(`#abertura`).parent().addClass("blocked")
            $(`#aprovacao-supervisor`).parent().addClass("blocked")
            $(`#entrega`).show() 
            $(`#recebimento`).hide()     
            break

        case REVISAO_RECEBIMENTO:
            mostrarTodasSecoes()
            $(`#abertura`).parent().addClass("blocked")
            $(`#aprovacao-supervisor`).parent().addClass("blocked")
            $(`#entrega`).parent().addClass("blocked")
            $(`#recebimento`).show()  
   
            break
    }




}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}

$(document).ready(() => {
    moment.locale("pt-br")
    
    taskHandler()

        // Habilita ou desabilita zoom endereço de coleta
    $(`[material]`).on("change", e => {
        const EL = $(e.target).parent().next()
        e.target.value == "Outro material (preencher o campo abaixo)" ? EL.removeClass("blocked") : EL.addClass("blocked")
        console.log(EL)
    })
})


