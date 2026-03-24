function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")
    const EVENTO_INICIO = 24
    const COMPRAS = 116
    const LIBERACAO_PEDIDO = 31
    const ACERTO_CREDITO = 58
    const REALIZAR_DEVOLUCAO = 51
    const REVISAR_DEVOLUCAO = 53
    const REALIZAR_RECEBIMENTO = 27
    const CONFIRMAR_RECEBIMENTO = 55
    const CRIAR_ROTEIRO = 76

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case COMPRAS:
            validarCompras()
            break

        case LIBERACAO_PEDIDO:
            validarLiberacao()
            break

        case ACERTO_CREDITO:
            validarAcertoCredito()
            break

        case CRIAR_ROTEIRO:
            validarRoteiro()
            break

        case REALIZAR_RECEBIMENTO:
            validarRealizarRecebimento()
            break

        case REVISAR_DEVOLUCAO:
            validarRevisarDevolucao()
            break

        case REALIZAR_DEVOLUCAO:
            validarDevolucao()
            break


        case CONFIRMAR_RECEBIMENTO:
            validarConfirmarRecebimento()
            break
    }

    function validarInicio() {
        var cliente = form.getValue("cliente")
        if (cliente == "" || cliente == null) {
            throw ("Preencha o campo <strong>Cliente!</strong>")
        }

        var responsCred = form.getValue("responsCred")
        if (responsCred == "" || responsCred == null) {
            throw ("O campo <strong>Responsável pelo crédito</strong> está vazio, Liste a NF para continuar!")
        }

        var codCliente = form.getValue("codCliente")
        if (codCliente == "" || codCliente == null) {
            throw ("Preencha o campo <strong>Código do cliente!</strong>")
        }

        var localCliente = form.getValue("localCliente")
        if (localCliente == "" || localCliente == null) {
            throw ("Preencha o campo <strong>Onde está o cliente?</strong>")
        }

        var rdPossuiColeta = form.getValue("rdPossuiColeta")
        if (localCliente == "Na Cigame (balcão)") {
            if (rdPossuiColeta == "" || rdPossuiColeta == null) {
                throw ("Preencha o campo <strong>Possui coleta?</strong>")
            }
        }

        if (rdPossuiColeta == "Sim") {
            var endColeta = form.getValue("endColeta")
            if (endColeta == "" || endColeta == null) {
                throw ("Preencha o campo <strong>Endereço da coleta!</strong>")
            }
        }

        var rdEmiteNFDev = form.getValue("rdEmiteNFDev")
        if (rdEmiteNFDev == "" || rdEmiteNFDev == null) {
            throw ("Preencha o campo <strong>Cliente emite NF de Devolução?</strong>")
        }

        validarPaiFilho()
    }

    function validarLiberacao() {
        var liberarPedido = form.getValue("liberarPedido")
        if (liberarPedido == "" || liberarPedido == null) {
            throw ("Preencha o campo <strong>liberar Pedido</strong>!")
        }
    }

    function validarCompras() {
        var aprovacaoCompras = form.getValue("aprovacaoCompras")
        var obsCompras = form.getValue("obsCompras")

        if (aprovacaoCompras == "" || aprovacaoCompras == null) {
            throw ("Preencha o campo <strong>Itens possuem garantia?</strong>!")
        }

        if (aprovacaoCompras == 'nao') {
            if (obsCompras == '' || obsCompras == null) {
                throw ("Deixe uma  <strong>observação</strong> sobre a solicitação!")
            }
        }
    }

    function validarAcertoCredito() {
        var acertoCredito = form.getValue("acertoCredito")
        if (acertoCredito == "" || acertoCredito == null) {
            throw ("Preencha o campo <strong>Acerto Credito</strong>!")
        }
    }

    function validarRoteiro() {
        var dataSaida = form.getValue("dataSaida")
        if (dataSaida == "" || dataSaida == null) {
            throw ("Preencha o campo <strong>Data saída do caminhão</strong>!")
        }

        var veiculo = form.getValue("veiculo")
        if (veiculo == "" || veiculo == null) {
            throw ("Preencha o campo <strong>Placa</strong>!")
        }

        var rota = form.getValue("rota")
        if (rota == "" || rota == null) {
            throw ("Preencha o campo <strong>Rota</strong>!")
        }
    }

    function validarRealizarRecebimento() {
        var materialChegou = form.getValue("materialChegou")
        var obsChegadaMaterial = form.getValue("obsChegadaMaterial")

        if (materialChegou == "" || materialChegou == null) {
            throw ("Preencha o campo <strong>Recebimento ok?</strong>")
        }

        if (materialChegou == "nao") {
            if (obsChegadaMaterial == "" || obsChegadaMaterial == null) {
                throw ("Deixa uma <strong>observação do estado do material!</strong>")
            }
        }
    }

    function validarRevisarDevolucao() {
        var devolucaoRevisada = form.getValue("devolucaoRevisada")
        var codProdutoDiver = form.getValue("codProdutoDiver")
        var qtd_recebido = form.getValue("qtd_recebido")
        var qtd_esperada = form.getValue("qtd_esperada")

        if (devolucaoRevisada == "" || devolucaoRevisada == null) {
            throw ("Preencha o campo <strong>Devolução revisada</strong>!")
        }

        if (devolucaoRevisada == "divergencia") {
            if (codProdutoDiver == '' || codProdutoDiver == null) {
                throw ("Preencha o campo <strong>Código do Produto</strong>!")
            }

            if (qtd_recebido == '' || qtd_recebido == null) {
                throw ("Preencha o campo <strong>Quantidade que chegou</strong>!")

            }

            if (qtd_esperada == '' || qtd_esperada == null) {
                throw ("Preencha o campo <strong>Quantidade que deveria ter vindo</strong>!")

            }

            throw ("Deixa um observação sobre a <strong>Divergência</strong>!")
        }
    }

    function validarDevolucao() {
        var conferenteRecebimento = form.getValue("conferenteRecebimento")
        if (conferenteRecebimento == "" || conferenteRecebimento == null) {
            throw ("Preencha o campo <strong>Conferente</strong>!")
        }

        var boxRecebimento = form.getValue("boxRecebimento")
        if (boxRecebimento == "" || boxRecebimento == null) {
            throw ("Preencha o campo <strong>BOX</strong>!")
        }

        var nfEntradaRecebimento = form.getValue("nfEntradaRecebimento")
        if (nfEntradaRecebimento == "" || nfEntradaRecebimento == null) {
            throw ("Preencha o campo <strong>NF de entrada</strong>!")
        }

        var recebimentoOk = form.getValue("recebimentoOk")
        if (recebimentoOk == '' || recebimentoOk == null) {
            throw ("Preencha o campo <strong>Recebimento Ok?</strong>!")
        }
    }

    function validarConfirmarRecebimento() {
        var coletaReprovada = form.getValue("coletaReprovada")
        if (coletaReprovada == "" || coletaReprovada == null) {
            throw ("Preencha o campo <strong>Material deu entrada?</strong>!")
        }

        var obsMaterialParado = form.getValue("obsMaterialParado")
        if (coletaReprovada == "Não") {
            if (obsMaterialParado == "" || obsMaterialParado == null) {
                throw ("Deixa uma observação sobre a entrada do material!")
            }
        }
    }

    function validarPaiFilho() {
        var indexes = form.getChildrenIndexes("gridDevolucao")
        if (indexes.length > 0) {
            for (var i = 0; i < indexes.length; i++) {
                if (form.getValue("numeroNF___" + indexes[i]) == null || form.getValue("numeroNF___" + indexes[i]) == "") {
                    throw "Preencha o campo <strong>N da NF!<strong>"
                }

                if (form.getValue("codProduto___" + indexes[i]) == null || form.getValue("codProduto___" + indexes[i]) == "") {
                    throw "Preencha o campo <strong>Cód. Produto!</strong>"
                }

                if (form.getValue("descProduto___" + indexes[i]) == null || form.getValue("descProduto___" + indexes[i]) == "") {
                    throw "Preencha o campo <strong>Desc. do produto!</strong>"
                }

                if (form.getValue("qtdeDevolvida___" + indexes[i]) == null || form.getValue("qtdeDevolvida___" + indexes[i]) == "") {
                    throw "Preencha o campo <strong>Qtde. devolvida!</strong>"
                }

                // if(form.getValue("especialmentePedido___" + indexes[i]) == null || form.getValue("especialmentePedido___" + indexes[i]) == "") {
                //     throw "Preencha o campo <strong>O produto foi comprado especialmente para o pedido?!</strong>"
                // }

                // if(form.getValue("especialmentePedido___" + indexes[i]) == null || form.getValue("especialmentePedido___" + indexes[i]) == "") {
                //     throw "Preencha o campo <strong>O produto foi comprado especialmente para o pedido?</strong>"
                // }

                // if(form.getValue("produtoDDD___" + indexes[i]) == null || form.getValue("produtoDDD___" + indexes[i]) == "") {
                //     throw "Preencha o campo <strong>Produto é DDD?</strong>"
                // }
            }
        }
        else {
            throw ("<strong>Adicione ao menos um item!</strong>")
        }
    }
}