function afterProcessFinish(processId) {
	// data termino
	var data_transtermino = new Date();
	log.info("Data termino: " + hAPI.getCardValue("date_terminoatividade"));
	var arrdatatermino = hAPI.getCardValue("date_terminoatividade").split("/");
	var mestermino = arrdatatermino[1];
	var diatermino = arrdatatermino[0];
	var anotermino = arrdatatermino[2];

	data_transtermino.setDate(diatermino);
	data_transtermino.setMonth(parseInt(mestermino - 1));
	data_transtermino.setFullYear(anotermino);
	data_transtermino.setHours(0, 0, 0, 0, 0);
	log.info("Datatrans termino: " + data_transtermino);

	// data finalizada
	var data_transfinal = new Date();
	log.info("Data finalizada: " + hAPI.getCardValue("data_finalizacao"));
	var arrdatafinal = hAPI.getCardValue("data_finalizacao").split("-");
	var mesfinal = arrdatafinal[1];
	var diafinal = arrdatafinal[2];
	var anofinal = arrdatafinal[0];

	data_transfinal.setDate(diafinal);
	data_transfinal.setMonth(parseInt(mesfinal - 1));
	data_transfinal.setFullYear(anofinal);
	data_transfinal.setHours(0, 0, 0, 0, 0);
	log.info("Datatrans final: " + data_transfinal);

	if (data_transfinal <= data_transtermino) {

		hAPI.setCardValue("txt_pontuacao", parseFloat(hAPI
				.getCardValue("txt_pontuacaoprioridade")
				* hAPI.getCardValue("txt_noprazo") / 100));
		log.info("Pontuacao alcanda: " + hAPI.getCardValue("txt_pontuacao"));

	} else {
		hAPI.setCardValue("txt_pontuacao", parseFloat(hAPI
				.getCardValue("txt_pontuacaoprioridade")
				* hAPI.getCardValue("txt_foraprazo") / 100));
		log.info("Pontuacao alcanda: " + hAPI.getCardValue("txt_pontuacao"));

	}
}