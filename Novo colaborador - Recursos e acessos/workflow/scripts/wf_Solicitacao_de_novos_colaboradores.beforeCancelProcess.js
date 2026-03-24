function beforeStateEntry(sequenceId){
    var currentStep = getValue("WKNumState");

    if (currentStep == 10) {
        var cardData = hAPI.getCardData(getValue("WKNumProces"));
        var cardFields = cardData.getCardData();
        var cancelBtn = cardFields.get("cancelar_processo");

        // Verifica se o botão de cancelar existe no formulário
        if (cancelBtn) {
            // Define a visibilidade do botão de cancelar como falso
            cancelBtn.setVisible(false);
        }
    }
}