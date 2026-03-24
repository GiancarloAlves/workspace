function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")

    const EVENTO_INICIO = 4
    const APROVACAO_GERENTE = 5
    const CONTAS_A_PAGAR = 6
    // const CONFIRMACAO = 14

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case APROVACAO_GERENTE:
            validarAprovacaoGerente()
            break

        case CONTAS_A_PAGAR:
            contasApagar()
            break

    }

    function validarInicio() {
        var fornecedor = form.getValue("Fornecedor")
        var numeroDoc = form.getValue("NroDoc")

        if (fornecedor == "" || fornecedor == null) {
            throw ("Insira um fornecedor!")
        }

        if (numeroDoc == "" || numeroDoc == null) {
            throw ("Insira um número do documento!")
        }
    }

    function validarAprovacaoGerente() {
        var aprov_sup = form.getValue("aprov_sup")

        if (aprov_sup == '' || aprov_sup == null) {
            throw ("Você deve aprovar ou reprovar a solicitação!")
        }
    }

    function contasApagar() {
        var esclarecimento = form.getValue("clareza")

        if (esclarecimento == "") {
            throw ("Você precisa dar o destino da solicitação!")
        }
    }


}