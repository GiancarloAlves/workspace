function afterTaskCreate(colleagueId){
  
    var nrProxAtividade = getValue("WKNextState");
    var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela

    if (nrProxAtividade == "28"){
  
        var data = new Date();
        var numEmpresa = getValue("WKCompany");
        var colleagueId = hAPI.getCardValue("matcomprador")

        var dia = hAPI.getCardValue("dia")
        var mes = hAPI.getCardValue("mes")
        var ano = hAPI.getCardValue("ano")
        var prazodia = hAPI.getCardValue("dtChegadaReal")
      
        //seta o dia, mês (Janeiro é 0) e ano
        data.setDate(dia);
        data.setMonth(mes-1);
        data.setFullYear(ano);
         
        // Recupera o numero da solicitação
        var numProcesso = getValue("WKNumProces");
      
        // Seta o prazo
        hAPI.setDueDate(numProcesso, threadDaSolicitacao, colleagueId, data, prazodia);
    }

}