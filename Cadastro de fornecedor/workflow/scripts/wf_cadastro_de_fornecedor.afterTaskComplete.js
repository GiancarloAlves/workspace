function afterTaskComplete(colleagueId,nextSequenceId,userList){

    var atividade = getValue("WKNumState");
    var num_processo = getValue ("WKNumProces");     
    var usuario = getValue ("WKUser");

    // variáveis de observação
    var observacao = hAPI.getCardValue("obs_vendedor");  
    var obscompras = hAPI.getCardValue("obs_compras");  
    var obscorrecao = hAPI.getCardValue("obs_correcao");
    var obsfin = hAPI.getCardValue("obs_final");
       
    if(nextSequenceId==5){ // na etapa inicial
 
        if (observacao !== null){     
            hAPI.setTaskComments(usuario, num_processo, 0, observacao); 
        } 
    } 

    if(nextSequenceId==8){ // na etapa de cadastro

        if (obscompras !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obscompras); 
        }   
    }

    if(nextSequenceId==11){ //na etapa de correção do vendedor

        if (obscorrecao !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obscorrecao); 
        }
    }

    if(nextSequenceId==26){ //na etapa final

        if (obsfin !== "") {
        hAPI.setTaskComments(usuario, num_processo, 0, obsfin); 
        }
    }

}