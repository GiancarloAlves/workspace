function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    validarInicio()

    // CONSTANTES GLOBAIS
    const EVENTO_INICIO = 4
    const TRATATIVA = 7
    const ESCLARECIMENTO = 14
    const GERENTE = 38
    const FIM = 16 //ESSE FUNCIONA

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case TRATATIVA:
            break

        case ESCLARECIMENTO:
            break

        case GERENTE:

            break

        case FIM:

            break

    }

    function validarInicio() {

        var problema = form.getValue("solicitacao");
        if (problema == "" || problema == null) {
            throw ("Diga qual o problema que necessita de atendimento!");
        }
        if (problema == "NÃO CONSIGO COMPLETAR SOLICITAÇÃO" || problema == "ITEM/NF NÃO APARECE") {
            var numNF = form.getValue("numNF");
            var codcli = form.getValue("cod_cliente")
            var cliente = form.getValue("cliente")
            if (numNF == "" || codcli == "" || cliente == "") {
                throw ("Insira os dados de NF e cliente!");
            }
        }


    }

    function validarCompra() {

        var rastreio = form.getValue("rastreio");
        if (rastreio == "nao") {
            throw ("Aplicado rastreio foi marcado como não!");
        }
    }

    function validarRecebimento() {

        var recebimento = form.getValue("recebido");
        if (recebimento == "nao") {
            throw ("Aplicado rastreio foi marcado como não!");
        }
    }

    function validarRemocao() {

        var remocao = form.getValue("remove_rast");
        if (remocao == "nao") {
            throw ("Removido rastreio foi marcado como não!");
        }
    }

    function validarLiberacao() {
        var liberacao = form.getValue("status2");
        if (liberacao != "Liberado") {
            throw ("O pedido está " + liberacao + ", mas deve estar liberado para o processo continuar.");
        }
    }

    function validarFim() {
        var pedido = form.getValue("numped");
        var pedido2 = form.getValue("pedido2");

        if (pedido != pedido2) {
            throw ("O pedido que originou esta NF não é o mesmo que originou a solicitação!");
        }
    }

}