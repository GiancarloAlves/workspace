function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 4 || activity == 0) {
    form.setEnabled("dados_ok", false);
    form.setEnabled("obs_compras", false);

  }
  if (activity == 5) {
    form.setEnabled("obs", false);
    form.setEnabled("nome_cliente", false);
    form.setEnabled("DSCodCliente", false);
    form.setEnabled("DSClient", false);
    form.setEnabled("column11_1", false);
    form.setEnabled("column1_1", false);
    
  }
  if (activity == 9) {
    form.setEnabled("obs", false);
    form.setEnabled("nome_cliente", false);
    form.setEnabled("DSCodCliente", false);
    form.setEnabled("DSClient", false);
    form.setEnabled("column11_1", false);
    form.setEnabled("column1_1", false);
  }
}