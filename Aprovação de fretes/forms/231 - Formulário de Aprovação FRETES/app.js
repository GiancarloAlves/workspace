const EVENTO_INICIO = 4
const APROVACAO = 5
const FINANCEIRO = 6
const CONFIRMACAO = 14


function taskHandler(){
    const TASK = Number(getWKNumState()) 
   
    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
        $(`#aprovacao`).addClass("blocked")
        $(`#financeiro`).addClass("blocked")
            break

        case APROVACAO: 
        $(`#abertura`).addClass("blocked")
        $(`#financeiro`).addClass("blocked")
            break

        case FINANCEIRO: 
        $(`#abertura`).addClass("blocked")
        $(`#aprovacao`).addClass("blocked")
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


