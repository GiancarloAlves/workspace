function beforeSendData(customFields, customFacts) {
    log.info(">>>>> ENTREI NO beforeSendData");

    try {
        log.info(">>>>> ENTREI NO try");
        
        // customFields
        customFields[0] = hAPI.getCardValue("vendedor");
        customFields[1] = hAPI.getCardValue("cliente");
        customFields[2] = hAPI.getCardValue("motivoDevolucao");
        customFields[3] = hAPI.getCardValue("localCliente");
        customFields[4] = hAPI.getCardValue("rdPossuiColeta");
        customFields[5] = hAPI.getCardValue("produtoEspecial");
        customFields[6] = hAPI.getCardValue("rdAprovaSup");
        customFields[7] = hAPI.getCardValue("rdAprovaGerente");
        customFields[8] = hAPI.getCardValue("rdAprovaGerenteVendas");
        customFields[9] = hAPI.getCardValue("avalColeta");
        customFields[10] = hAPI.getCardValue("recebimentoOk");
        customFields[11] = hAPI.getCardValue("acertoCredito");
        customFields[12] = hAPI.getCardValue("coletaReprovada");
        customFields[13] = hAPI.getCardValue("acaoPenalidade");
        customFields[14] = hAPI.getCardValue("rdCompras");

        // customFacts
        customFacts[0] = java.lang.Double.parseDouble(hAPI.getCardValue("valorTotalDevolucao"));
    } catch (error) {
        log.info(">>>>> ENTREI NO catch");
        log.info(error);
    }
}