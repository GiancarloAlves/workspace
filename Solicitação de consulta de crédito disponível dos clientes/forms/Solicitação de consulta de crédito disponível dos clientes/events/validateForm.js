function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")

    const EVENTO_INICIO = 4
    const INFORMACOES_ADICIONAIS = 14

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case INFORMACOES_ADICIONAIS:
            validarInfos()
            break
    }

    function validarInicio() {
        var codCliente = form.getValue("codClient")
        var maisInfos = form.getValue("maisInfos")
        var obsInfos = form.getValue("obsInfos")

        if (codCliente == "" || codCliente == null) {
            throw ("Insira o código do cliente")
        }

        if (maisInfos == "" || maisInfos == null) {
            throw ("O campo 'Deseja mais alguma informação?' não foi preenchido!")
        }

        if (maisInfos == "Sim") {
            if (obsInfos == "" || obsInfos == null) {
                throw ("Descreva quais informações adicionais você deseja!")
            }
        }
    }

    function validarInfos() {
        var obsCadastro = form.getValue("obsCadastro")

        if (obsCadastro == "") {
            throw ("Você precisa enviar uma resposta para a requisição das informações adicionais!")
        }
    }
}