function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity > 4) {

      form.setEnabled("valor", false);
      form.setEnabled("vendedor", false);
      form.setEnabled("TipoDespesa", false);
      form.setEnabled("DataInicial", false);
      form.setEnabled("DataFinal", false);
      form.setEnabled("codCliente", false);
      form.setEnabled("cliente", false);
      form.setEnabled("modalidade", false);
      form.setEnabled("conta", false);
      form.setEnabled("agencia", false);
      form.setEnabled("cnpj", false);
      form.setEnabled("codbanco", false);
      form.setEnabled("pix", false);
      form.setEnabled("tipopix", false);
      form.setEnabled("iniciocartao", false);
      form.setEnabled("fimcartao", false);
      form.setEnabled("obsvendedor", false);   
  }

}