function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  //CONSTANTES GLOBAIS
  // CONSTANTES GLOBAIS
  const EVENTO_INICIO = 4;
  const AGENDAMENTO = 5;
  const ACESSOS_TI = 6;
  const FIM = 12;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;

    case AGENDAMENTO:
      validarAgendamento();
      break;
  }

  function validarInicio() {
    var matricula = form.getValue("matricula");
    if (matricula == "" || matricula == null) {
      throw "Informe um número de matrícula ou usuário!";
    }

    var aumentosal = form.getValue("aumentosal");
    if (aumentosal == "Selecione" || aumentosal == null) {
      throw "No campo Aumento de salário, marque uma das opções!";
    }

    if (aumentosal == "Sim") {
      var novosal = form.getValue("novosal");
      if (novosal == "" || novosal == null) throw "Diga qual o novo salário!";
    }

    var trocacargo = form.getValue("trocacargo");
    if (trocacargo == "Selecione" || trocacargo == null) {
      throw "No campo Troca de cargo, marque uma das opções!";
    }
    if (trocacargo == "Sim") {
      var novocargo = form.getValue("novocargo");
      if (novocargo == "" || novocargo == null) throw "Diga qual o novo cargo!";
    }

    var novaHora = form.getValue("novaHora");
    if (novaHora == "" || matricula == novaHora) {
      throw "Informe o horário de trabalho!";
    }

    var cargo = form.getValue("cargo");
    var carteira = form.getValue("sit517");
    // var motivo517 = form.getValue("motivo517");
    if (cargo == "VENDEDOR") {
      if (carteira == "LIVRE" || carteira == null) {
        throw "Para cargo de vendedor, situação da 517 não pode ser nula ou LIVRE! Inative a carteira na 517 para continuar.";
      }

      // if(motivo517 == "" || motivo517 == null) {
      //     throw("Para cargo de vendedor, motivo da 517 não pode ser nulo.");
      // }
    }

    if (trocacargo == "Não" && aumentosal == "Não") {
      throw "Os campos de aumento de salário e troca de cargo foram ambos marcados como Não. Nenhuma alteração foi detectada. Por favor, escolha alguma das opções para alterar.";
    }
  }

  function validarAgendamento() {
    var desligamento = form.getValue("desligamento");
    if (desligamento == "" || desligamento == null) {
      throw "Informe a data do exame!";
    }
  }
}
