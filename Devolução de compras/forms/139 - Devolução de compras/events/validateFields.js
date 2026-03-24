function validateForm(form) {
  var activity = getValue("WKNumState");
  if (
    (form.getValue("cod_fornec") == null ||
      form.getValue("cod_fornec") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "C\u00F3digo de fornecedor n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("nome_fornecedor") == null ||
      form.getValue("nome_fornecedor") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Nome do fornecedor n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("pessoa_forneced") == null ||
      form.getValue("pessoa_forneced") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Pessoa que foi tratada a devolu\u00E7\u00E3o (fornecedor) n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("motivo") == null || form.getValue("motivo") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Motivo da devolu\u00E7\u00E3o n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("telefone") == null || form.getValue("telefone") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Telefone da pessoa n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("email") == null || form.getValue("email") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "E-mail da pessoa n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("cont_financ_for") == null ||
      form.getValue("cont_financ_for") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Contato do financeiro do fornecedor para pedirmos o cr\u00E9dito n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("frete") == null || form.getValue("frete") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Frete por conta n\u00E3o pode ser vazio.";
  }
  if (
    (form.getValue("transportadora") == null ||
      form.getValue("transportadora") == "") &&
    (getValue("WKNumProces") == null ||
      (getValue("WKNumProces") > 0 && getValue("WKCompletTask") == "true"))
  ) {
    throw "Transportadora n\u00E3o pode ser vazio.";
  }
}
