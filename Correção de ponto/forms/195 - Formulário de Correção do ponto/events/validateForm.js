function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 4
        const AJUSTE_RH = 9
        const APROVACAO = 14


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            validarInicio();
            break

        case APROVACAO: 
            break

        case AJUSTE_RH: 
            validarAjuste()
            break


    }

    function validarInicio() {

        var data = form.getValue("data_hora_marc");
        if(data == "" || data == null) {
            throw "Preencha o campo DATA E HORA DA MARCAÇÃO ESQUECIDA!";
        }
    
        var justif = form.getValue("justificativa");
        if (justif == "" || justif == null) {
          throw "Preencha o campo JUSTIFICATIVA!";
        }      
    }

    function validarAjuste(){
        var datamod = form.getValue("marc_modificada");
        if(datamod == "" || datamod == null) {
            throw "Preencha o campo MARCAÇÃO MODIFICADA!";
        }

    }

}