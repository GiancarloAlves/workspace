function enableFields(form) {
  var activity = getValue("WKNumState");
  if (activity == 5) {
    form.setEnabled("DataSetVendedor", false);
    form.setEnabled("NumPedSubstitut", false);
    form.setEnabled("NumNFOrigem", false);
  }
  if (activity == 6) {
    form.setEnabled("NumNFSaida", false);
    form.setEnabled("NumNFEntrada", false);
    form.setEnabled("PedidoPendente", false);
    form.setEnabled("Pag28Dias", false);
    form.setEnabled("ItensSaoIguais", false);
    form.setEnabled("ValorTotalIgual", false);
    form.setEnabled("DataSetVendedor", false);
    form.setEnabled("NumPedSubstitut", false);
    form.setEnabled("NumNFOrigem", false);
  }
  if (activity == 7) {
    form.setEnabled("NumNFSaida", false);
    form.setEnabled("NumNFEntrada", false);
    form.setEnabled("PedidoPendente", false);
    form.setEnabled("Pag28Dias", false);
    form.setEnabled("ItensSaoIguais", false);
    form.setEnabled("ValorTotalIgual", false);
    form.setEnabled("DataSetVendedor", false);
    form.setEnabled("NumPedSubstitut", false);
    form.setEnabled("NumNFOrigem", false);
  }
  if (activity == 8) {
    form.setEnabled("NumNFEntrada", false);
    form.setEnabled("PedidoPendente", false);
    form.setEnabled("Pag28Dias", false);
    form.setEnabled("ItensSaoIguais", false);
    form.setEnabled("ValorTotalIgual", false);
    form.setEnabled("DataSetVendedor", false);
    form.setEnabled("NumPedSubstitut", false);
    form.setEnabled("NumNFOrigem", false);
    form.setEnabled("NumNFSaida", false);
  }
}