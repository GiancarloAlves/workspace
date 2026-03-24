function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const AVALIACAO = 13
const CONFIRMACAO = 5
const EFETIVACAO = 44


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case AVALIACAO:
            validarAvaliacao()
            break

    }

    function validarInicio() {

        var nome = form.getValue("nome");
        if(nome == "" || nome == null) {
            throw("Informe o nome!");
        }

        var setor = form.getValue("setor");
        if(setor == "" || setor == null) {
            throw("Informe o setor!");
        }
    
       var cargo = form.getValue("cargo");
        if(cargo == "" || cargo == null) {
            throw("Informe o cargo!");
        }

        var datainicio = form.getValue("datainicio");
        if(datainicio == "" || datainicio == null) {
            throw("Informe a data de início!!");
        }
    }

    function validarAvaliacao() {   

        var tipo = form.getValue("tipoContrato")

        if (tipo == "quarenta"){
        var acao = form.getValue("acao");
        if(acao == "" || acao == null) {
            throw("Informe o contrato será prorrogado ou rescindido!");
        }        
    }                   

        if (tipo == "oitenta"){
        var acao_fim = form.getValue("acaofim");
        if(acao_fim == "" || acao_fim == null) {
            throw("Informe se o contrato será efetivado ou rescindido!");
        }
    }

}

}