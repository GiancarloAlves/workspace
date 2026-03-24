function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  //CONSTANTES GLOBAIS
  const EVENTO_INICIO = 7;
  const TRATATIVA_PRIMA = 9;
  const DEVOLUCAO = 79;
  const TRATATIVA_SEGUNDA = 41;
  const REFATURAMENTO = 98;
  const PEDIDO_SUBSTITUTO = 101;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case TRATATIVA_PRIMA:
      validarTrativa();
      break;

    case REFATURAMENTO:
      validarRefaturamento();

      break;

    case DEVOLUCAO:
      validarDevolucao();
      break;

    case PEDIDO_SUBSTITUTO:
      validarPedidoSubstituto();
      break;

    case TRATATIVA_SEGUNDA:
      validarSegTratativa();
      break;
  }

  function validarInicio() {
    var nota = form.getValue("numNF");
    if (nota == "" || nota == null) {
      throw "Informe o número da nota!";
    }

    var pessoa = form.getValue("PessoaCliente");
    if (pessoa == "" || pessoa == null) {
      throw "Diga o nome da pessoa que fez a reclamação!";
    }

    var telefone = form.getValue("ContTelefonico");
    if (telefone == "" || telefone == null) {
      throw "Preencha o contato telefônico";
    }

    var tipo = form.getValue("motivoDevolucao");
    if (tipo == "Selecione" || tipo == null) {
      throw "Informe o motivo da reclamação!";
    }

    var setor = form.getValue("setorTranstorno");
    if (setor == "Selecione" || setor == null) {
      throw "Informe o setor que está causando o problema.";
    }

    var modo = form.getValue("modoReclamacao");
    if (modo == "Selecione" || modo == null) {
      throw "Informe o meio pelo qual o cliente manifestou a reclamação.";
    }

    var ocorrencia = form.getValue("DescrOcorrencia");
    if (ocorrencia == "" || ocorrencia == null) {
      throw "Descreva a ocorrência";
    }
  }

  function validarRefaturamento() {
    var trativaRefaturamento = form.getValue("ObsRefaturamento");
    if (trativaRefaturamento == "" || trativaRefaturamento == null) {
      throw "Campo Tratativa refaturamento está em branco!";
    }
  }

  function validarPedidoSubstituto() {
    var numeroPedidoSubstituto = form.getValue("numeroPedidoSubstituto");
    if (numeroPedidoSubstituto == "" || numeroPedidoSubstituto == null) {
      throw "Informe o número do pedido substituto";
    }
  }

  function validarTrativa() {
    var pq = form.getValue("PqReclamacao");
    if (pq == "" || pq == null) {
      throw "Descreva porque foi gerada a reclamação";
    }

    var tipo = form.getValue("responsavelProblema");
    if (tipo == "Selecione" || tipo == null) {
      throw "Informe o responsável pela ocorrência!";
    }

    var solucao = form.getValue("SolucaoReclamac");
    if (solucao == "" || solucao == null) {
      throw "Descreva a solução";
    }

    var devolucao = form.getValue("devolucao");
    if (devolucao == "" || devolucao == null) {
      throw "Escolha se o vendedor deve abrir devolução ou não!";
    }
  }

  function validarSegTratativa() {
    var segunda = form.getValue("SolucaoReclamac2");
    if (segunda == "" || segunda == null) {
      throw "Descreva a solução";
    }
  }

  function validarDevolucao() {
    var subprocesso = form.getValue("subprocesso");
    if (subprocesso == "" || subprocesso == null) {
      throw "Escolha se vai querer abrir o processo de devolução ou não!";
    }

    if (subprocesso == "Não") {
      var obsdevolucao = form.getValue("ObsDevolucao");
      if (obsdevolucao == "" || obsdevolucao == null) {
        throw "Diga porque a devolução não deve ser aberta";
      }
    }
  }
}
