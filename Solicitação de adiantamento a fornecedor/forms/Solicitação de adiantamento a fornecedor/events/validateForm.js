function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 4
        const ESTORNO = 13

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case ESTORNO: 
            validarCP()
            break
    }

    function validarInicio() {

        var codCliente = form.getValue("codForn");
        if(codCliente == "Selecione" || codCliente == null) {
            throw("Escolha o código do cliente!");
        }
    
        var Cliente = form.getValue("fornecedor");
        if(Cliente == "" || Cliente == null) {
            throw("Preencha o campo <strong>Cliente!</strong>");
        }

        var valor = form.getValue("valor");
        if(valor == "" || valor == null) {
            throw("Preencha o campo <strong>Valor!</strong>");
        }

        var modalidade = form.getValue("modalidade");
        var pix = form.getValue("pix");
        var tipopix = form.getValue("tipopix");
        var conta = form.getValue("conta");
        var agencia = form.getValue("agencia");
        var cnpj = form.getValue("cnpj")
        var nf = form.getValue("numOC")

        if(modalidade == "Selecione" || modalidade == null) {
            throw("<strong>Selecione uma modalidade!</strong>");
        }        

        if (modalidade =="Pix"){
            if (pix == ""|| pix == null || tipopix == ""|| tipopix == null){
                throw("Digite as informações do pix!");
            }                   
        }

        if (modalidade =="TED/DOC") {
            if (conta == ""|| conta == null || agencia == ""|| agencia == null|| cnpj == ""|| cnpj == null){
                throw("Digite as informações de agência e conta!");
            }
        }
            

    }
    function validarCP() {
        var obscp = form.getValue("obscp");
        if(obscp == "" || obscp == null) {
            throw("Faça algum comentário!");
        }
    }

}