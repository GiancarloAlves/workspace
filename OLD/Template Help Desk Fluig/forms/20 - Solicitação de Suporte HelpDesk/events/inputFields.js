function inputFields(form){
	
	log.info("inputFields diz: inicio");
	/*var fields = getFieldsFromTable(form, "tblCotacao", "txtvalidade");
	
	for(var i=0; i<fields.length; i++){
		var field = fields[i];		
		toBrazilianFormmat(form, field);
	}*/
	
	
	toBrazilianFormmat(form, "txt_data");
	
	log.info("inputFields diz: fim");
	
}

/**
 * Formata a data para o formato brasileiro caso esteja no formato universal.
 * 
 * @param form: Variavel padrao do evento.
 * @param fieldName: Nome do campo com data.
 * @returns void.
 */
function toBrazilianFormmat(form, fieldName){
	log.info("inputFields/toBrazilianFormmat diz: fieldName = "+fieldName);
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	var isUnformmated = form.getValue(fieldName).match(regEx);
	log.info("inputFields/toBrazilianFormmat diz: isUnformmated = "+isUnformmated); 
	
	if(isUnformmated){
		var split = form.getValue(fieldName).split('-');
		var formmated = split[2]+"/"+split[1]+"/"+split[0];
		
		log.info("inputFields/toBrazilianFormmat diz: formmated = "+formmated);
		
		form.setValue(fieldName, formmated);
	}
}