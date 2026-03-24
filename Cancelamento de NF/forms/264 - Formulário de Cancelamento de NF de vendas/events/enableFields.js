function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 6 || activity == 0) {
    form.setEnabled("ObsReceb", false);
    form.setEnabled("AprovReceb", false);

  }

  if (activity == 8) {
    form.setEnabled("TituloBanco", false);
    form.setEnabled("OutroMotivo", false);
    form.setEnabled("MotivoCancelam", false);
    form.setEnabled("NumPedSubstit", false);
    form.setEnabled("ValorNota", false);
    form.setEnabled("RadProdEspecial", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("TipoMov", false);
    form.setEnabled("ComboSupervisor", false);
    form.setEnabled("Cliente", false);
    form.setEnabled("LocalMat", false);
    form.setEnabled("ObsReceb", false);
    form.setEnabled("AprovReceb", false);
  }

  if (activity == 9) {
    form.setEnabled("RadAprovGerent", false);
    form.setEnabled("TituloBanco", false);
    form.setEnabled("OutroMotivo", false);
    form.setEnabled("MotivoCancelam", false);
    form.setEnabled("NumPedSubstit", false);
    form.setEnabled("ValorNota", false);
    form.setEnabled("RadProdEspecial", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("TipoMov", false);
    form.setEnabled("ComboSupervisor", false);
    form.setEnabled("Cliente", false);
    form.setEnabled("ObsGerencia", false);
    form.setEnabled("LocalMat", false);
    form.setEnabled("ObsReceb", false);
    form.setEnabled("AprovReceb", false);

  }

  if (activity == 10) {
    form.setEnabled("RadAprovGerent", false);
    form.setEnabled("TituloBanco", false);
    form.setEnabled("OutroMotivo", false);
    form.setEnabled("MotivoCancelam", false);
    form.setEnabled("NumPedSubstit", false);
    form.setEnabled("ValorNota", false);
    form.setEnabled("RadProdEspecial", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("TipoMov", false);
    form.setEnabled("AprovCompras", false);
    form.setEnabled("ComboSupervisor", false);
    form.setEnabled("Cliente", false);
    form.setEnabled("ObsGerencia", false);
    form.setEnabled("ObsCompras", false);
    form.setEnabled("LocalMat", false);


  }

  if (activity == 11) {
    form.setEnabled("RadAprovGerent", false);
    form.setEnabled("OutroMotivo", false);
    form.setEnabled("MotivoCancelam", false);
    form.setEnabled("NumPedSubstit", false);
    form.setEnabled("ValorNota", false);
    form.setEnabled("RadProdEspecial", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("TipoMov", false);
    form.setEnabled("AprovCompras", false);
    form.setEnabled("ComboSupervisor", false);
    form.setEnabled("ObsGerencia", false);
    form.setEnabled("LocalMat", false);

  }

  if (activity == 12) {
    form.setEnabled("DatHrEntrMerc", false);
    form.setEnabled("NomeSeparador", false);
    form.setEnabled("RadAprovGerent", false);
    form.setEnabled("TituloBanco", false);
    form.setEnabled("OutroMotivo", false);
    form.setEnabled("MotivoCancelam", false);
    form.setEnabled("NumPedSubstit", false);
    form.setEnabled("ValorNota", false);
    form.setEnabled("RadProdEspecial", false);
    form.setEnabled("CodCliente", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("TipoMov", false);
    form.setEnabled("AprovCompras", false);
    form.setEnabled("ComboSupervisor", false);
    form.setEnabled("ObsReceb", false);
    form.setEnabled("ObsGerencia", false);
    form.setEnabled("Cliente", false);
    form.setEnabled("ObsCompras", false);
    form.setEnabled("LocalMat", false);

  }
}