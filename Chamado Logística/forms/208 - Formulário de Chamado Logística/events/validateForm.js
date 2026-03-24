function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    const EVENTO_INICIO = 3
    const RESPOSTA_LOG = 9
    const RESPOSTA_ESTOQUE = 4
    const RESPOSTA_RECEBIMENTO = 16
    const RESPOSTA_FATURAMENTO = 17
    const RESPOSTA_SEPARACAO = 28
    const FINALIZACAO_SOLICITANTE = 40
    const RESPOSTA_ENTREGAS_VIA_AUTO = 79
    const RESPOSTA_ENTREGAS_LEOMAR = 81
    const RESPOSTA_ENTREGAS = 83

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case RESPOSTA_ENTREGAS_VIA_AUTO:
            validarEntregasViaAuto()
            break

        case RESPOSTA_ENTREGAS_LEOMAR:
            validarEntregasLeomar()
            break

        case RESPOSTA_ESTOQUE:
            validarEstoque()
            break

        case RESPOSTA_RECEBIMENTO:
            validarRecebimento()
            break

        case RESPOSTA_ENTREGAS:
            validarEntregas()
            break

        case RESPOSTA_FATURAMENTO:
            validarFaturamento()
            break

        case RESPOSTA_SEPARACAO:
            validarSeparacao()
            break

        case RESPOSTA_LOG:
            validarGerencia()
            break

        case FINALIZACAO_SOLICITANTE:
            validarObservacao()
            break
    }

    function validarInicio() {
        var tipoSolicitacao = form.getValue("tipo_solic")
        var descricaoSolicitacao = form.getValue("descricaoSolicitacao")
        var codCliente = form.getValue("codCliente")
        var numPed = form.getValue("numPed")
        var numNF = form.getValue("numNF")
        var nomeTransp = form.getValue("nomeTransp")
        var codItem = form.getValue("codItem")
        var nomeFornec = form.getValue("nomeFornec")

        if (descricaoSolicitacao == "" || descricaoSolicitacao == null) {
            throw ("Descreva a solicitação!")
        }

        if (tipoSolicitacao == 'Liberação de item bloqueado') {
            if (codItem == "" || codItem == null) {
                throw ("Informe o código do item")
            }

            if (nomeFornec == "" || nomeFornec == null) {
                throw ("Informe o nome do fornecedor")
            }
        }

        if (tipoSolicitacao == 'Resolução de ocorrências' || tipoSolicitacao == 'NF foi expedida?' || tipoSolicitacao == 'atrasoEntrega') {
            if (numNF == "" || numNF == null) {
                throw ("Informe o Número da NF")
            }
        }

        if (tipoSolicitacao == 'Inventariar item' || tipoSolicitacao == 'Cortar Item' || tipoSolicitacao == 'Demonstração de produto') {
            if (codItem == "" || codItem == null) {
                throw ("Informe o código do item")
            }
        }

        if (tipoSolicitacao == 'Embarque após horário de corte' || tipoSolicitacao == 'Trocar transportadora') {
            if (codCliente == "" || codCliente == null) {
                throw ("Informe o código do cliente")
            }

            if (numPed == "" || numPed == null) {
                throw ("Informe o número do pedido")
            }

            if (nomeTransp == "" || nomeTransp == null) {
                throw ("Informe o nome da transportadora")
            }
        }

        if (tipoSolicitacao == 'Item em vermelho') {
            if (codItem == "" || codItem == null) {
                throw ("Informe o código do Item")
            }

            if (numPed == "" || numPed == null) {
                throw ("Informe o número do pedido")
            }
        }

        if (tipoSolicitacao == 'Cancelar Pedido' || tipoSolicitacao == 'Embarque pedidos' || tipoSolicitacao == 'Enviar brinde') {
            if (codCliente == "" || codCliente == null) {
                throw ("Informe o código do cliente")
            }

            if (numPed == "" || numPed == null) {
                throw ("Informe o número do pedido")
            }
        }

        if (tipoSolicitacao == 'atrasoEntrega') {
            if (codCliente == "" || codCliente == null) {
                throw ("Informe o código do cliente")
            }
        }
    }

    function validarEntregasViaAuto() {
        var descricaoEntregasViaAuto = form.getValue("descricaoEntregasViaAuto")

        if (descricaoEntregasViaAuto == "" || descricaoEntregasViaAuto == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarEntregasLeomar() {
        var descricaoEntregasLeomar = form.getValue("descricaoEntregasLeomar")

        if (descricaoEntregasLeomar == "" || descricaoEntregasLeomar == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarEstoque() {
        var descricaoEstoque = form.getValue("descricaoEstoque")

        if (descricaoEstoque == "" || descricaoEstoque == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarRecebimento() {
        var descricaoRecebimento = form.getValue("descricaoRecebimento")

        if (descricaoRecebimento == "" || descricaoRecebimento == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarEntregas() {
        var descricaoEntregas = form.getValue("descricaoEntregas")

        if (descricaoEntregas == "" || descricaoEntregas == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarFaturamento() {
        var descricaoFaturamento = form.getValue("descricaoFaturamento")

        if (descricaoFaturamento == "" || descricaoFaturamento == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarSeparacao() {
        var descricaoSeparacao = form.getValue("descricaoSeparacao")

        if (descricaoSeparacao == "" || descricaoSeparacao == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarGerencia() {
        var descricaoGerencia = form.getValue("descricaoGerencia")

        if (descricaoGerencia == "" || descricaoGerencia == null) {
            throw ("Você precisa detalhar sua resposta no campo 'Resposta da solicitação'!")
        }
    }

    function validarObservacao() {
        var observacao = form.getValue("observacao")

        if (observacao == "" || observacao == null) {
            throw ("Você precisa deixar uma observação sobre a demanda!")
        }
    }
}