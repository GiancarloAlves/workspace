function afterTaskCreate(colleagueId){
	var sequenceId = getValue("WKNextState");
	log.info("fn afterTaskCreate");
	log.info("sequenceId=" + sequenceId);

    if (sequenceId == ATIV_TRATAR_CHAMADO){
		var data = new Date();
		
		var formato = new java.text.SimpleDateFormat('HH:mm:ss');
		var dateTime = formato.format(new java.util.Date());
					
		var time = dateTime.split(":");
		var seconds = (parseInt(time[0]) * 60 + parseInt(time[1])) * 60 + parseInt(time[2]);
	    
		var sla = hAPI.getCardValue("txt_sla");
		
	    //Calcula o prazo
	    var obj = hAPI.calculateDeadLineHours(data, seconds, sla, "Default");
	    var dt = obj[0];
	    var segundos = obj[1];
	  
	    //Recupera o numero da solicitação
	    var processo = getValue("WKNumProces");
	  
	    //Altera o prazo do processo
	    hAPI.setDueDate(processo,0,colleagueId, dt, segundos);
    }
}
