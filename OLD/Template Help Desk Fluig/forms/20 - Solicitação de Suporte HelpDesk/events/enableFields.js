function enableFields(form){
	var atividadeAtual = getValue("WKNumState");
	
	ef_dadosSolicitante( form );
	
	if(atividadeAtual != ATIV_INICIAL && atividadeAtual != ATIV_REGISTRAR_CHAMADO){
		ef_dadosSolicitacao( form );	
	}
	
	if(atividadeAtual != ATIV_ANALISAR_CHAMADO){
		ef_analisePrestador( form );
		
		ef_site( form );
	}
	
	if(atividadeAtual != ATIV_ATENDER_CHAMADO && atividadeAtual !=  ATIV_TRATAR_CHAMADO){
		ef_resolucao( form );
	}
	
	if(atividadeAtual != ATIV_APROVAR_CHAMADO){
		ef_aprovacao( form );
	}

	/*
	if(atividadeAtual != ATIV_ACIONAR_PRESTADOR){
		ef_site( form );
	}
	*/
}

function ef_dadosSolicitante( form ){
	form.setEnabled("txt_solicitante", false);	
	form.setEnabled("txt_numsolicita", false);
	form.setEnabled("txt_emailsolicitante", false);
	form.setEnabled("txt_data", false);
	form.setEnabled("txt_hora", false);
}

function ef_dadosSolicitacao( form ){
	form.setEnabled("txt_categoria", false);
	form.setEnabled("txt_problema", false);
}

function ef_analisePrestador( form ){
	form.setEnabled("txt_atendimento", false);
	form.setEnabled("txt_analise", false);
}

function ef_site( form ){
	form.setEnabled("txt_site", false);
	form.setEnabled("txt_grupo", false);
	form.setEnabled("txt_sla", false);
}

function ef_resolucao( form ){
	form.setEnabled("txt_resolucao", false);
}

function ef_aprovacao( form ){
	form.setEnabled("txt_aprovacao", false);
	form.setEnabled("txt_justificativa", false);
}