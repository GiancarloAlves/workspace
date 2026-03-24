function validateForm(form) {

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    // CONSTANTES GLOBAIS
    const EVENTO_INICIO = 4
    const APROVACAO_SUPERVISOR = 22
    const APROVACAO_GERENTE = 33
    const DEVOLUCAO = 5
    const LIBERACAO = 60
    const FATURAMENTO = 62
    const ANEXAR_CANHOTO = 7
    const FINANCEIRO = 8
    const CORRECAO = 45

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
        case CORRECAO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case APROVACAO_SUPERVISOR:
            validarSupervisor()
            break

        case APROVACAO_GERENTE:
            validarGerente()
            break

        case DEVOLUCAO:
            validarEmissao()
            break

        case LIBERACAO:
            validarLiberacao()
            break

        case FATURAMENTO:
            validarFaturamento()
            break

        case ANEXAR_CANHOTO:
            break

        case FINANCEIRO:
            validarFinanceiro()
            break
    }

    function validarInicio() {

        var num = form.getValue("numNF");
        if (num == "") {
            throw ("Informe o campo com o númeo da NF!");
        }

        var numped = form.getValue("numped");
        if (numped == "") {
            throw ("Informe o número do pedido!");
        }

        var MotivoCancelam = form.getValue("MotivoCancelam");
        if (MotivoCancelam == "") {
            throw ("Informe o motivo da troca!");
        }

        var transportadora = form.getValue("codtransp");
        if (transportadora != "5555") {
            throw ("Transportadora do pedido precisa ser 5555! A transportadora selecionada foi" + transportadora);
        }

    }

    function validarSupervisor() {

        var aprovSupervisor = form.getValue("aprovSupervisor");
        if (aprovSupervisor == "") {
            throw ("Selecione a opção de 'Aprovar solicitação'!");
        }

        if (aprovSupervisor == "Não") {
            var obsSupervisor = form.getValue("obsSupervisor");
            if (obsSupervisor == "") {
                throw ("Diga porque reprovou a solicitação!");
            }
        }
    }

    function validarGerente() {

        var aprovGerente = form.getValue("aprovGerente");
        if (aprovGerente == "") {
            throw ("Selecione a opção de aprovação da solicitação!");
        }

        if (aprovGerente == "Não") {
            var obsGerente = form.getValue("obsGerente");
            if (obsGerente == "") {
                throw ("Diga porque reprovou a solicitação");
            }
        }
    }

    function validarEmissao() {

        var numNFent = form.getValue("numNFent");
        if (numNFent == "") {
            throw ("Informe o campo 'Número NF de entrada!");
        }


        var clareza = form.getValue("clareza");
        if (clareza == "") {
            throw ("Selecione a opção de 'Dados estão corretos?'");
        }

        if (clareza == "Não") {
            var obsLog = form.getValue("obsLog");
            if (obsLog == "") {
                throw ("Informe quais dados precisam ser corrigidos ou o que está errado com a solicitação!");
            }
        }
    }

    function validarLiberacao() {

        var liberacao = form.getValue("status");
        if (liberacao == "B") {
            throw ("O pedido está " + liberacao + ", mas deve estar pendente ou liberado para o processo continuar.");
        }
    }

    function validarFaturamento() {

        var numNFsaida = form.getValue("numNFsaida");
        if (numNFsaida == "") {
            throw ("Informe o campo 'Número NF de saída!");
        }

    }

    function validarLogistica() {

        var numNFsaida = form.getValue("numNFsaida");
        if (numNFsaida == "") {
            throw ("Informe o campo 'Número NF de saída!");
        }
    }

    function validarFinanceiro() {

        var dadosok = form.getValue("dadosok");
        if (dadosok == "") {
            throw ("Selecione a opção de 'Dados estão corretos?'");
        }

        if (dadosok == "Não") {

            var destinoSolic = form.getValue("destinoSolic");
            if (destinoSolic == "") {
                throw ("Selecione o 'Destino da solicitação'!");
            }

            var obsFin = form.getValue("obsFin");
            if (obsFin == "") {
                throw ("Informe qual o erro no campo de observação!");
            }
        }
    }

    // function validarPaiFilhoA() {
    //     var indexes = form.getChildrenIndexes("tabcadastro");
    //     if(indexes.length > 0) {
    //         for(var i = 0; i < indexes.length; i++) { 

    //             if(form.getValue("produto___" + indexes[i]) == null || form.getValue("produto___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna Nome do produto!</strong>"; }

    //             if(form.getValue("codmarca___" + indexes[i]) == null || form.getValue("codmarca___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna Referência da Marca!</strong>"; }

    //             if(form.getValue("marca___" + indexes[i]) == null || form.getValue("marca___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna Marca!</strong>"; }

    //             if(form.getValue("preco___" + indexes[i]) == null || form.getValue("preco___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna Preço!</strong>"; }                

    //             if(form.getValue("ipi___" + indexes[i]) == null || form.getValue("ipi___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna IPI%!</strong>"; }

    //             if(form.getValue("st___" + indexes[i]) == null || form.getValue("st___" + indexes[i]) == "") {
    //                 throw "<strong>Preencha a coluna ST%!</strong>"; }

    //                     }
    //     }
    //     else {
    //         throw("<strong>Adicione ao menos um item!</strong>");
    //     }
    // }
}