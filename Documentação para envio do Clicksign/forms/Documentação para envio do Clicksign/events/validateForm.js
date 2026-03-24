function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 3

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

    }

    function validarInicio() {

        var codcliente = form.getValue("cod_cliente");
        if(codcliente == "" || codcliente == null) {
            throw("Escolha um código de cliente ou cliente!");
        }
    
        var nome = form.getValue("nomecompleto");
        if(nome == "" || nome == null) {
            throw("Digite o nome completo!");
        }
        
		var email = form.getValue("email");
        if(email == "" || email == null) {
            throw("Digite um e-mail para envio da documentação!");
        }

    }
}