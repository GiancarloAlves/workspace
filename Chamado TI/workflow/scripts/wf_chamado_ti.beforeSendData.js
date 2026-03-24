function beforeSendData(customField, customFact) {
  customField[0] = hAPI.getCardValue("ComboProblema");

  customField[1] = hAPI.getCardValue("ComboUrgencia");

  customField[2] = hAPI.getCardValue("RdProblResolv");

  var field0 = hAPI.getCardValue("AvaliacaoAtend");
  field0 = +field0;
  if (!isNaN(field0)) {
    customFact[0] = field0;
  }
}
