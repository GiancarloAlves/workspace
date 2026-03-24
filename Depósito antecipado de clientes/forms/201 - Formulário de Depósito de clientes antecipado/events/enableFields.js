function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 4) {
    form.setEnabled("banco", false);
    form.setEnabled("valor", false);
    form.setEnabled("Cliente", false);
    form.setEnabled("CodCliente", false);
  }
}