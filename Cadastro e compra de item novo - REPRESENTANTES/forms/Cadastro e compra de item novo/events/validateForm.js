function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  // CONSTANTES GLOBAIS
  const EVENTO_INICIO = 3;
  const CADASTRO = 20;
  const COLOCACAO_PEDIDO = 73;
  const COMPRA = 37;
  const FOLLOW = 81;
  const RECEBIMENTO = 10;
  const LIBERACAO_RASTREIO = 75;
  const LIBERACAO_PEDIDO = 85;
  const FIM = 87;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
        validarPaiFilhoA();
      }
      break;

    case CADASTRO:
      validarPaiFilhoB();
      break;

    case COLOCACAO_PEDIDO:
      validarPedido();
      break;

    case COMPRA:
      validarPedido();
      validarCompraMaterial();

      break;

    case FOLLOW:
      // validarFollow()
      validarPaiFilhoC();
      break;

    case RECEBIMENTO:
      break;

    case LIBERACAO_RASTREIO:
      validarRemocao();
      break;

    case LIBERACAO_PEDIDO:
      validarLiberacaoPed();
      break;

    case FIM:
      validarFim();
      break;
  }

  function validarInicio() {}

  function validarCompraMaterial() {
    var continuarCompra = form.getValue("continuarCompra");
    var obsCompra = form.getValue("obsCompra");
    var ordemDeCompra = form.getValue("mainOC");

    if (
      continuarCompra == "nao" ||
      ordemDeCompra == null ||
      ordemDeCompra == ""
    ) {
      if (obsCompra == null || obsCompra == "") {
        throw "Deixe uma observação sobre a compra!";
      }
    }
  }

  function validarPedido() {
    var pedido = form.getValue("numped");
    if (pedido == "") {
      throw "Informe um número de pedido!";
    }

    var liberacao = form.getValue("status");
    if (liberacao != "Liberado") {
      if (liberacao != "Pendente") {
        throw (
          "O pedido está " +
          liberacao +
          ", mas deve estar liberado ou pendente para o processo continuar."
        );
      }
    }

    var codfornec = form.getValue("status");
    if (codfornec == "") {
      if (codfornec != "Pendente") {
        throw (
          "O pedido está " +
          liberacao +
          ", mas deve estar liberado ou pendente para o processo continuar."
        );
      }
    }
  }

  function validarRemocao() {
    var remocao = form.getValue("remove_rast");
    if (remocao == "nao") {
      throw "Você marcou que o rastreio não foi removido!";
    }
  }

  function validarLiberacaoPed() {
    var liberacao = form.getValue("status2");
    if (liberacao != "Liberado" && liberacao != "Pendente") {
      throw (
        "O pedido está " +
        liberacao +
        ", mas deve estar liberado ou pendente para o processo continuar."
      );
    }
  }

  function validarFim() {
    var nf = form.getValue("numNF");
    if (nf == "") {
      throw "Escolha uma NF";
    }

    var pedido = form.getValue("numped");
    var pedido2 = form.getValue("pedido2");
    if (pedido != pedido2) {
      throw "Só é possível continuar quando a NF escolhida tiver sido originada do pedido que iniciou a compra";
    }
  }

  function validarPaiFilhoA() {
    var indexes = form.getChildrenIndexes("tabcadastro");
    if (indexes.length > 0) {
      for (var i = 0; i < indexes.length; i++) {
        if (
          form.getValue("produto___" + indexes[i]) == null ||
          form.getValue("produto___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna Nome do produto!</strong>";
        }

        if (
          form.getValue("refMarca___" + indexes[i]) == null ||
          form.getValue("refMarca___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna Referência da Marca!</strong>";
        }

        if (
          form.getValue("marca___" + indexes[i]) == null ||
          form.getValue("marca___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna Marca!</strong>";
        }

        if (
          form.getValue("ncm___" + indexes[i]) == null ||
          form.getValue("ncm___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna NCM!</strong>";
        }

        /*
        if (
          form.getValue("preco___" + indexes[i]) == null ||
          form.getValue("preco___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna Preço!</strong>";
        }

        if (
          form.getValue("ipi___" + indexes[i]) == null ||
          form.getValue("ipi___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna IPI%!</strong>";
        }

        if (
          form.getValue("st___" + indexes[i]) == null ||
          form.getValue("st___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna ST%!</strong>";
        }

        if (
          form.getValue("icms___" + indexes[i]) == null ||
          form.getValue("icms___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a coluna ICMS!</strong>";
        }

        if (
          form.getValue("dataNec___" + indexes[i]) == null ||
          form.getValue("dataNec___" + indexes[i]) == ""
        ) {
          throw "<strong>Diga a data que necessita o produto!</strong>";
        }
          */
      }
    } else {
      throw "<strong>Adicione ao menos um item!</strong>";
    }
  }

  function validarPaiFilhoB() {
    var indexes = form.getChildrenIndexes("tabcadastro");
    var obsCompra = form.getValue("observacaoComprador");

    if (indexes.length > 0) {
      for (var i = 0; i < indexes.length; i++) {
        if (
          form.getValue("codprod___" + indexes[i]) == null ||
          (form.getValue("codprod___" + indexes[i]) == "" &&
            form.getValue("dadosCorretos") == "Sim")
        ) {
          throw "<strong>Preencha todos os códigos de produto!</strong>";
        }
      }
    }

    if (form.getValue("dadosCorretos") == "Não" && obsCompra.length <= 0) {
      throw "<strong>Preencha o campo de observação!</strong>";
    }
  }

  function validarPaiFilhoC() {
    var indexes = form.getChildrenIndexes("tabcadastro");
    if (indexes.length > 0) {
      for (var i = 0; i < indexes.length; i++) {
        if (
          form.getValue("prevCheg___" + indexes[i]) == null ||
          form.getValue("pprevCheg___" + indexes[i]) == ""
        ) {
          throw "<strong>Preencha a previsão de chegada!</strong>";
        }
      }
    }
  }
}
