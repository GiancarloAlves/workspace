function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  const EVENTO_INICIO = 3;
  const COMPRADOR_RESPONSAVEL = 4;
  const ACAO_RECEBIMENTO = 13;
  const FOLLOWUP = 15;
  const ACAO_NO_ESTOQUE = 17;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case COMPRADOR_RESPONSAVEL:
      validarCompradorResponsavel();
      break;

    case ACAO_RECEBIMENTO:
      validarAcaoRecebimento();
      break;

    case FOLLOWUP:
      validarFollowup();
      break;

    case ACAO_NO_ESTOQUE:
      validarAcaoEstoque();
      break;
  }

  function validarInicio() {
    var codfornec = form.getValue("codfornec");
    if (codfornec == "" || codfornec == null) {
      throw "Preencha o campo Cod. fornecedor!";
    }

    var fornecedor = form.getValue("fornecedor");
    if (fornecedor == "" || fornecedor == null) {
      throw "Preencha o campo Fornecedor!";
    }

    var comprador = form.getValue("comprador");
    if (comprador == "" || comprador == null) {
      throw "Preencha o campo Comprador!";
    }

    var matcomprador = form.getValue("matcomprador");
    if (matcomprador == "" || matcomprador == null) {
      throw "Preencha o campo Mat. comprador!";
    }

    var motivoDevolucao = form.getValue("motivo");
    if (motivoDevolucao == "" || motivoDevolucao == null) {
      throw "Selecione o Motivo da devolução!";
    }
  }

  function validarCompradorResponsavel() {
    var acaoComprador = form.getValue("acaoComprador");
    if (acaoComprador == "" || acaoComprador == null) {
      throw "Preencha o campo Ação comprador";
    }
  }

  function validarAcaoRecebimento() {
    var acaoRecebimento = form.getValue("acaoRecebimento");
    if (acaoRecebimento == "" || acaoRecebimento == null) {
      throw "Preencha o campo Ação do recebimento";
    }
  }

  function validarFollowup() {
    var confirmaMercadoria = form.getValue("confirmaMercadoria");
    if (confirmaMercadoria == "" || confirmaMercadoria == null) {
      throw "Preencha o campo 'Mercadoria já chegou?'";
    }
  }

  function validarAcaoEstoque() {
    var ultimaAcaoRecebimento = form.getValue("ultimaAcaoRecebimento");
    if (ultimaAcaoRecebimento == "" || ultimaAcaoRecebimento == null) {
      throw "Preencha o campo 'Ação recebimento'";
    }
  }
}
