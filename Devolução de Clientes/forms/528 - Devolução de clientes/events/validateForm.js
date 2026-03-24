function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");
  var EVENTO_INICIO = 9;
  var APROVACAO_SUPERVISOR = 13;
  var AJUSTAR_DEVOLUCAO = 57;
  var APROVACAO_GERENTE_VENDAS = 20;
  var AVALIACAO_GERENTE_VENDAS = 129;
  var ALTERACAO_COBRANCA = 29;
  var REALIZAR_COLETA = 33;
  var REALIZAR_RECEBIMENTO = 35;
  var CONFIRMAR_COLETA = 88;
  var REVISAR_DEVOLUCAO = 45;
  var RECEBIMENTO_AJUSTADO = 51;
  var ACERTO_CREDITO = 43;
  var DECISAO_GERENTE = 108;
  var APLICAR_ACAO = 67;
  var CONFIRMAR_DEVOLUCAO = 69;
  var ANALISAR_DEVOLUCAO = 106;
  var CRIAR_ROTEIRO = 111;
  var COMPRAS = 124;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case APROVACAO_SUPERVISOR:
      validarAprovacaoSupervisor();
      validarNFdeDevolucao();
      break;

    case AJUSTAR_DEVOLUCAO:
      validarAjustarDevolucao();
      break;

    case APROVACAO_GERENTE_VENDAS:
      validarAprovacaoGerenteVendas();
      break;

    case ALTERACAO_COBRANCA:
      // validarAlteracaoCobranca()
      break;

    case REALIZAR_COLETA:
      validarRealizarColeta();
      break;

    case REALIZAR_RECEBIMENTO:
      validarRealizarRecebimento();
      break;

    case CONFIRMAR_COLETA:
      validarConfrimarColeta();
      break;

    case REVISAR_DEVOLUCAO:
      validarRevisarDevolucao();
      break;

    case RECEBIMENTO_AJUSTADO:
      // validarRecebimentoAjustado()
      break;

    case ACERTO_CREDITO:
      // validarAcertoCredito()
      break;

    case DECISAO_GERENTE:
      // validarDecisaoGerente()
      break;

    case APLICAR_ACAO:
      validarAcao();
      break;

    case CONFIRMAR_DEVOLUCAO:
      // validarConfirmarDevolucao()
      break;

    case ANALISAR_DEVOLUCAO:
      // validarAnalisarDevolucao()
      break;

    case AVALIACAO_GERENTE_VENDAS:
      validarAvaliacaoGerenteVendas();
      break;

    case CRIAR_ROTEIRO:
      validarCriarRoteiro();
      break;

    case COMPRAS:
      validarCompras();
  }

  function validarInicio() {
    var cliente = form.getValue("cliente");
    var frete = form.getValue("freteConta");
    var codCliente = form.getValue("codCliente");
    var motivoDevolucao = form.getValue("motivoDevolucao");
    var localCliente = form.getValue("localCliente");
    var rdPossuiColeta = form.getValue("rdPossuiColeta");
    var credito = form.getValue("credito");

    if (cliente == "" || cliente == null) {
      throw "Preencha o campo <strong>Cliente!</strong>";
    }

    if (codCliente == "" || codCliente == null) {
      throw "Preencha o campo <strong>Código do cliente!</strong>";
    }

    if (motivoDevolucao == "" || motivoDevolucao == null) {
      throw "Preencha o campo <strong>Motivo da devolução!</strong>";
    }

    if (localCliente == "" || localCliente == null) {
      throw "Preencha o campo <strong>Onde está o cliente?</strong>";
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

    // var rdLigarCliente = form.getValue("rdLigarCliente");
    // if (rdLigarCliente == "" || rdLigarCliente == null) {
    //     throw ("Preencha o campo <strong>Ligar para o cliente para acertar o crédito?</strong>");
    // }

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

        // if(form.getValue("especialmentePedido___" + indexes[i]) == null || form.getValue("especialmentePedido___" + indexes[i]) == "") {
        //     throw "Preencha o campo <strong>O produto foi comprado especialmente para o pedido?!</strong>";
        // }

        // if(form.getValue("especialmentePedido___" + indexes[i]) == null || form.getValue("especialmentePedido___" + indexes[i]) == "") {
        //     throw "Preencha o campo <strong>O produto foi comprado especialmente para o pedido?</strong>";
        // }

        // if(form.getValue("produtoDDD___" + indexes[i]) == null || form.getValue("produtoDDD___" + indexes[i]) == "") {
        //     throw "Preencha o campo <strong>Produto é DDD?</strong>";
        // }
      }
    } else {
      throw "<strong>Adicione ao menos um item!</strong>";
    }
  }

  function validarAprovacaoSupervisor() {
    var itemReprovado = form.getValue("itemReprovado");
    if (itemReprovado == "Não") {
      var rdAprovaSup = form.getValue("rdAprovaSup");
      if (rdAprovaSup == "" || rdAprovaSup == null) {
        throw "Preencha o campo <strong>Aprovar solicitação?</strong>";
      }
      if (rdAprovaSup == "Não") {
        var obsSuperv = form.getValue("obsSuperv");
        if (obsSuperv == "" || obsSuperv == null) {
          throw "Escreva no campo de observação o motivo da reprovação!";
        }
      }
    }
  }

  function validarNFdeDevolucao() {
    var rdEmiteNFDevSup = form.getValue("rdEmiteNFDevSup");

    if (rdEmiteNFDevSup == "" || rdEmiteNFDevSup == null) {
      throw "Preencha o campo <strong>IE sem NF de devolução?</strong>";
    }
  }

  function validarAvaliacaoGerenteVendas() {
    var rdCompras = form.getValue("rdCompras");
    if (rdCompras == "" || rdCompras == null) {
      throw "Preencha o campo <strong>Necessita avaliação do compras?</strong>";
    }

    if (rdCompras == "Não") {
      var rdAprovaGerenteVendas = form.getValue("rdAprovaGerenteVendas");
      if (rdAprovaGerenteVendas == "" || rdAprovaGerenteVendas == null) {
        throw "Preencha o campo <strong>Aprovar solicitação?</strong>";
      }
      if (rdAprovaGerenteVendas == "Não") {
        var obslog = form.getValue("obslog");
        if (obslog == "" || obslog == null) {
          throw "Escreva no campo de observação porque está devolvendo a solicitação para o vendedor!";
        }
      }
    }
  }

  function validarAprovacaoGerenteVendas() {
    var rdCompras = form.getValue("rdCompras");
    if (rdCompras == "" || rdCompras == null) {
      throw "Preencha o campo <strong>Necessita avaliação do compras?</strong>";
    }

    if (rdCompras == "Não") {
      var rdAprovaGerente = form.getValue("rdAprovaGerente");
      if (rdAprovaGerente == "" || rdAprovaGerente == null) {
        throw "Preencha o campo <strong>Aprovar solicitação?</strong>";
      }
      if (rdAprovaGerente == "Não") {
        var obsGerente = form.getValue("obsGerente");
        if (obsGerente == "" || obsGerente == null) {
          throw "Escreva no campo de observação o motivo da reprovação!";
        }
      }
    }
  }

  function validarRealizarRecebimento() {
    var recebimentoOk = form.getValue("recebimentoOk");
    if (recebimentoOk == "" || recebimentoOk == null) {
      throw "Preencha o campo <strong>Recebimento ok?</strong>";
    }
  }

  function validarRevisarDevolucao() {
    var devolucaoRevisada = form.getValue("devolucaoRevisada");
    if (devolucaoRevisada == "" || devolucaoRevisada == null) {
      throw "Preencha o campo <strong>Devolução revisada</strong>";
    }
  }

  function validarAcao() {
    var aplicadoRegistro = form.getValue("aplicadoRegistro");
    if (aplicadoRegistro == "" || aplicadoRegistro == null) {
      throw "Preencha o campo <strong>Aplicação da penalidade foi registrada?</strong>";
    }
  }

  function validarRealizarColeta() {
    var avalColeta = form.getValue("avalColeta");
    if (avalColeta == "" || avalColeta == null) {
      throw "Preencha o campo <strong>Material ok na coleta?</strong>";
    }
  }

  function validarAjustarDevolucao() {
    var rdContinuarDevolucao = form.getValue("rdContinuarDevolucao");
    if (rdContinuarDevolucao == "" || rdContinuarDevolucao == null) {
      throw "Preencha o campo <strong>Continuar devolução?</strong>";
    }
  }

  function validarConfrimarColeta() {
    var coletaReprovada = form.getValue("coletaReprovada");
    if (coletaReprovada == "" || coletaReprovada == null) {
      throw "Preencha o campo <strong>Continuar devolução?</strong>";
    }
    if (coletaReprovada == "Sim") {
      var obsMaterial = form.getValue("obsMaterialParado");
      if (obsMaterial == "" || obsMaterial == null) {
        throw "Você marcou que o material chegou. Faça alguma observação para a logística. Se o material não chegou ainda, não envie a solicitação para a logística.";
      }
    }
  }

  function validarCriarRoteiro() {
    var dataSaida = form.getValue("dataSaida");
    if (dataSaida == "" || dataSaida == null) {
      throw "Preencha o campo <strong>Data de saída</strong>";
    }

    var placa = form.getValue("veiculo");
    if (placa == "" || placa == null) {
      throw "Preencha o campo <strong>Placa do veículo!</strong>";
    }

    var rota = form.getValue("rota");
    if (rota == "" || rota == null) {
      throw "Preencha o campo <strong>Rota/Romaneio!</strong>";
    }
  }

  function validarCompras() {
    var obscompras = form.getValue("observacaoCompras");
    if (obscompras == "" || obscompras == null) {
      throw "<strong>O campo de observação do setor de compras está vazio!</strong>";
    }
  }
}
