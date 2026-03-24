
function displayFields(form, customHTML) {
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	form.setShowDisabledFields(true);
	
	dataInicial(form);
	
	var atividadeAtual = getValue('WKNumState');

	if(atividadeAtual == 0 || atividadeAtual == 4){
		ocultarCamposInicial(form, customHTML);	
	} else if(atividadeAtual == 17){
		restartPage(form);
	} else{
		ocultarBtn( form );
	}
}

function restartPage(form){
	log.info("display ->  restartPage=" + form.getValue('restartPage'));
	
	if(form.getValue('restartPage') == 1){
		form.setValue('restartPage', 2);
	} else if(form.getValue('restartPage') == 2){
		form.setValue('restartPage', "");
	}
}

function dataInicial(form){
	var dataAtual = new Date();

	if (form.getValue("date_inicioatividade").trim() == ""
			&& form.getValue("date_terminoatividade").trim() == "") {
		var ano = dataAtual.getFullYear();
		var mes = pad(parseInt(dataAtual.getMonth() + 1));
		var dia = pad(dataAtual.getDate());
		var data = ano + "-" + mes + "-" + dia;

		form.setValue("date_inicioatividade", data);
		form.setValue("date_terminoatividade", data);
	}	
}

function ocultarCamposInicial(form, customHTML){
    customHTML.append("<script type='text/javascript'>");
    //customHTML.append('$(function(){ '); //  não funciona no mobile
    	customHTML.append('setTimeout(function() { ');
    		customHTML.append("$('.bloco_executarTarefa').hide();");
    	customHTML.append('}, 2000 ); ');
    //customHTML.append('});'); //  não funciona no mobile
    customHTML.append("</script>");
}

function ocultarBtn( form ){
	form.setVisibleById("btn_NovaTAREFA", false);
}