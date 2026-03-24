function afterTaskComplete(colleagueId,nextSequenceId,userList){
       
    var num_processo = getValue ("WKNumProces");     
    var usuario = getValue ("WKUser"); 

    var obsVendedor = hAPI.getCardValue("obsVendedor");
    var obsSuperv = hAPI.getCardValue("obsSuperv");
    var obsGerente = hAPI.getCardValue("obsGerente");
    var obsColeta = hAPI.getCardValue("obsColeta");
    var obsRevisaoColeta = hAPI.getCardValue("obsRevisaoColeta");
    var obsMaterialParado = hAPI.getCardValue("obsMaterialParado");
    var obsRH = hAPI.getCardValue("obsRH");
    var observacaoCompras = hAPI.getCardValue("observacaoCompras");
    var obsLogistica = hAPI.getCardValue("obsLogistica");

    if(nextSequenceId==23){     

        if (obsVendedor !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsVendedor);
        }        
    } 

    if(nextSequenceId==54){

        if (obsSuperv !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsSuperv);
        }
    }

    if(nextSequenceId==131){
        if (obsGerente !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsGerente);
        }
    }

    if(nextSequenceId==85){

        if (obsColeta !== "") {
            hAPI.setTaskComments(usuario, num_processo, 1, obsColeta);
        }
    }

    if(nextSequenceId==47){

        if (obsRevisaoColeta !== "") {
            hAPI.setTaskComments(usuario, num_processo, 1, obsRevisaoColeta);
        }
    }

    if(nextSequenceId==91){

        if (obsMaterialParado !== "") {
            hAPI.setTaskComments(usuario, num_processo, 1, obsMaterialParado);
        }
    }

    if(nextSequenceId==69){

        if (obsRH !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsRH);
        }
    }

    if(nextSequenceId==65 || nextSequenceId==20){

        if (observacaoCompras !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, observacaoCompras);
        }
    }

    if(nextSequenceId==178){

        if (obsLogistica !== "") {
            hAPI.setTaskComments(usuario, num_processo, 0, obsLogistica);
        }        
    } 



}












