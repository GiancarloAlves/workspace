function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    //CONSTANTES GLOBAIS
    const EVENTO_INICIO = 2
    const CANHOTO = 42

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case CANHOTO:
            validarGestorCanhotos()
            break
    }

    function validarGestorCanhotos() {
        var obsCanhoto = form.getValue("obsCanhoto")

        if (obsCanhoto == "") {
            throw ("Deixe alguma observação!")
        }
    }


    function validarInicio() {

        var codCliente = form.getValue("codCliente");
        if (codCliente == "Selecione" || codCliente == null) {
            throw ("Escolha o código do cliente!");
        }

        var Cliente = form.getValue("cliente");
        if (Cliente == "" || Cliente == null) {
            throw ("Preencha o campo <strong>Cliente!</strong>");
        }

        var numNF = form.getValue("numNF");
        if (numNF == "" || numNF == null) {
            throw ("Preencha o campo <strong>Nota Fiscal!</strong>");
        }
    }
}