const EVENTO_INICIO = 4
const AJUSTE_RH = 9
const APROVACAO = 14


async function starter() {

    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const SOLICITANTE = parent.WCMAPI.getUser()
    const MATRICULA_SOLICITANTE = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#solicitante`).val(SOLICITANTE)
    $(`#matSolicitante`).val(MATRICULA_SOLICITANTE)

}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"
    const ID_PAPELA = "GERENTE_DE_COMPRAS"
    const ID_PAPELB = "GERENTE_DE_VENDAS"
    const ID_PAPELC = "GERENTE_DE_LOGISTICA"
//    const ID_PAPELD = "admin"

    // return PAPEIS_USUARIO.includes(ID_PAPEL||ID_PAPELA||ID_PAPELB||ID_PAPELC) ? "Supervisor" : "Vendedor"
    // return PAPEIS_USUARIO.includes(ID_PAPELA) ? "Supervisor" : "Vendedor"
    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC ) ? "Supervisor" : "Usuário comum";
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
   
    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            starter()
            esconderPaineis()
            break

        case AJUSTE_RH: 
            $(`#aprovacao`).show()
            $(`#abertura`).show()
            recolherPainel(`#aprovacao`)
            break

        case APROVACAO: 
            recolherPainel(`#alteracao`) 
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

})

function recolherPainel(painel) {
    $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente
  
    $(painel).on('show.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
  }

async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor
    const MATRICULA_SUPERVISOR = DADOS_ADICIONAIS.content.extData["Matricula_supervisor"]

    if (SUPERVISOR == null || SUPERVISOR == "") {
        $(`#supervisorSolicitante`).val("n/a");
      } else {
        $(`#supervisorSolicitante`).val(SUPERVISOR);
      }

        $(`#matSupervisor`).val(MATRICULA_SUPERVISOR);

const TESTE = document.getElementById('matSupervisor').value
console.log(TESTE)
}

// function dadosUsuario (){
    
//     const MATRICULA = document.getElementById('matSolicitante').value;

//     var c1 = DatasetFactory.createConstraint('MATRICULA', MATRICULA, MATRICULA, ConstraintType.MUST);
//     var constraints = new Array (c1)

//     var dataset = DatasetFactory.getDataset("ds_consulta_usuarios_winthor", null, constraints, null);

//     $(`#matSupervisor`).val(selectedItem.A16_COBRANCA)
//     $(`#supervisorSolicitante`).val(selectedItem.A20_COD_FORNEC_FRETE)
//     // $(`#enderecoCompleto`).val(selectedItem.A24_ENDERECO)
// }

