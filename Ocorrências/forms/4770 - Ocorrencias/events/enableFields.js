function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 7 || activity == 0) {
    //1ª tratativa
    form.setEnabled("PqReclamacao", false);
    form.setEnabled("SolucaoReclamac", false);
    form.setEnabled("RdOutroSetor", false);
    form.setEnabled("SegUsuario", false);

    //2ª tratativa
    form.setEnabled("SolucaoReclamac2", false);
    form.setEnabled("RdAprovOcor", false);

    //Resolucao
    form.setEnabled("PrimPQ", false);
    form.setEnabled("SegPQ", false);
    form.setEnabled("TercPQ", false);
    form.setEnabled("QuartoPQ", false);
    form.setEnabled("QuintoPQ", false);
    form.setEnabled("ishikawa", false);
    form.setEnabled("SolucaoFinal", false);
  }
  if (activity == 9) {
    //Dados do cliente
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("PessoaCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("SetorCliente", false);
    form.setEnabled("ContTelefonico", false);
    form.setEnabled("EmailCliente", false);

    //Reclamação
    form.setEnabled("ComboTipoReclam", false);
    form.setEnabled("DescrOcorrencia", false);
    form.setEnabled("SugestaoResoluc", false);
    form.setEnabled("Gerente", false);

    //2ª tratativa
    form.setEnabled("SolucaoReclamac2", false);
    form.setEnabled("RdAprovOcor", false);

    //Resolucao
    form.setEnabled("PrimPQ", false);
    form.setEnabled("SegPQ", false);
    form.setEnabled("TercPQ", false);
    form.setEnabled("QuartoPQ", false);
    form.setEnabled("QuintoPQ", false);
    form.setEnabled("ishikawa", false);
    form.setEnabled("SolucaoFinal", false);
  }

  if (activity == 41) {
    //Dados do cliente
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("PessoaCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("SetorCliente", false);
    form.setEnabled("ContTelefonico", false);
    form.setEnabled("EmailCliente", false);

    //Reclamação
    form.setEnabled("ComboTipoReclam", false);
    form.setEnabled("SentimCliente", false);
    form.setEnabled("SetorTranstorno", false);
    form.setEnabled("ModoReclamacao", false);
    form.setEnabled("DescrOcorrencia", false);
    form.setEnabled("SugestaoResoluc", false);
    form.setEnabled("Gerente", false);

    //1ª tratativa
    form.setEnabled("PqReclamacao", false);
    form.setEnabled("SolucaoReclamac", false);
    form.setEnabled("RdOutroSetor", false);
    form.setEnabled("SegUsuario", false);

    //2ª tratativa - usuário
    form.setEnabled("RdAprovOcor", false);

    //Resolucao
    form.setEnabled("PrimPQ", false);
    form.setEnabled("SegPQ", false);
    form.setEnabled("TercPQ", false);
    form.setEnabled("QuartoPQ", false);
    form.setEnabled("QuintoPQ", false);
    form.setEnabled("ishikawa", false);
    form.setEnabled("SolucaoFinal", false);
  }

  if (activity == 45) {
    //Dados do cliente
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("PessoaCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("SetorCliente", false);
    form.setEnabled("ContTelefonico", false);
    form.setEnabled("EmailCliente", false);

    //Reclamação
    form.setEnabled("ComboTipoReclam", false);
    form.setEnabled("SentimCliente", false);
    form.setEnabled("SetorTranstorno", false);
    form.setEnabled("ModoReclamacao", false);
    form.setEnabled("DescrOcorrencia", false);
    form.setEnabled("SugestaoResoluc", false);
    form.setEnabled("Gerente", false);

    //1ª tratativa
    form.setEnabled("PqReclamacao", false);
    form.setEnabled("SolucaoReclamac", false);
    form.setEnabled("RdOutroSetor", false);

    //2ª tratativa - ocorrências
    form.setEnabled("SolucaoReclamac2", false);

    //Resolucao
    form.setEnabled("PrimPQ", false);
    form.setEnabled("SegPQ", false);
    form.setEnabled("TercPQ", false);
    form.setEnabled("QuartoPQ", false);
    form.setEnabled("QuintoPQ", false);
    form.setEnabled("ishikawa", false);
    form.setEnabled("SolucaoFinal", false);
  }

  if (activity == 54) {
    //Dados do cliente
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("PessoaCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("SetorCliente", false);
    form.setEnabled("ContTelefonico", false);
    form.setEnabled("EmailCliente", false);

    //Reclamação
    form.setEnabled("ComboTipoReclam", false);
    form.setEnabled("SentimCliente", false);
    form.setEnabled("SetorTranstorno", false);
    form.setEnabled("ModoReclamacao", false);
    form.setEnabled("DescrOcorrencia", false);
    form.setEnabled("SugestaoResoluc", false);
    form.setEnabled("Gerente", false);

    //1ª tratativa
    form.setEnabled("PqReclamacao", false);
    form.setEnabled("SolucaoReclamac", false);
    form.setEnabled("RdOutroSetor", false);
    form.setEnabled("SegUsuario", false);

    //2ª tratativa
    form.setEnabled("SolucaoReclamac2", false);
    form.setEnabled("RdAprovOcor", false);

    //Resolucao
    form.setEnabled("PrimPQ", false);
    form.setEnabled("SegPQ", false);
    form.setEnabled("TercPQ", false);
    form.setEnabled("QuartoPQ", false);
    form.setEnabled("QuintoPQ", false);
    form.setEnabled("ishikawa", false);
    form.setEnabled("SolucaoFinal", false);
  }

  if (activity == 62) {
    //Dados do cliente
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("PessoaCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("SetorCliente", false);
    form.setEnabled("ContTelefonico", false);
    form.setEnabled("EmailCliente", false);

    //Reclamação
    form.setEnabled("ComboTipoReclam", false);
    form.setEnabled("SentimCliente", false);
    form.setEnabled("SetorTranstorno", false);
    form.setEnabled("ModoReclamacao", false);
    form.setEnabled("DescrOcorrencia", false);
    form.setEnabled("SugestaoResoluc", false);
    form.setEnabled("Gerente", false);

    //1ª tratativa
    form.setEnabled("PqReclamacao", false);
    form.setEnabled("SolucaoReclamac", false);
    form.setEnabled("RdOutroSetor", false);
    form.setEnabled("SegUsuario", false);

    //2ª tratativa
    form.setEnabled("SolucaoReclamac2", false);
    form.setEnabled("RdAprovOcor", false);
  }
}
