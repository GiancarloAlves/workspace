function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var arrayMsg = [];

	if(atividadeAtual == ATIV_INICIAL || atividadeAtual == ATIV_REGISTRAR_CHAMADO){
		arrayMsg = vf_abertura(form, arrayMsg);	
	} else if(atividadeAtual == ATIV_ANALISAR_CHAMADO){
		arrayMsg = vf_analisarChamado(form, arrayMsg);
		
		arrayMsg = vf_acionarPrestador(form, arrayMsg);
	} else if(atividadeAtual == ATIV_ATENDER_CHAMADO || atividadeAtual == ATIV_TRATAR_CHAMADO){
		arrayMsg = vf_atenderChamado(form, arrayMsg);
	} else if(atividadeAtual == ATIV_APROVAR_CHAMADO){
		arrayMsg = vf_aprovarChamado(form, arrayMsg);
	}
	
	/*
	}  else if(atividadeAtual == ATIV_ACIONAR_PRESTADOR){
		arrayMsg = vf_acionarPrestador(form, arrayMsg);
	}
	*/	
	
	if (arrayMsg.length > 0) {
		var msg = "Favor informar os seguintes campos:\n";

		var msgFinal = msg + "\n- " + arrayMsg.join("\n- ") + "\n";

		throw (msgFinal);
	}
}

function vf_abertura(form, arrayMsg){
	if (form.getValue("txt_categoria") == "") {
		arrayMsg.push("Categoria");
	}

	if (form.getValue("txt_problema") == "") {
		arrayMsg.push("Descrição do chamado");
	}
	
	return arrayMsg;
}

function vf_analisarChamado(form, arrayMsg){
	if (form.getValue("txt_atendimento") == "") {
		arrayMsg.push("Atendimento");
	}
	
	return arrayMsg;
}

function vf_atenderChamado(form, arrayMsg){
	if (form.getValue("txt_resolucao") == "") {
		arrayMsg.push("Resolução");
	}
	
	return arrayMsg;
}

function vf_aprovarChamado(form, arrayMsg){
	var txt_aprovacao = form.getValue("txt_aprovacao");
	
	if (txt_aprovacao == "") {
		arrayMsg.push("Aprovado?");
	} else if(txt_aprovacao == "nao" && form.getValue("txt_justificativa") == ""){
		arrayMsg.push("Justificativa");
	}
	
	return arrayMsg;
}

function vf_acionarPrestador(form, arrayMsg){
	if (form.getValue("txt_atendimento") == "inloco" && (form.getValue("txt_site") == "" || form.getValue("txt_site") == null)) {
		arrayMsg.push("Site");
	}
	
	return arrayMsg;
}
