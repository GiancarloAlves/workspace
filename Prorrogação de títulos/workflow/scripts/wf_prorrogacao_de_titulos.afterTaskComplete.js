function afterTaskComplete(colleagueId,nextSequenceId,userList){

    var numState = getValue("WKNumState");
    var process = getValue("WKNumProces");
    var anexado = false;
    var message = "";

    var num_processo = getValue ("WKNumProces");     
    var usuario = getValue ("WKUser");

    // variáveis de observação
    var observacao = hAPI.getCardValue("obs_vendedor");  
    var obsgerente = hAPI.getCardValue("obs_gerente");  
    var obsreaval = hAPI.getCardValue("obs_reaval");
    var obsfin = hAPI.getCardValue("obs_financeiro");

    
   
    if(nextSequenceId==5){ // na etapa inicial
 
        if (observacao !== null){     
            hAPI.setTaskComments(usuario, num_processo, 0, observacao); 
        } 
    } 

    if(nextSequenceId==8){ // na etapa de análise financeira

        if (obsfin !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsfin); 
        }   
    }

    if(nextSequenceId==11){ //na etapa do gerente

        if (obsgerente !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsgerente); 
        }
    }

    if(nextSequenceId==26){ //na etapa de reavaliação

        if (obsreaval !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsreaval); 
        }
    }

}