function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 3 || activity == 0) {
    form.setEnabled("RespSolicitacao", false);
    form.setEnabled("ObsFinal", false);
    form.setEnabled("demanda_ok", false);
  }
  if (activity == 4) {
    form.setEnabled("CodProduto", false);
    form.setEnabled("Transportadora", false);
    form.setEnabled("DataFaturamento", false);
    form.setEnabled("NomeFornecedor", false);
    form.setEnabled("NumNF", false);
    form.setEnabled("ObsFinal", false);
    form.setEnabled("demanda_ok", false);
    form.setEnabled("ObsInCompras", false);
    }

    if (activity == 9) {
            form.setEnabled("CodProduto", false);
            form.setEnabled("Transportadora", false);
            form.setEnabled("DataFaturamento", false);
            form.setEnabled("NomeFornecedor", false);
            form.setEnabled("NumNF", false);
            form.setEnabled("RespSolicitacao", false);
            form.setEnabled("ObsInCompras", false);
          }
    }