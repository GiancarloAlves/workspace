function afterTaskCreate(colleagueId){
  
        var nrProxAtividade = getValue("WKNextState");
        var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela

        var data = new Date();
        var numEmpresa = getValue("WKCompany");
        var colleagueId = "411"
        var solicitante = hAPI.getCardValue("matSolicitante")

        var dia = hAPI.getCardValue("dia")
        var mes = hAPI.getCardValue("mes")
        var ano = hAPI.getCardValue("ano")
      
        //seta o dia, mês (Janeiro é 0) e ano
        data.setDate(dia);
        data.setMonth(mes-1);
        data.setFullYear(ano);
         
        // Recupera o numero da solicitação
        var numProcesso = getValue("WKNumProces");

        if (nrProxAtividade == "13"){
      
            // Seta o prazo
            hAPI.setDueDate(numProcesso, threadDaSolicitacao, colleagueId, data, 28800);
        }


}

    


