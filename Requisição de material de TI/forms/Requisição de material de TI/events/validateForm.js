function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    var EVENTO_INICIO = 4
    var APROVACAO_SUPERVISOR = 5
    var REVISAO_ENTREGA = 14
    var REVISAO_RECEBIMENTO = 19

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case APROVACAO_SUPERVISOR: 
            validarAprovacaoSupervisor()
            break

        case REVISAO_ENTREGA: 
            validarRevisaoEntrega()
            break

        case REVISAO_RECEBIMENTO: 
            validarRevisaoRecebimento()
            break     
    }

    function validarInicio() {

        var material = form.getValue("material");
        if(material == "Selecione" || material == null) {
            throw("Preencha o campo <strong>material!</strong>");
        }

        var motivo = form.getValue("motivo");
        if(motivo == "Selecione" || motivo == null) {
            throw("Escolha o motivo!");
        }
    
        var datainicial = form.getValue("datainicial");
        if(datainicial == "" || datainicial == null) {
            throw("Preencha o campo <strong>Data inicial!</strong>");
        }

        var datafinal = form.getValue("datafinal");
        if(datafinal == "" || datafinal == null) {
            throw("Preencha o campo <strong>Data final!</strong>");
        }
      
    }

    function validarAprovacaoSupervisor() {
        var rdAprovaSup = form.getValue("rdAprovaSup");
        if(rdAprovaSup == "" || rdAprovaSup == null) {
            throw("Preencha o campo de avaliação/reprovação!");
        }
    }


    function validarRevisaoEntrega() {
        var revisaoentrega = form.getValue("revisaoentrega");
        if(revisaoentrega == "" || revisaoentrega == null) {
            throw("Preencha o campo de avaliação do material!");
        }
    }

    function validarRevisaoRecebimento() {
        var revisaodevolucao = form.getValue("revisaodevolucao");
        if(revisaodevolucao == "" || revisaodevolucao == null) {
            throw("Preencha o campo <strong>de revisão da devolução!</strong>");
        }
    }

}