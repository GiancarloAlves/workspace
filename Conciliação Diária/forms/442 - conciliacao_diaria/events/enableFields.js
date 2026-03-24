function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 5 || activity == 44) {
    form.setEnabled("checkbox010", false);
    form.setEnabled("checkbox011", false);
  }
  if (activity == 4) {
    form.setEnabled("tipo_solic", false);
    form.setEnabled("nome", false);
    form.setEnabled("matricula", false);
    form.setEnabled("descr_solicit", false);
    form.setEnabled("ComboArea", false);


  }
}
