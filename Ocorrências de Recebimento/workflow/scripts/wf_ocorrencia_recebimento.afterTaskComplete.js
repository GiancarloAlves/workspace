function afterTaskComplete(colleagueId,nextSequenceId,userList){

    var numState = getValue("WKNumState");
    var process = getValue("WKNumProces");
    var anexado = false;
    var message = "";

    var num_processo = getValue ("WKNumProces");     
    var usuario = getValue ("WKUser");

    // variáveis de observação
    var observacao = hAPI.getCardValue("observacao");  
    var obsgerente = hAPI.getCardValue("obsgerente");  
    var obscomprador = hAPI.getCardValue("obscomprador");
    var obsfinal = hAPI.getCardValue("obsfinal");
   
    if(nextSequenceId==30){ // na etapa inicial
 
        if (observacao !== null){     
            hAPI.setTaskComments(usuario, num_processo, 0, observacao); 
        } 
    } 

    if(nextSequenceId==31 || nextSequenceId==4){ // na etapa do grente de compras

        if (obsgerente !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsgerente); 
        }   
    }

    if(nextSequenceId==32){ //na etapa do comprador

        if (obscomprador !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obscomprador); 
        }
    }

    if(nextSequenceId==31 || nextSequenceId==29){ //na etapa do agendamento

        if (obsfinal !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsfinal); 
        }
    }

}