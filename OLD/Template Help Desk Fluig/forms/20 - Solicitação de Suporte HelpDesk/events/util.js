function formatadata(strData) {
	var diames = parseInt(strData);

	if (diames < 10) {
		strData = '0' + strData;
	}

	return strData;
}

/**
 * Retorna Nome do Usu?rio
 * 
 * @param user Id do Usu?rio Logado
 * 
 * @returns Nome do Usu?rio
 */
function buscarNomeUsuario(user) {
	var userName = "";
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	if (dataset.rowsCount == 1) {
		userName = dataset.getValue(0, "colleagueName");
	}
	return userName;
}

function buascarEmailUsuario(user){
	var email = "";
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	if (dataset.rowsCount == 1) {
		email = dataset.getValue(0, "mail");
	}
	
	return email;
}
