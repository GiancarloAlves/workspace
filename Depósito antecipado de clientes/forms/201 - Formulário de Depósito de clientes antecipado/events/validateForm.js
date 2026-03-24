function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 3
        const CREDITO = 4
        const VALIDAR = 11


    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
        case VALIDAR:
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        // case CREDITO: 
        //     validarCredito()
        //     break
    }

    function validarInicio() {

        var codCliente = form.getValue("codCliente");
        if(codCliente == "Selecione" || codCliente == null) {
            throw("Escolha o código do cliente ou o nome do cliente!");
        }
    
        var Cliente = form.getValue("cliente");
        if(Cliente == "" || Cliente == null) {
            throw("Escolha o código do cliente ou o nome do cliente!");
        }

        var banco = form.getValue("banco");
        if(banco == "" || banco == null) {
            throw("Informe o banco!");
        }

		var valor = form.getValue("valor");
        if(valor == "" || valor == null) {
            throw("Informe o valor!");
        }

		var agente = form.getValue("tipo");
        if(agente == "" || agente == null) {
            throw("Informe o tipo de depósito!");
        }

    }


    // function validarCredito() {


    // }

}