function afterTaskComplete(colleagueId,nextSequenceId,userList){

        var numState = getValue("WKNumState");
        var process = getValue("WKNumProces");
        var anexado = false;
        var message = "";
    
        var num_processo = getValue ("WKNumProces");     
        var usuario = getValue ("WKUser");
    
        // variáveis de observação
        var observacao = hAPI.getCardValue("observacao");  
        var obs_separacao = hAPI.getCardValue("obs_separacao");  
        var obs_recebimento = hAPI.getCardValue("obs_recebimento");
        var obs_embarque = hAPI.getCardValue("obs_embarque");
        var obs_standby = hAPI.getCardValue("obs_standby");
        var obs_remessa = hAPI.getCardValue("obs_remessa");
        var credito = hAPI.getCardValue("credito");
    
       
        var agente = hAPI.getCardValue("matAgente");
        var gerente = hAPI.getCardValue("matSupervisor");
    
               
        if(nextSequenceId==4){     
    
            // if (problema !== "" && problema !== null && colleagueId == usuario)
            if (observacao !== null){     
                hAPI.setTaskComments(usuario, num_processo, 0, observacao); 
            } 
            
        } 
    
        if(nextSequenceId==5){// na etapa de separação
    
            if (obs_separacao !== "") {
            hAPI.setTaskComments(agente, num_processo, 0, obs_separacao); 
        }
    }
    
        if(nextSequenceId==10){ //na etapa de emissão da NF de devolução
    
            if (obs_recebimento !== "") {
            hAPI.setTaskComments(gerente, num_processo, 0, obs_recebimento); 
    }
    
    }
    
        if(nextSequenceId==28){ //na etapa de embarque
    
            if (obs_embarque !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obs_embarque); 
        }
    
    }
    
        if(nextSequenceId==16){
    
            if (credito !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, credito); 
        }
    
    }
    
        if(nextSequenceId==8){
    
            if (obs_standby !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obs_standby); 
    }
    
    }      
    
        if(numState == 0 && hAPI.listAttachments().size() < 2) {
            message += "<br/>- É necessario anexar os documentos;"
        }
    
        if (numState == 1){ //etapa do processo
            if (temAnexo() == false) message += "<br/>- É necessario anexar os documentos;";
        }
    
        if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;
    
      
        function temAnexo(){        
            var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', process, process, ConstraintType.MUST);
            var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, new Array(constraintProcessAttachment), null);
    
            for(var i = 0; i < datasetProcessAttachment.rowsCount; i++) {
                var constraintProcessHistory1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', datasetProcessAttachment.getValue(i, "originalMovementSequence"), datasetProcessAttachment.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
                var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', process, process, ConstraintType.MUST);
                var constraintProcessHistory3 = DatasetFactory.createConstraint('processHistoryPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
                var constraintProcessHistory4 = DatasetFactory.createConstraint('stateSequence', numState, numState, ConstraintType.MUST);
                var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2, constraintProcessHistory3, constraintProcessHistory4), null);
                for(var j = 0; j < datasetProcessHistory.rowsCount; j++) {                
                    return true;            
                }    
            }
            return false;    
        }    
    }
