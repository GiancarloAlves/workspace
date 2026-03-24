function afterTaskComplete(colleagueId,nextSequenceId,userList){  
             
    var num_processo = getValue ("WKNumProces");     
    var usuario = getValue ("WKUser");   

    var obsSol = hAPI.getCardValue("obsSol");
    var obsSupervisor = hAPI.getCardValue("obsSupervisor");
    var obsGerente = hAPI.getCardValue("obsGerente");
    var obsLog = hAPI.getCardValue("obsLog");
    var obsAnexo = hAPI.getCardValue("obsAnexo");
    var obsFin = hAPI.getCardValue("obsFin");

    if(nextSequenceId==22){     
            hAPI.setTaskComments(usuario, num_processo, 0, obsSol);
    } 

    if(nextSequenceId==25){    
            hAPI.setTaskComments(usuario, num_processo, 0, obsSupervisor);
    } 

    if(nextSequenceId==37){     
            hAPI.setTaskComments(usuario, num_processo, 0, obsGerente);
    } 

    if(nextSequenceId==42){         
            hAPI.setTaskComments(usuario, num_processo, 0, obsLog);
    } 

    if(nextSequenceId==8){   
            hAPI.setTaskComments(usuario, num_processo, 0, obsAnexo);
    }      

    if(nextSequenceId==49){   
            hAPI.setTaskComments(usuario, num_processo, 0, obsFin);
    }   

}