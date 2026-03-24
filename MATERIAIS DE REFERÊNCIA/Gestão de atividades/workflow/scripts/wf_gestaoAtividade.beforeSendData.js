function beforeSendData(customFields, customFacts) {
	customFields[0]  = hAPI.getCardValue( "txt_projeto" );
	customFields[2]  = hAPI.getCardValue( "txt_descatividade" );
	customFields[4]  = hAPI.getCardValue( "txt_areaprojeto" );
	customFields[6]  = hAPI.getCardValue( "txt_nomeresponsavel" );
	customFields[7]  = hAPI.getCardValue( "txt_descpriorid" );
	customFields[8]  = hAPI.getCardValue( "txt_pontuacao_dis" );
	customFields[9]  = hAPI.getCardValue( "txt_pontuacao" );
	customFields[10] = hAPI.getCardValue( "date_inicioatividade" );
	customFields[11] = hAPI.getCardValue( "date_terminoatividade" );
	customFields[12] = hAPI.getCardValue( "date_reprogramacao" );
	customFields[13] = hAPI.getCardValue( "data_finalizacao" );

}
