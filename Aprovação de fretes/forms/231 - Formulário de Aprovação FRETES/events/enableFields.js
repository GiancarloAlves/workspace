function enableFields(form) {

  var activity = getValue("WKNumState");

  if (activity == 5) {
    form.setEnabled("NroDoc", false);
    form.setEnabled("Fornecedor", false);
    form.setEnabled("obs", false)

  }
  if (activity == 6) {
    form.setEnabled("AprovSup", false);
    form.setEnabled("NroDoc", false);
    form.setEnabled("Fornecedor", false);
    form.setEnabled("ObsSuperv", false);
  }
}