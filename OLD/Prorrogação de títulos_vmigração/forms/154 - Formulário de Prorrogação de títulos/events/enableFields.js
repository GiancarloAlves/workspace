function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 17) {
    form.setEnabled("cod_cliente", false);
    form.setEnabled("Solicitante", false);
    form.setEnabled("email_solicitan", false);
    form.setEnabled("vendedor", false);
    form.setEnabled("justif", false);
    form.setEnabled("boleto", false);
    form.setEnabled("titulos_vencido", false);
    form.setEnabled("juros", false);
    form.setEnabled("aprov_diret", false);
    form.setEnabled("cliente", false);
  }
  if (activity == 5) {
    form.setEnabled("cod_cliente", false);
    form.setEnabled("Solicitante", false);
    form.setEnabled("email_solicitan", false);
    form.setEnabled("vendedor", false);
    form.setEnabled("justif", false);
    form.setEnabled("boleto", false);
    form.setEnabled("aprov_diret", false);
    form.setEnabled("juros", false);
    form.setEnabled("cliente", false);
    form.setEnabled("teste1", false);
  }
  if (activity == 7) {
    form.setEnabled("cod_cliente", false);
    form.setEnabled("Solicitante", false);
    form.setEnabled("email_solicitan", false);
    form.setEnabled("vendedor", false);
    form.setEnabled("justif", false);
    form.setEnabled("boleto", false);
    form.setEnabled("titulos_vencido", false);
    form.setEnabled("aprov_financ", false);
    form.setEnabled("cliente", false);
  }
  if (activity == 24) {
    form.setEnabled("aprov_diret", false);
    form.setEnabled("juros", false);
    form.setEnabled("aprov_financ", false);
    form.setEnabled("cod_cliente", false);
    form.setEnabled("Solicitante", false);
    form.setEnabled("email_solicitan", false);
    form.setEnabled("vendedor", false);
    form.setEnabled("justif", false);
    form.setEnabled("titulos_vencido", false);
    form.setEnabled("cliente", false);
  }
}
