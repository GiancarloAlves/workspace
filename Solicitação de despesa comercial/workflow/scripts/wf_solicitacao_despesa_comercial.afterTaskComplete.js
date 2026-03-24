function afterTaskComplete(colleagueId,nextSequenceId,userList){
               
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");   
        var obsvendedor = hAPI.getCardValue("obsvendedor");  
        var obsgerente = hAPI.getCardValue("obsgerente");
        var obscp = hAPI.getCardValue("obscp");
        var obsreaval = hAPI.getCardValue("obsreaval");
        
        if(nextSequenceId==5){    
            if (obsvendedor !== ""){     
            hAPI.setTaskComments(usuario, num_processo, 0, obsvendedor); 
            } 
        }
    
        if(nextSequenceId==9){    
            if (obsgerente !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsgerente); 
            }          
        }
    
        if(nextSequenceId==16){    
            if (obscp !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obscp); 
           }    
       }

        if(nextSequenceId==7){    
            if (obsreaval !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsreaval); 
           }
       }
}