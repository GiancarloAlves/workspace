function afterTaskComplete(colleagueId,nextSequenceId,userList){  
             
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");   
    
        var wms = hAPI.getCardValue("statuswms");
        var pedido = hAPI.getCardValue("status");
        
        var statuswms = "Status WMS: " + wms;
        var statuspedido = "Status pedido: " + pedido;
        var prazoperdido = "Pedido já integrou e entrou em separação. Processo de cancelamento de pedido não pode ser mais realizado. É necessário abrir cancelamento de NF agora."
        var fimok = "Fim - cancelado com sucesso"
        var gerenterep = "Fim - gerente reprovou"
        var nintegrou = "Não integrou e foi cancelado pelo gerente"
            
        if(nextSequenceId==18){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, statuswms); 
            hAPI.setTaskComments(usuario, num_processo, 0, statuspedido); 
                    
        } 
    
        if(nextSequenceId==25){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, statuswms); 
            hAPI.setTaskComments(usuario, num_processo, 0, statuspedido); 
                    
        } 
    
        if(nextSequenceId==31){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, statuswms); 
            hAPI.setTaskComments(usuario, num_processo, 0, statuspedido); 
                    
        } 
    
        if(nextSequenceId==9){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, statuswms); 
            hAPI.setTaskComments(usuario, num_processo, 0, statuspedido); 
                    
        } 
    
        if(nextSequenceId==35){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, statuswms); 
            hAPI.setTaskComments(usuario, num_processo, 0, statuspedido); 
                    
        }      

        if(nextSequenceId==47){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, prazoperdido); 
                    
        }   

        if(nextSequenceId==13){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, fimok); 
                    
        } 
        
        if(nextSequenceId==38){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, gerenterep); 
                    
        }   

        if(nextSequenceId==52){     
    
            hAPI.setTaskComments(usuario, num_processo, 0, nintegrou); 
                    
        }   
    
}