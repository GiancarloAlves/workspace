function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    //CONSTANTES GLOBAIS
    const EVENTO_INICIO = 2
    const TRATATIVA = 5
    const ACOMPANHAMENTO = 13

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            validarInicio();
            break

        case TRATATIVA:

            break

        case ACOMPANHAMENTO:

            break

    }

    function validarInicio() {

        var status = form.getValue("status");
        if (status == "Bloqueado") {
            throw ("Pedido está bloqueado. Não é possível iniciar a solicitação")
        }

        var numped = form.getValue("numped");
        if (numped == "" || numped == null) {
            throw ("Escolha o número do pedido!");
        }

        var dataHrentrega = form.getValue("dataHrReceb");
        if (dataHrentrega == "" || dataHrentrega == null) {
            throw ("Diga a data e hora que o cliente precisa receber a mercadoria!");
        }

        var fone = form.getValue("fone");
        if (fone == "" || fone == null) {
            throw ("Preencha o fone de contato do cliente");
        }

        var entrega = form.getValue("localEntrega");
        if (entrega == "" || entrega == null) {
            throw ("Preencha o local de entrega!");
        }

        var freteCobrado = form.getValue("freteCobrado")
        if (freteCobrado == "" || freteCobrado == null) {
            throw ('Preencha o campo "FRETE COBRADO NA NOTA?"')
        }

    }
}