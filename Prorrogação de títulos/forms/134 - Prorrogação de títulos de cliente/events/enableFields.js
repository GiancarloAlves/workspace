function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 5) {
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
    form.setEnabled("obs_vendedor", false);   
    form.setEnabled("numNF", false);   
  }

//   if (activity == 5) {
//     form.setEnabled("cod_cliente", false);
//     form.setEnabled("Solicitante", false);
//     form.setEnabled("email_solicitan", false);
//     form.setEnabled("vendedor", false);
//     form.setEnabled("justif", false);
//     form.setEnabled("boleto", false);
//     form.setEnabled("aprov_diret", false);
//     form.setEnabled("juros", false);
//     form.setEnabled("cliente", false);
//     form.setEnabled("teste1", false);
//     form.setEnabled("column1_2", false);
//     form.setEnabled("column2_2", false);
//     form.setEnabled("column3_2", false);
//     form.setEnabled("column4_2", false);
//     form.setEnabled("column5_2", false);
//     form.setEnabled("column6_2", false);
//     form.setEnabled("column7_2", false);
//     form.setEnabled("column8_2", false);

//   }

//   if (activity == 7) {
//     form.setEnabled("cod_cliente", false);
//     form.setEnabled("Solicitante", false);
//     form.setEnabled("email_solicitan", false);
//     form.setEnabled("vendedor", false);
//     form.setEnabled("justif", false);
//     form.setEnabled("boleto", false);
//     form.setEnabled("titulos_vencido", false);
//     form.setEnabled("aprov_financ", false);
//     form.setEnabled("cliente", false);
//     form.setEnabled("column1_2", false);
//     form.setEnabled("column2_2", false);
//     form.setEnabled("column3_2", false);
//     form.setEnabled("column4_2", false);
//     form.setEnabled("column5_2", false);
//     form.setEnabled("column6_2", false);
//     form.setEnabled("column7_2", false);
//     form.setEnabled("column8_2", false);
//   }
//   if (activity == 24) {
//     form.setEnabled("aprov_diret", false);
//     form.setEnabled("juros", false);
//     form.setEnabled("aprov_financ", false);
//     form.setEnabled("cod_cliente", false);
//     form.setEnabled("Solicitante", false);
//     form.setEnabled("email_solicitan", false);
//     form.setEnabled("vendedor", false);
//     form.setEnabled("justif", false);
//     form.setEnabled("titulos_vencido", false);
//     form.setEnabled("cliente", false);
//   }
}