function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    // CONSTANTES GLOBAIS
    const EVENTO_INICIO = 4
    const COTACAO = 5
    const APROVACAO_GERENTE = 13
    const CORRECAO = 11
    const NOTIFICACAO = 15

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
        case CORRECAO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case COTACAO:
            validarCotacao()
            break

        case APROVACAO_GERENTE:
            validarGerente()
            break


    }

    function validarInicio() {
        var pedido = form.getValue("numped");

        if (pedido == "" || pedido == null) {
            throw ("Informe o número do orçamento!");
        }
    }

    function validarCotacao() {
        var freteTotal = form.getValue("freteTotal");
        var obsLogistica = form.getValue("obslog")

        if (freteTotal == "" || freteTotal == null) {
            throw ("Informe o valor do frete!");
        }

        if (obsLogistica == "" || obsLogistica == null) {
            throw ("O campo de observação não pode ficar em branco!");
        }
    }

    function validarGerente() {
        var obsgerente = form.getValue("obsreaval");
        var aprovacaoFrete = form.getValue("aprovacaoFrete")

        if (obsgerente == "" || obsgerente == null) {
            throw ("Faça algum comentário a respeito da solicitação!");
        }

        if (aprovacaoFrete == "") {
            throw ("Você precisa aprovar ou reprovar a solicitação!");
        }

    }

}