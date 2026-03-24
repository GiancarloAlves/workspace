function enableFields(form) {
	var ativ = getValue("WKNumState");

	if (ativ == FIM) {
		form.setEnabled("txt_projeto", false);
		
		form.setEnabled("txt_Setor", false);
		form.setEnabled("txt_descatividade", false);
		form.setEnabled("txt_loginresp", false);
		form.setEnabled("txt_prioridade", true);
		form.setEnabled("txt_pontuacao", false);
		form.setEnabled("date_inicioatividade", false);
		form.setEnabled("date_terminoatividade", false);
		form.setEnabled("txt_arquivarpasta", false);
		form.setEnabled("txt_pontuacao_dis", false);
		
		
		bloquearTBatividades(form);
	} else if (ativ == EXECUTAR_ATIVIDADES) {
		form.setEnabled("txt_projeto", false);
		form.setEnabled("txt_Setor", false);
		form.setEnabled("date_inicioatividade", false);
		form.setEnabled("date_terminoatividade", false);
		
		bloquearTBatividades(form);
	} else if (ativ <= ADICIONAR_TAREFAS) {
		form.setEnabled("date_reprogramacao", false);
		//form.setEnabled("data_finalizacao", false);
	}
}

function bloquearTBatividades(form){
	log.info('entrei na fn bloquearTBatividades');
	
	var indexes = form.getChildrenIndexes("tbatividades");

	for ( var i in indexes) {
		bloquearLinhaTBatividades(form, indexes[i]);
	}
	
	log.info('fim da fn bloquearTBatividades');
}

function bloquearLinhaTBatividades(form, index){
	log.info('entrei na fn bloquearLinhaTBatividades');
	
	var sufixoNome = '___' + index;
	
	form.setEnabled("atividadeId" + sufixoNome, false);
	form.setEnabled("dtprazoativ" + sufixoNome, false);
	form.setEnabled("nomeativ" + sufixoNome, false);
	form.setEnabled("txtrespativ" + sufixoNome, false);
	form.setEnabled("criacaoAdHoc" + sufixoNome, false);
}

