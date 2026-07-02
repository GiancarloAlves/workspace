function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  //CONSTANTES GLOBAIS
  const EVENTO_INICIO = 4;
  const APROVACAO_GERENTE_VENDAS = 23;
  const ESTORNO = 5;
  const CREDITO = 13;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case APROVACAO_GERENTE_VENDAS:
      validarAprovacaoGerente();
      break;

    case ESTORNO:
      validarContasAPagar();
      break;

    case CREDITO:
      break;
  }

  function validarAprovacaoGerente() {
    var aprovacao = form.getValue("aprovacaoGerente");
    if (aprovacao == "Selecione" || aprovacao == "" || aprovacao == null) {
      throw "Informe a aprovação do gerente!";
    }

    var observacao = form.getValue("obsAprovacaoGerente");
    if (observacao == "" || observacao == null) {
      throw "Preencha a observação da aprovação do gerente!";
    }
  }

  function validarInicio() {
    var codCliente = form.getValue("codCliente");
    if (codCliente == "Selecione" || codCliente == null) {
      throw "Escolha o código do cliente!";
    }

    var Cliente = form.getValue("cliente");
    if (Cliente == "" || Cliente == null) {
      throw "Preencha o campo <strong>Cliente!</strong>";
    }

    var valor = form.getValue("valor");
    if (valor == "" || valor == null) {
      throw "Preencha o campo <strong>Valor!</strong>";
    }

    var motivo = form.getValue("Motivo");
    if (motivo == "" || motivo == null) {
      throw "Preencha o campo <strong>Motivo!</strong>";
    }

    var modalidade = form.getValue("modalidade");
    var pix = form.getValue("pix");
    var tipopix = form.getValue("tipopix");
    var conta = form.getValue("conta");
    var agencia = form.getValue("agencia");
    var cnpj = form.getValue("cnpj");
    var icartao = form.getValue("iniciocartao");
    var fcartao = form.getValue("fimcartao");
    var nf = form.getValue("numNF");

    if (modalidade == "Selecione" || modalidade == null) {
      throw "<strong>Selecione uma modalidade!</strong>";
    }

    if (modalidade == "Pix") {
      if (pix == "" || pix == null || tipopix == "" || tipopix == null) {
        throw "Digite as informações do pix!";
      }
    }

    if (modalidade == "TED/DOC") {
      if (
        conta == "" ||
        conta == null ||
        agencia == "" ||
        agencia == null ||
        cnpj == "" ||
        cnpj == null
      ) {
        throw "Digite as informações de agência e conta!";
      }
    }

    if (modalidade == "Cartão de crédito") {
      if (
        icartao == "" ||
        icartao == null ||
        fcartao == "" ||
        fcartao == null
      ) {
        throw "Digite as informações do cartão!!";
      }
    }
  }
  function validarCP() {
    var obscp = form.getValue("obscp");
    if (obscp == "" || obscp == null) {
      throw "Faça algum comentário!";
    }
  }

  function validarContasAPagar() {
    var obscp = form.getValue("obscp");
    if (obscp == "" || obscp == null) {
      throw "Faça algum comentário!";
    }
  }
}
