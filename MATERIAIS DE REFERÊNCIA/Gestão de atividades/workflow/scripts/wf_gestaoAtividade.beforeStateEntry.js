function beforeStateEntry(sequenceId) {
	var cardData = new java.util.HashMap();

	var userList = new java.util.ArrayList();
	userList.add(getValue("WKUser"));

	// GERAR TAREFAS
	if (sequenceId == EXECUTAR_ATIVIDADES || sequenceId == FEITO) {


		// criarAtividades(hAPI);

		reprogramacaoDeFinalizacao();

	}
}

// function criarAtividades(hAPI) {
// 	var processTarefa = getValue("WKNumProces");

// 	cardData = hAPI.getCardData(processTarefa);
// 	var keys = cardData.keySet().toArray();

// 	var txt_projeto = cardData.get("txt_projeto");

// 	var field = '';
// 	var index = '';
// 	var criacaoAdHoc = '';
// 	var hdnrespativ = '';
// 	var dtprazoativ = '';
// 	var nomeativ = '';
// 	var data_finalizacao = cardData.get("data_finalizacao");

// 	log.info('xxxbeforeStateEntry data_finalizacao=');
// 	log.info(data_finalizacao);

// 	for ( var key in keys) {
// 		field = keys[key];

// 		if (field.indexOf("nomeativ___") > -1) {
// 			index = field.replace("nomeativ___", "");

// 			// Criar solicitação Gestão de Atividade
// 			if (cardData.get("criacaoAdHoc___" + index) != 1) {

// 				// Regra de validacao
// 				validacaoAddRegistroEfinalizacao(data_finalizacao);

// 				// Responsavel pela atividade
// 				matriculaUser = cardData.get("hdnrespativ___" + index);

// 				// Data do prazo da atividade
// 				dtprazoativ = cardData.get("dtprazoativ___" + index);

// 				nomeAtividade = cardData.get("nomeativ___" + index);

// 				idSolicitacao = criarAtividade(hAPI, matriculaUser, processTarefa, dtprazoativ,
// 						nomeAtividade, txt_projeto);

// 				hAPI.setCardValue("criacaoAdHoc___" + index, 1);
// 				hAPI.setCardValue("atividadeId___" + index, idSolicitacao);
// 			}
// 		}
// 	}
// }

function validacaoAddRegistroEfinalizacao(data_finalizacao){
	if(data_finalizacao != '' && data_finalizacao != ' '){
		throw "Não é permitido finalizar a tarefa e adicionar atividade na mesma a&ccedil;&atilde;o!";
	}
}

// function criarAtividade(hAPI, matriculaUser, processTarefa, dtprazoativ,
// 		nomeAtividade, txt_projeto) {
// 	// código do processo;
// 	var processId = PROCESS_ATIVIDADES;

// 	// código da atividade de destino;
// 	var ativDest = '0';

// 	// lista (do tipo String) de usuários;
// 	var listaColab = new java.util.ArrayList();
// 	listaColab.add(matriculaUser);

// 	// texto da observação;
// 	var obs = 'Solicita&ccedil;&atilde;o criada autom&aacute;tica via processo gest&atilde;o de tarefas';

// 	// indica se deve completar a tarefa (true) ou apenas salvar (false);
// 	var completarTarefa = true;

// 	// um Mapa com os valores do formulário do processo;
// 	var valoresForm = new java.util.HashMap();
// 	valoresForm.put("txt_numGestaoTarefas", processTarefa.toString());
// 	valoresForm.put("txtrespativ", matriculaUser);
// 	valoresForm.put("prazo_conclusao", dtprazoativ);
// 	valoresForm.put("nomeativ", nomeAtividade);
// 	valoresForm.put("txt_projeto", txt_projeto);
// 	valoresForm.put("data_abertura", diaAtual());

// 	// indica que o usuário iniciará a solicitação como gestor (true) ou que o
// 	// usuário iniciará a solicitação apenas como solicitante (false).
// 	var modoGestor = false;

// 	// Retorna um mapa com informações da solicitação criada. Entre elas, o
// 	// iProcess que é o número da solicitação criada.
// 	var solicitacao = hAPI.startProcess(processId, ativDest, listaColab, obs, completarTarefa, valoresForm, modoGestor);

// 	solicitacaoId = solicitacao.get('iProcess');

// 	return solicitacaoId;
// }

function reprogramacaoDeFinalizacao() {
	// Gravar Numero de Reprogramação caso o mesmo seja alterado
	var ant_Reprogramacao = hAPI.getCardValue("cnt_date_Reprogramacao");
	var nov_Reprogramacao = hAPI.getCardValue("date_reprogramacao");

	// SE AS DATAS ESTÃO DIFERENTES SOMAR 1
	if (ant_Reprogramacao != nov_Reprogramacao) {
		var Num = parseInt(hAPI.getCardValue("txt_NumReprogramacao")) + 1;

		hAPI.setCardValue("txt_NumReprogramacao", Num);
		hAPI.setCardValue("cnt_date_Reprogramacao", nov_Reprogramacao);
	}
}

function buscarIdSolicitacao() {
	return getParametro("WKNumProces");
}

function buscarEmpresa() {
	return getParametro("WKCompany");
}

function diaAtual() {
	var data = new Date();
	var dia = data.getDate();

	if (dia.toString().length == 1) {
		dia = "0" + dia;
	}

	var mes = data.getMonth() + 1;

	if (mes.toString().length == 1) {
		mes = "0" + mes;
	}

	var ano = data.getFullYear();

	return dia + "/" + mes + "/" + ano;
}

function validacaoTarefaPendente() {
	log.info("beforeStateEntry fn buscarStatusTarefas");

	var processAtividade = getValue("WKNumProces");

	var cardData = new java.util.HashMap();
	cardData = hAPI.getCardData(processAtividade);
	var keys = cardData.keySet().toArray();

	var field = '';
	var index = '';
	var flag_tarefa = '';

	for ( var key in keys) {
		field = keys[key];

		if (field.indexOf("nomeativ___") > -1) {
			index = field.replace("nomeativ___", "");

			flag_tarefa = cardData.get("flag_tarefa___" + index);

			// Bloquear movimentacao da solicitacao Gestao de tarefas
			if (flag_tarefa == "1" || flag_tarefa == "2") {
				throw "N&atilde;o foi poss&iacute;vel finalizar a atividade, existem tarefas pendentes!";
			}
		}
	}
}