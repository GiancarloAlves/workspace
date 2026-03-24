function afterTaskComplete(colleagueId,nextSequenceId,userList){  
             
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");   
    
        var observacao = hAPI.getCardValue("observacao");
        var compras = hAPI.getCardValue("obscompras");
        var recebimento = hAPI.getCardValue("obsreceb");
        var rastreio = hAPI.getCardValue("obsrastreio");
        var liberacao = hAPI.getCardValue("obsliberacao");
        var fim = hAPI.getCardValue("obsfim");

        if(nextSequenceId==20){     
                hAPI.setTaskComments(usuario, num_processo, 0, observacao);                    
        } 
    
        if(nextSequenceId==10){    
                hAPI.setTaskComments(usuario, num_processo, 0, compras);                   
        } 
    
        if(nextSequenceId==37){     
                hAPI.setTaskComments(usuario, num_processo, 0, recebimento);                     
        } 
    
        if(nextSequenceId==73){         
                hAPI.setTaskComments(usuario, num_processo, 0, rastreio);                    
        } 
    
        if(nextSequenceId==75){   
                hAPI.setTaskComments(usuario, num_processo, 0, liberacao);                              
        }      

        if(nextSequenceId==52){   
                hAPI.setTaskComments(usuario, num_processo, 0, fim);                    
        }   
   
}