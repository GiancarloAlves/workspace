function enableFields(form) {
  var activity = getValue("WKNumState");
  const EVENTO_INICIO = 2
  const NOTIFICAR_VENDEDOR = 5
  const ROTEIRIZAR = 7
  const ACOMPANHAMENTO = 13


  switch (activity){

    case 0:
    case EVENTO_INICIO:

      break

    case NOTIFICAR_VENDEDOR:
      form.setEnabled("cliente", false);
      form.setEnabled("codCliente", false);
      form.setEnabled("MotivoRecusa", false);
      form.setEnabled("numNF", false);
      break

      case ROTEIRIZAR:
        form.setEnabled("cliente", false);
        form.setEnabled("codCliente", false);
        form.setEnabled("MotivoRecusa", false);
        form.setEnabled("numNF", false);
        form.setEnabled("destino", false);
        form.setEnabled("ObsVendedor", false);

        
      case ACOMPANHAMENTO:
        form.setEnabled("cliente", false);
        form.setEnabled("codCliente", false);
        form.setEnabled("MotivoRecusa", false);
        form.setEnabled("numNF", false);
        form.setEnabled("destino", false);
        form.setEnabled("dataSaida", false);
        form.setEnabled("veiculo", false);
        form.setEnabled("rota", false);
        form.setEnabled("motorista", false);
  }

}