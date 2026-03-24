function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    //CONSTANTES GLOBAIS
    const EVENTO_INICIO = 4
    const AJUSTE_RH = 6
    const APROVACAO = 5


    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case APROVACAO:
            break

        case AJUSTE_RH:
            validarAjuste()
            break

    }

    function validarInicio() {

        var datasaida = form.getValue("data_saida");
        if (datasaida == "" || datasaida == null) {
            throw "Preencha o campo DATA E HORA DA SAÍDA!";
        }

        var justif = form.getValue("data_retorno");
        if (justif == "" || justif == null) {
            throw "Preencha o campo DATA E HORA DE RETORNO!!";
        }
    }

    function validarAjuste() {

        var saidareal = form.getValue("confsaida_rh");
        if (saidareal == "" || saidareal == null) {
            throw "Preencha o campo DATA E HORA DA SAÍDA!";
        }

        var retorno = form.getValue("conf_retorno_rh");
        if (retorno == "" || retorno == null) {
            throw "Preencha o campo DATA E HORA DE RETORNO!!";
        }

    }

}