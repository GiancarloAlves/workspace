function displayFields(form,customHTML){
	form.setShowDisabledFields(true);
	
	var numAtividade = getValue("WKNumState");

	if( numAtividade == ATIV_INICIAL ){
		setCampoSolicitante( form );
		
		setCampoEmailSolicitante( form );
		
		setCampoDataHora( form );
		
		ocultarBlocoAnalisePrestador( form );
		
		ocultarBlocoSite( form );
		
		ocultarBlocoResolucao( form );
		
		ocultarBlocoAprovacao( form );
	} else if( numAtividade == ATIV_REGISTRAR_CHAMADO){
		setNumSolicitacao( form );
		
		ocultarBlocoAnalisePrestador( form );
		
		ocultarBlocoSite( form );
		
		ocultarBlocoResolucao( form );
		
		ocultarBlocoAprovacao( form );
	} else if(numAtividade == ATIV_ANALISAR_CHAMADO){
		setNumSolicitacao( form );
		
		//ocultarBlocoSite( form );
		validarBlocoSite( form );
		
		ocultarBlocoResolucao( form );
		
		ocultarBlocoAprovacao( form );
	} else if(numAtividade == ATIV_ATENDER_CHAMADO){
		ocultarBlocoSite( form );
		
		validarBlocoAprovacao( form );
	} else if(numAtividade == ATIV_APROVAR_CHAMADO){
		ocultarBlocoAnalisePrestador( form );
		
		ocultarBlocoSite( form );
	} else if(numAtividade == ATIV_FINALIZAR_CHAMADO){
		validarBlocoSite( form );
/*
	} else if(numAtividade == ATIV_ACIONAR_PRESTADOR){
		ocultarBlocoResolucao( form );
		
		ocultarBlocoAprovacao( form );
*/
	} else if(numAtividade == ATIV_TRATAR_CHAMADO){
		validarBlocoAprovacao( form );
	}
}

function setNumSolicitacao( form ){
	var txt_numsolicita = form.getValue("txt_numsolicita");
	
	if(txt_numsolicita == ""){
		var numprocesso = getValue("WKNumProces");
		form.setValue("txt_numsolicita", numprocesso);
	}
}

function setCampoSolicitante( form ){
	form.setValue("txt_solicitante", buscarNomeUsuario( getValue("WKUser") ) );
}

function setCampoEmailSolicitante( form ){
	form.setValue("txt_emailsolicitante", buascarEmailUsuario( getValue("WKUser") ) );	
}

function setCampoDataHora( form ){
	var dataatual = new Date();
	
	form.setValue("txt_data", formatadata(dataatual.getDate())+"/"+formatadata(parseInt(dataatual.getMonth()+1))+"/"+dataatual.getFullYear());
	form.setValue("txt_hora", formatadata(dataatual.getHours())+":"+formatadata(dataatual.getMinutes()));
}

function ocultarBlocoAnalisePrestador( form ){
	form.setVisibleById( "blocoAnalisePrestador", false );
}

function ocultarBlocoSite( form ){
	form.setVisibleById( "blocoSite", false );
}

function validarBlocoSite( form ){
	if(form.getValue("txt_atendimento") != "inloco"){
		ocultarBlocoSite( form );
	}
}

function ocultarBlocoResolucao( form ){
	form.setVisibleById( "blocoResolucao", false );
}

function ocultarBlocoAprovacao( form ){
	form.setVisibleById( "blocoAprovacao", false );
}

function validarBlocoAprovacao( form ){
	if(form.getValue("txt_aprovacao") != "nao"){
		ocultarBlocoAprovacao( form );
	}
}
