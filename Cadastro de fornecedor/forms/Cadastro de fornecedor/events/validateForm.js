function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")

    //CONSTANTES GLOBAIS
    const EVENTO_INICIO = 4
    const COMPRAS = 5


    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case COMPRAS:
            validarCadastro()
            break

    }

    function validarInicio() {
        var cnpj = form.getValue("cnpj")
        var fone = form.getValue("fone")
        var email = form.getValue("email")
        var cadastro = form.getValue("cadastro")
        var contFinanceiro = form.getValue("contFinanceiro")
        var inscrEstadual = form.getValue("inscrEstadual")
        var cep = form.getValue("cep")

        if (cnpj == "" || cnpj == null) {
            throw ("Escolha um CNPJ válido!")
        }

        if (fone == "" || fone == null) {
            throw ("Digite o telefone do contato!")
        }

        if (email == "" || email == null) {
            throw ("informe o e-mail!")
        }

        if (cadastro == "" || cadastro == null) {
            throw ("Preencha o nome de cadastro comercial!")
        }

        if (contFinanceiro == "" || contFinanceiro == null) {
            throw ("Informe o nome do contato financeiro!")
        }

        if (inscrEstadual == "" || inscrEstadual == null) {
            throw ("Informe a Inscrição Estadual!")
        }

        if (cep == "" || cep == null) {
            throw ("Informe o CEP!")
        }
    }

    function validarCadastro() {

        var aprovacao = form.getValue("aprovacao")
        if (aprovacao == "nao") {
            var obscompras = form.getValue("obs_compras")
            if (obscompras == "") {
                throw ("Você informou que os dados não estão corretos. Informe no campo de observação quais dados precisam ser corrigidos!")
            }
        }

        var codigo = form.getValue("codigo")
        if (codigo == "" || codigo == null) {
            throw ("Preencha o código cadastrado!")
        }
    }

}