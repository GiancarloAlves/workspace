function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");
  
  //VENDAS
  const EVENTO_INICIO = 4;
  const APROVACAO_SUPERVISOR = 9;

  //LOGISTICA
  const DEVOLUCAO = 18;
  const ROTAS = 26;

  //PÓS VENDA
  const VALIDACAO_APROVACAO = 11;
  const FINALIZACAO_AVALIACAO = 21;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case APROVACAO_SUPERVISOR:
      validarAprovacaoSupervisor();
      break;

    case DEVOLUCAO:
      validarDevolucao();
      break;

    case ROTAS:
      validarOrdemColeta();
      break;

    case VALIDACAO_APROVACAO:
      validarAprovacaoPosVenda();
      break;

    case FINALIZACAO_AVALIACAO:
      validarFinalizacao();
      break;
  }

  function validarInicio() {
    var cliente = form.getValue("cliente");
    var frete = form.getValue("freteConta");
    var codCliente = form.getValue("codCliente");
    var motivoDevolucao = form.getValue("motivoDevolucao");
    var numeroPedidoSubstituto = form.getValue("pedidoSubst");
    var custoEntrega = form.getValue("custoEntrega");
    var rdPossuiColeta = form.getValue("rdPossuiColeta");
    var credito = form.getValue("credito");

    if (custoEntrega == "Pedido substituto") {
      if (numeroPedidoSubstituto == "" || numeroPedidoSubstituto == null) {
        throw "Preencha o campo <strong>Número do pedido substituto!</strong>";
      }
    }

    if (cliente == "" || cliente == null) {
      throw "Preencha o campo <strong>Cliente!</strong>";
    }

    if (codCliente == "" || codCliente == null) {
      throw "Preencha o campo <strong>Código do cliente!</strong>";
    }

    if (motivoDevolucao == "" || motivoDevolucao == null) {
      throw "Preencha o campo <strong>Motivo da devolução!</strong>";
    }

    if (rdPossuiColeta == "" || rdPossuiColeta == null) {
      throw "Preencha o campo <strong>Possui coleta?</strong>";
    }

    if (rdPossuiColeta == "Sim") {
      var endColeta = form.getValue("endColeta");
      if (endColeta == "" || endColeta == null) {
        throw "Preencha o campo <strong>Endereço da coleta!</strong>";
      }
    }

    if (frete == "" || frete == null) {
      throw "Informe <strong>quem pagará o frete!</strong>";
    }

    if (credito == "" || credito == null) {
      throw "Informe <strong>como será o crédito!</strong>";
    }
    validarPaiFilho();
  }

  function validarPaiFilho() {
    var indexes = form.getChildrenIndexes("gridDevolucao");
    if (indexes.length > 0) {
      for (var i = 0; i < indexes.length; i++) {
        if (
          form.getValue("numeroNF___" + indexes[i]) == null ||
          form.getValue("numeroNF___" + indexes[i]) == ""
        ) {
          throw "Preencha o campo <strong>N da NF!<strong>";
        }

        if (
          form.getValue("codProduto___" + indexes[i]) == null ||
          form.getValue("codProduto___" + indexes[i]) == ""
        ) {
          throw "Preencha o campo <strong>Cód. Produto!</strong>";
        }

        if (
          form.getValue("descProduto___" + indexes[i]) == null ||
          form.getValue("descProduto___" + indexes[i]) == ""
        ) {
          throw "Preencha o campo <strong>Desc. do produto!</strong>";
        }

        if (
          form.getValue("qtdeDevolvida___" + indexes[i]) == null ||
          form.getValue("qtdeDevolvida___" + indexes[i]) == ""
        ) {
          throw "Preencha o campo <strong>Qtde. devolvida!</strong>";
        }
      }
    } else {
      throw "<strong>Adicione ao menos um item!</strong>";
    }
  }

  function validarAprovacaoSupervisor() {
      var rdAprovaSup = form.getValue("rdAprovaSup");
      if (rdAprovaSup == "" || rdAprovaSup == null) {
        throw "Preencha o campo <strong>Aprovar solicitação?</strong>";
      }
  }

  function validarDevolucao() {
    var nfEntradaRecebimento = form.getValue("nfEntradaRecebimento");
    var boxRecebimento = form.getValue("boxRecebimento");
    var recebimentoOk = form.getValue("recebimentoOk");

    if (nfEntradaRecebimento == "" || nfEntradaRecebimento == null) {
      throw "Preencha o campo <strong>N NF entrada</strong>";
    }

    if (boxRecebimento == "" || boxRecebimento == null) {
      throw "Preencha o campo <strong>Box</strong>";
    }

    if (recebimentoOk == "" || recebimentoOk == null) {
      throw "Preencha o campo <strong>Recebimento OK?</strong>";
    }
  }

  function validarAprovacaoPosVenda() {
    var rdAprovaPosVenda = form.getValue("rdAprovaPosVenda");
    var origemProblema = form.getValue("origemProblema");
    var ordemColeta = form.getValue("ordemColeta");

    if (rdAprovaPosVenda == "" || rdAprovaPosVenda == null) {
      throw "Preencha o campo <strong>Aprovar solicitação?</strong>";
    }

    if (origemProblema == "" || origemProblema == null) {
      throw "Preencha o campo <strong>Origem do problema</strong>";
    }

    if (ordemColeta == "" || ordemColeta == null) {
      throw "Preencha o campo <strong>Ordem de coleta</strong>";
    }
  }

  function validarOrdemColeta() {
    var numRotaRomaneio = form.getValue("numRotaRomaneio");

    if (numRotaRomaneio == "" || numRotaRomaneio == null) {
      throw "Preencha o campo <strong>Número de Rota/Romaneio</strong>";
    }
  }

  function validarFinalizacao() {
    var acertoCredito = form.getValue("acertoCredito");

    if (acertoCredito == "" || acertoCredito == null) {
      throw "Preencha o campo <strong>Acerto de crédito</strong>";
    }
  }
}
