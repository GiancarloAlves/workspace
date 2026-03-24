function afterTaskComplete(colleagueId,nextSequenceId,userList){

    //const EVENTO_INICIO = 2
   // const TRATATIVA = 5
  //  const ACOMPANHAMENTO = 13
    
             
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");   
        var obs = hAPI.getCardValue("obs");  
        var obsOcorrencias = hAPI.getCardValue("obsOcorrencias");
        var obsVendedor = hAPI.getCardValue("obsVendedor");
            
    
        if(nextSequenceId==5){     
    
            // if (problema !== "" && problema !== null && colleagueId == usuario)
            if (obs !== null){     
                hAPI.setTaskComments(usuario, num_processo, 0, obs); 
            } 
            
        } 
    
        if(nextSequenceId==13){
    
            if (obsOcorrencias !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsOcorrencias); 
        }
    
       }
    
        if(nextSequenceId==21){
    
            if (obsVendedor !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsVendedor); 
    }
    
    }
    
   
        }