function afterTaskComplete(colleagueId, nextSequenceId, userList) {
  var num_processo = getValue("WKNumProces");
  var usuario = getValue("WKUser");
  var problema = hAPI.getCardValue("DescrProblema");
  var resolucao = hAPI.getCardValue("resolucaoTI");
  var esclarecimento = hAPI.getCardValue("ObsEsclarecTI");
  var obsgerente = hAPI.getCardValue("obsgerente");

  var EsclarecSolicit = hAPI.getCardValue("EsclarecSolicit");
  var ObsUsuario = hAPI.getCardValue("ObsUsuario");

  var agente = hAPI.getCardValue("matAgente");
  var gerente = hAPI.getCardValue("matSupervisor");

  if (nextSequenceId == 33 && colleagueId == usuario) {
    // if (problema !== "" && problema !== null && colleagueId == usuario)
    if (problema !== null) {
      hAPI.setTaskComments(usuario, num_processo, 0, problema);
    }
  }

  if (nextSequenceId == 48 && colleagueId == agente) {
    if (resolucao !== "") {
      hAPI.setTaskComments(agente, num_processo, 0, resolucao);
    }

    if (esclarecimento !== "") {
      hAPI.setTaskComments(agente, num_processo, 0, esclarecimento);
    }
  }

  if (nextSequenceId == 43 && colleagueId == gerente) {
    if (obsgerente !== "") {
      hAPI.setTaskComments(gerente, num_processo, 0, obsgerente);
    }
  }

  if (nextSequenceId == 27 && colleagueId == usuario) {
    if (ObsUsuario !== "") {
      hAPI.setTaskComments(usuario, num_processo, 0, ObsUsuario);
    }

    if (EsclarecSolicit !== "") {
      hAPI.setTaskComments(usuario, num_processo, 0, EsclarecSolicit);
    }
  }
}
