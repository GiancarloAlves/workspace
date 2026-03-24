function validateForm(form) {
	var atividadeAtual = getValue("WKNumState");

	var arrayMsg = [];

	if (atividadeAtual == 0 || atividadeAtual == ADICIONAR_TAREFAS
			|| atividadeAtual == EXECUTAR_ATIVIDADES) {
		arrayMsg = camposBody(form, arrayMsg);

		arrayMsg = camposTablename(form, arrayMsg);
	}

	if (arrayMsg.length > 0) {
		var msg = "Favor informar os seguintes campos:";

		var msgFinal = msg + "\n- " + arrayMsg.join("\n- ");

		throw (msgFinal);
	}
}

function camposBody(form, arrayMsg) {
	if (form.getValue("txt_projeto") == "" || form.getValue("txt_projeto") == null){
		arrayMsg.push("Projeto");
	} 

	if (form.getValue("txt_Setor") == "" || form.getValue("txt_Setor") == null){
		arrayMsg.push("Setor");
	}
	
	if (form.getValue("txt_descatividade") == ""){
		arrayMsg.push("Descrição da atividade");
	}
	
	if (form.getValue("txt_prioridade") == ""){
		arrayMsg.push("Prioridade");
	}
	
	if (form.getValue("date_inicioatividade") == ""){
		arrayMsg.push("Inicio da atividade");
	}	
	
	if (form.getValue("date_terminoatividade") == ""){
		arrayMsg.push("Termino da atividade");
	}

	return arrayMsg;
}

function camposTablename(form, arrayMsg) {
	var index = form.getChildrenIndexes("tbatividades");
	var linhaAtual = 0;
	var pos = '';
	var prefixo = 'Linha ';
	var txtrespativ = '';

	for ( var i in index) {
		linhaAtual++;
		pos = index[i];

		if (form.getValue("dtprazoativ___" + pos) == "") {
			arrayMsg.push(prefixo + linhaAtual + ' - Prazo');
		}
		
		if (form.getValue("nomeativ___" + pos) == "") {
			arrayMsg.push(prefixo + linhaAtual + ' - Descri&ccedil;&atilde;o');
		}
		
		txtrespativ = form.getValue("txtrespativ___" + pos);
		if (txtrespativ == "" || txtrespativ == null) {
			arrayMsg.push(prefixo + linhaAtual + ' - Respons&aacute;vel');
		}
	}
	
	if( linhaAtual == 0 ){
		arrayMsg.push("Insira uma tarefa");
	}

	return arrayMsg;
}