function enableFields(form) {
  var activity = getValue("WKNumState");

  if (activity == 5 || activity == 17) {
    form.setEnabled("matSolicitante", false);
    form.setEnabled("matSupervisor", false);
    form.setEnabled("tipoSolicitante", false);
    form.setEnabled("supervisorSolicitante", false);
    form.setEnabled("matricula", false);
    form.setEnabled("cnpj", false);
    form.setEnabled("fone", false);
    form.setEnabled("email", false);
    form.setEnabled("cadastro", false);
    form.setEnabled("contFinanceiro", false);
    form.setEnabled("correcao", false);
    form.setEnabled("reeenviar", false);
    form.setEnabled("obs_vendedor", false);
    form.setEnabled("reenviar", false);
    }
}