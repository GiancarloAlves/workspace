function afterTaskComplete(colleagueId,nextSequenceId,userList){

    // const EVENTO_INICIO = 4
    // const APROVACAO = 5
    // const FINANCEIRO = 6
    // const CONFIRMACAO = 14
    
             
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");   
        var obs1 = hAPI.getCardValue("obs");  
        var obs2 = hAPI.getCardValue("obs_supervisor");
        var obs3 = hAPI.getCardValue("obs_financeiro");
        
    
        if(nextSequenceId==5){     
    
            if (obs1 !== null){     
            hAPI.setTaskComments(usuario, num_processo, 0, obs1); 
            } 
            
        } 
    
        if(nextSequenceId==7){    
            if (obs2 !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obs2); 
            }          
        }
    
        if(nextSequenceId==15){
    
            if (obs3 !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obs3); 
           }
    
       }

        if(nextSequenceId==14){
    
            if (obs3 !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obs3); 
           }

       }
    
}