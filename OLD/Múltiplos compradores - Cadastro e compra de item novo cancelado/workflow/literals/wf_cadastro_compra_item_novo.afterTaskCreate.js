function afterTaskCreate(colleagueId){
  
    var nrProxAtividade = getValue("WKNextState");
    var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela

    if (nrProxAtividade == "81"){
  
        var data = new Date();
        var numEmpresa = getValue("WKCompany");
        var colleagueId = hAPI.getCardValue("matAgente")

        var dia = hAPI.getCardValue("dia")
        var mes = hAPI.getCardValue("mes")
        var ano = hAPI.getCardValue("ano")
        var prazodia = 50400
      
        //seta o dia, mês (Janeiro é 0) e ano
        data.setDate(dia);
        data.setMonth(mes-1);
        data.setFullYear(ano);
         
        // Recupera o numero da solicitação
        var numProcesso = getValue("WKNumProces");
      
        // Seta o prazo para as 08:00
        hAPI.setDueDate(numProcesso, 0, colleagueId, data, 28800);
    }

}