function afterTaskComplete(colleagueId, nextSequenceId, userList) {
  var num_processo = getValue("WKNumProces");
  var usuario = getValue("WKUser");

  var DescrOcorrencia = hAPI.getCardValue("DescrOcorrencia");
  var SugestaoResoluc = hAPI.getCardValue("SugestaoResoluc");
  var PqReclamacao = hAPI.getCardValue("PqReclamacao");
  var SolucaoReclamac = hAPI.getCardValue("SolucaoReclamac");
  var SolucReclamac2 = hAPI.getCardValue("SolucaoReclamac2");
  var ObsDevolucao = hAPI.getCardValue("ObsDevolucao");
  var ObsIniciador = hAPI.getCardValue("ObsIniciador");

  if (nextSequenceId == 9) {
    hAPI.setTaskComments(
      usuario,
      num_processo,
      0,
      "Sugestão de resolução :" + SugestaoResoluc
    );
    hAPI.setTaskComments(
      usuario,
      num_processo,
      0,
      "Ocorrência :" + DescrOcorrencia
    );
  }

  if (nextSequenceId == 47) {
    hAPI.setTaskComments(
      usuario,
      num_processo,
      0,
      "O que deve ser feito para solucionar a reclamação: " + SolucaoReclamac
    );
    hAPI.setTaskComments(
      usuario,
      num_processo,
      0,
      "Porque foi gerada a reclamação: " + PqReclamacao
    );
  }

  if (nextSequenceId == 45) {
    hAPI.setTaskComments(usuario, num_processo, 0, SolucReclamac2);
  }

  if (nextSequenceId == 81) {
    if (ObsDevolucao !== "") {
      hAPI.setTaskComments(usuario, num_processo, 0, ObsDevolucao);
    }
  }

  if (nextSequenceId == 59) {
    //MAIS IMPORTANTE

    if (ObsIniciador !== "") {
      hAPI.setTaskComments(usuario, num_processo, 0, ObsIniciador);
    }
  }
}
