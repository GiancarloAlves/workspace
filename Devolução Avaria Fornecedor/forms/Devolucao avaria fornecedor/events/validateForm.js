function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  // CONSTANTES GLOBAIS
  const EVENTO_INICIO = 4;
  const SEPARACAO = 13;
  const EMBARQUE = 19;
  const CREDITO = 23;
  const STANDBY = 21;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case SEPARACAO:
      validarSeparacao();
      validarPaiFilhoWMS();
      break;

    case EMBARQUE:
      validarEmbarque();
      break;

    case CREDITO:
      validarCredito();
      break;

    case STANDBY:
      break;
  }

  function validarInicio() {
    // Variáveis da seção Dados do fornecedor
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

    var pessoa = form.getValue("pessoa");
    if (pessoa == "" || pessoa == null) {
      throw "Preencha o campo Pessoa que foi tratada a devolução!";
    }

    var motivoDevolucao = form.getValue("motivoDevolucao");
    if (motivoDevolucao == "" || motivoDevolucao == null) {
      throw "Selecione o Motivo da devolução!";
    }

    var telefone = form.getValue("telefone");
    if (telefone == "" || telefone == null) {
      throw "Preencha o campo Telefone da pessoa!";
    }

    var email = form.getValue("email");
    if (email == "" || email == null) {
      throw "Preencha o campo E-mail da pessoa!";
    }

    // Variáveis da seção Dados da logística
    var frete = form.getValue("frete");
    if (frete == "" || frete == null) {
      throw "Preencha o campo Frete por conta!";
    }

    var transportadora = form.getValue("transportadora");
    if (transportadora == "" || transportadora == null) {
      throw "Preencha o campo Transportadora!";
    }

    var tipoDev = form.getValue("tipoDev");
    if (tipoDev == "" || tipoDev == null) {
      throw "Selecione o Tipo da solicitação!";
    }

    // Variáveis da seção Dados do crédito
    var contatoFin = form.getValue("contatoFin");
    if (contatoFin == "" || contatoFin == null) {
      throw "Preencha o campo Cont. do financ. para pedirmos o crédito!";
    }

    var acertoCredito = form.getValue("acertoCredito");
    if (acertoCredito == "" || acertoCredito == null) {
      throw "Selecione como receberemos o crédito!";
    }
  }

  function validarSeparacao() {
    var quantidade = form.getValue("quantidade");
    if (quantidade == "" || quantidade == null) {
      throw "Preencha o campo Quantidade física está ok!";
    }

    var volume = form.getValue("volume");
    if (volume == "" || volume == null) {
      throw "Preencha o campo Número de volumes!";
    }

    var peso = form.getValue("peso");
    if (peso == "" || peso == null) {
      throw "Preencha o campo Peso!";
    }
  }

  function validarEmbarque() {
    var dtEmbarque = form.getValue("dtEmbarque");
    if (dtEmbarque == "" || dtEmbarque == null) {
      throw "Preencha o campo Data do embarque!";
    }

    var dtChegada = form.getValue("dtChegada");
    if (dtChegada == "" || dtChegada == null) {
      throw "Preencha o campo Previsão de chegada no fornecedor!";
    }
  }

  function validarCredito() {
    var credito = form.getValue("credito");
    if (credito == "" || credito == null) {
      throw "Preencha o campo Como foi creditada a nota!";
    }
  }

  /*
    function validarPaiFilho() {
      var indexes = form.getChildrenIndexes("produtos");
      if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) {
          if (
            form.getValue("numNota___" + indexes[i]) == null ||
            form.getValue("numNota___" + indexes[i]) == ""
          ) {
            throw "Preencha o campo <strong>NF!<strong>";
          }

          if (
            form.getValue("codProd___" + indexes[i]) == null ||
            form.getValue("codProd___" + indexes[i]) == ""
          ) {
            throw "<strong>Há códigos de produto em branco!<strong>";
          }

          if (
            form.getValue("qtde___" + indexes[i]) == null ||
            form.getValue("qtde___" + indexes[i]) == ""
          ) {
            throw "<strong>Há campos de quantidade em branco na tabela!<strong>";
          }

          if (
            form.getValue("avaria___" + indexes[i]) == null ||
            form.getValue("avaria___" + indexes[i]) == ""
          ) {
            throw "<strong>Há campos de avaria não preenchidos!<strong>";
          }
        }
      } else {
        throw "<strong>Adicione ao menos um item!</strong>";
      }
    }
  */

  function validarPaiFilhoWMS() {
    var indexes = form.getChildrenIndexes("produtos");
    var quantidade = form.getValue("quantidade");
    if (quantidade == "nao") {
      if (indexes.length > 0) {
        for (var i = 0; i < indexes.length; i++) {
          if (
            form.getValue("qtdewms___" + indexes[i]) == 0 ||
            form.getValue("qtdewms___" + indexes[i]) == ""
          ) {
            throw "<strong>Você marcou que havia divergência nas quantidades. Coloque na tabela as quantidades!<strong>";
          }
        }
      }
    }
  }
}
