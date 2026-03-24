function onNotify(subject, receivers, template, params) {
	
	var ATIVIDADE = hAPI.getCardValue('txt_descatividade');
	var PRAZO     = hAPI.getCardValue('date_terminoatividade');
    var msg       = "Tarefa - "+ ATIVIDADE +" até "+ PRAZO;
	
	// BUSCAR DADOS DA TABELA PAI-FILHA ONDE ESTÃO LANÇADAS AS MOVIMENTAÇÕES DO COLABORADOR
    var numProcess = getValue("WKNumProces");
    
    // Busca a Lista com o número da solicitação dos filhos
    var childrenProcess = hAPI.getChildrenInstances(numProcess);
 
    // Busca os dados do formulário da solicitação filha
    var childCardData = hAPI.getCardData(childrenProcess.get(childrenProcess.size()));
 
    // Replica um dado do formulário da solicitação filha para o formulário da solicitação pai
    var my_date  = childCardData.get("date_Status");
    var my_Espec = childCardData.get("txtEspecificacao");
    
    // SE TEM MSG NO ULTIMO MOVIMENTO ADICIONA EM SUBJECT
    if (my_Espec !=null) {
    	msg = msg +(" em "+my_date+" obs "+my_espec);
    }
    
    // SUBJECT
	subject.add( msg );	
}