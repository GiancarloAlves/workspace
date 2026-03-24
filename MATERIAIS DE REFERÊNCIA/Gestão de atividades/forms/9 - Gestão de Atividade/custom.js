$(function(){
	blockSelect();
});

function verificaDataFinal(obj) {
	var data_transinicio = new Date();
	var strSearch = document.getElementById("date_inicioatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("-");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[2];
		var anoinicio = arrdatainicio[0];
	} else {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("/");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[0];
		var anoinicio = arrdatainicio[2];
	}
	data_transinicio.setDate(parseInt(diainicio * 1));
	data_transinicio.setMonth(parseInt(mesinicio - 1));
	data_transinicio.setFullYear(anoinicio);
	data_transinicio.setHours(0, 0, 0, 0, 0);

	var data_transfinal = new Date();
	var strSearch = document.getElementById("data_finalizacao").value
			.search("-");
	if (strSearch != -1) {
		var arrdatafinal = document.getElementById("data_finalizacao").value
				.split("-");
		var mesfinal = arrdatafinal[1];
		var diafinal = arrdatafinal[2];
		var anofinal = arrdatafinal[0];

	} else {
		var arrdatafinal = document.getElementById("data_finalizacao").value
				.split("/");

		var mesfinal = arrdatafinal[1];
		var diafinal = arrdatafinal[0];
		var anofinal = arrdatafinal[2];
	}
	data_transfinal.setDate(diafinal);
	data_transfinal.setMonth(parseInt(mesfinal - 1));
	data_transfinal.setFullYear(anofinal);
	data_transfinal.setHours(0, 0, 0, 0, 0);

	if (data_transinicio > data_transfinal) {
		document.getElementById("data_finalizacao").value = "";
		alert("A data de finalização não poderá ser inferior a data de inicio da atividade.");
	}
}

function verificaDataReprograma(obj) {
	if($('#date_reprogramacao').val() == ""){
		return false;
	}
	
	var data_transtermino = new Date();
	var strSearch = document.getElementById("date_terminoatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("-");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[2];
		var anotermino = arrdatatermino[0];
	} else {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("/");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[0];
		var anotermino = arrdatatermino[2];
	}
	data_transtermino.setDate(diatermino);
	data_transtermino.setMonth(parseInt(mestermino - 1));
	data_transtermino.setFullYear(anotermino);
	data_transtermino.setHours(0, 0, 0, 0, 0);

	var data_transrep = new Date();
	var strSearch = document.getElementById("date_reprogramacao").value
			.search("-");
	if (strSearch != -1) {
		var arrdatarep = document.getElementById("date_reprogramacao").value
				.split("-");
		var mesrep = arrdatarep[1];
		var diarep = arrdatarep[2];
		var anorep = arrdatarep[0];

	} else {
		var arrdatarep = document.getElementById("date_reprogramacao").value
				.split("/");
		var mesrep = arrdatarep[1];
		var diarep = arrdatarep[0];
		var anorep = arrdatarep[2];
	}

	data_transrep.setDate(diarep);
	data_transrep.setMonth(parseInt(mesrep - 1));
	data_transrep.setFullYear(anorep);
	data_transrep.setHours(0, 0, 0, 0, 0);

	if (data_transtermino > data_transrep) {

		document.getElementById("date_reprogramacao").value = obj.value;
		alert("A data de reprogramação não poderá ser superior a data de termino da atividade.");
	}
}

function verificaDataTermino(obj) {
	var data_transtermino = new Date();
	var strSearch = document.getElementById("date_terminoatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("-");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[2];
		var anotermino = arrdatatermino[0];
	} else {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("/");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[0];
		var anotermino = arrdatatermino[2];
	}

	data_transtermino.setDate(diatermino);
	data_transtermino.setMonth(parseInt(mestermino - 1));
	data_transtermino.setFullYear(anotermino);
	data_transtermino.setHours(0, 0, 0, 0, 0);

	var data_transinicio = new Date();
	var strSearch = document.getElementById("date_inicioatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("-");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[2];
		var anoinicio = arrdatainicio[0];

	} else {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("/");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[0];
		var anoinicio = arrdatainicio[2];
	}
	data_transinicio.setDate(diainicio);
	data_transinicio.setMonth(parseInt(mesinicio - 1));
	data_transinicio.setFullYear(anoinicio);
	data_transinicio.setHours(0, 0, 0, 0, 0);

	if (data_transinicio > data_transtermino) {
		document.getElementById("date_terminoatividade").value = "";
		alert("A data de término não pode ser inferior a data de inicio.");
	}
}

function verificaDataInicio(obj) {
	var data_transtermino = new Date();
	var strSearch = document.getElementById("date_terminoatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("-");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[2];
		var anotermino = arrdatatermino[0];
	} else {
		var arrdatatermino = document.getElementById("date_terminoatividade").value
				.split("/");
		var mestermino = arrdatatermino[1];
		var diatermino = arrdatatermino[0];
		var anotermino = arrdatatermino[2];
	}

	data_transtermino.setDate(diatermino);
	data_transtermino.setMonth(parseInt(mestermino - 1));
	data_transtermino.setFullYear(anotermino);
	data_transtermino.setHours(0, 0, 0, 0, 0);

	var data_transinicio = new Date();
	var strSearch = document.getElementById("date_inicioatividade").value
			.search("-");
	if (strSearch != -1) {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("-");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[2];
		var anoinicio = arrdatainicio[0];
	} else {
		var arrdatainicio = document.getElementById("date_inicioatividade").value
				.split("/");
		var mesinicio = arrdatainicio[1];
		var diainicio = arrdatainicio[0];
		var anoinicio = arrdatainicio[2];
	}
	data_transinicio.setDate(diainicio);
	data_transinicio.setMonth(parseInt(mesinicio - 1));
	data_transinicio.setFullYear(anoinicio);
	data_transinicio.setHours(0, 0, 0, 0, 0);

	if (data_transinicio > data_transtermino) {
		document.getElementById("date_inicioatividade").value = "";
		alert("A data de início não pode ser superior a data de término.");
	}
}

function setSelectedZoomItem(selectedItem) {
	if (selectedItem["inputId"] == "txt_nomeresponsavel") {
		document.getElementById("txt_loginresp").value = selectedItem["colleagueId"];
	} else if (selectedItem["inputId"] == "txt_solpai") {
		document.getElementById("txt_iniciopai").value = selectedItem["date_inicioatividade"];
	}
}

function buscaLogin(obj) {
	var idColleague = obj.value;
	var filter = new Object();

	filter["colleaguePK.colleagueId"] = idColleague;
	var colleagues = DatasetFactory.getDatasetValues("colleague", filter);

	if (colleagues.length > 0) {
		document.getElementById("txt_nomeresponsavel").value = colleagues[0].colleagueName;
	} else {
		document.getElementById("txt_nomeresponsavel").value = "";
	}
}

function adicionaLinha(tbl) {
	var index = wdkAddChild(tbl);

	FLUIGC.calendar('#dtprazoativ___' + index);
}

function removeLinha(el) {
	fnWdkRemoveChild(el);
}

function blockSelect(){
	if(getWKNumState() == 4 || getWKNumState() == 0){
		$("#aprovado").attr("readonly",true);
		$("#aprovado").css("pointer-events","none");
	}

}