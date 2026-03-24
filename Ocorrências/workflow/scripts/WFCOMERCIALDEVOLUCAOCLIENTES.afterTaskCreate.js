// function afterTaskCreate(colleagueId){

//     var nrProxAtividade = getValue("WKNextState");
//     var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela. Na devolução, 0 para financeiro e 1 para logística.

//     if (nrProxAtividade == "88"){

//         var data = new Date();
//         var numEmpresa = getValue("WKCompany");

//         var dia = hAPI.getCardValue("dia")
//         var mes = hAPI.getCardValue("mes")
//         var ano = hAPI.getCardValue("ano")
//         var prazodia = hAPI.getCardValue("prazodia")

//         //seta o dia, mês (Janeiro é 0) e ano
//         data.setDate(dia);
//         data.setMonth(mes-1);
//         data.setFullYear(ano);

//         // Recupera o numero da solicitação
//         var numProcesso = getValue("WKNumProces");

//         // Seta o prazo para as 14:00
//         hAPI.setDueDate(numProcesso, threadDaSolicitacao, colleagueId, data, prazodia);
//     }
// }

function afterTaskCreate(colleagueId) {
  var nrProxAtividade = getValue("WKNextState");
  if (nrProxAtividade == "88") {
    //atividade entre paralelas

    var data = new Date();
    var numEmpresa = getValue("WKCompany");

    //seta o dia, mês (Janeiro é 0) e ano
    data.setDate(5);
    data.setMonth(11);
    data.setFullYear(2023);

    // Recupera o numero da solicitação
    var numProcesso = getValue("WKNumProces");

    // Seta o prazo para as 14:00
    hAPI.setDueDate(numProcesso, 0, colleagueId, data, 50400);
  }
}
