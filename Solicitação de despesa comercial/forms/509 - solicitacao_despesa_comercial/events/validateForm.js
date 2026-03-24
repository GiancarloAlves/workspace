function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 4
        const ESTORNO = 5
        const CREDITO = 13

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case ESTORNO: 
        var gerente = form.getValue("AprovGerente");
        if (gerente === "") {
            throw "Aprove ou reprove a solicitação!!";
        }   
            break

        case CREDITO: 
        var cp = form.getValue("AprovCP");
        if (cp === "") {
            throw "Diga se o valor corresponde ao parovado!!";
        }  
            break
    }

    function validarInicio() {

        var valor = form.getValue("valor");
        if (valor === "") {
            throw "Escolha um valor!";
        }        
    
        var TipoDespesa = form.getValue("TipoDespesa");
        if (TipoDespesa === "") {
            throw "Escolha um tipo de despesa!";
        }

        var valor = form.getValue("valor");
        if(valor == "" || valor == null) {
            throw("Preencha o campo <strong>Valor!</strong>");
        }

        var DataInicial = form.getValue("DataInicial");
        if (DataInicial === "") {
            throw "Escolha uma data inicial!";
        }

        var DataFinal = form.getValue("DataFinal");
        if (DataFinal === "") {
            throw "Escolha uma data final!";
        }

        var modalidade = form.getValue("modalidade");
        var pix = form.getValue("pix");
        var tipopix = form.getValue("tipopix");
        var conta = form.getValue("conta");
        var agencia = form.getValue("agencia");
        var cnpj = form.getValue("cnpj")
        var icartao = form.getValue("iniciocartao");
        var fcartao = form.getValue("fimcartao")

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
            
        if (modalidade =="Cartão de crédito") {
            if (icartao == ""|| icartao == null || fcartao == ""|| fcartao == null){
                throw("Digite as informações do cartão!!");
            }         
        }

    }
    function validarCP() {
        var obscp = form.getValue("obscp");
        if(obscp == "" || obscp == null) {
            throw("Faça algum comentário!");
        }
    }

    function validarCredito() {
        var obscredito = form.getValue("obscredito");
        if(obscredito == "" || obscredito == null) {
            throw("Faça algum comentário!");
        }
    }

}


// var valor = form.getValue("valor");
// var vendedor = form.getValue("vendedor");
// var TipoDespesa = form.getValue("TipoDespesa");
// var DataInicial = form.getValue("DataInicial");
// var DataFinal = form.getValue("DataFinal");
// var codCliente = form.getValue("codCliente");
// var cliente = form.getValue("cliente");
// var modalidade = form.getValue("modalidade");
// var conta = form.getValue("conta");
// var agencia = form.getValue("agencia");
// var cnpj = form.getValue("cnpj");
// var codbanco = form.getValue("codbanco");
// var pix = form.getValue("pix");
// var tipopix = form.getValue("tipopix");
// var iniciocartao = form.getValue("iniciocartao");
// var fimcartao = form.getValue("fimcartao");
// var obsvendedor = form.getValue("obsvendedor");