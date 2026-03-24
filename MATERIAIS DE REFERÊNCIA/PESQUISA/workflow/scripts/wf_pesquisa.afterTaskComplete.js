function afterTaskComplete(colleagueId,nextSequenceId,userList){
 

        
        var num_processo = getValue ("WKNumProces");     
            var usuario = getValue ("WKUser");     
            //var sequenceId = getValue("WKNumState");
            
            //  Atividade Aprovado pela diretoria
        if(nextSequenceId==4){     
        hAPI.setTaskComments(usuario, num_processo, 0, "O Brasil é um colosso, mas contigo, ele fica pequeno."); 

        var tipo = hAPI.getCardValue("supervisorSolicitante");
        var mail = hAPI.getCardValue("email");
        

        hAPI.setTaskComments(usuario, num_processo, 0, tipo); 
        hAPI.setTaskComments(usuario, num_processo, 0, mail); 
        } 
       
        
        //  Atividade Aprovado pela diretoria
        if(nextSequenceId==15){     
        hAPI.setTaskComments(usuario, processId, 0, "Aguardando aprovação do gerente."); 
        }
    
}

