setTimeout(function() { 
	 init();
	}, 2000
);

function init(){
	adicionarCalendario();
	
	//excluirPaixFilho();
	ocultarBtnExcluir();
	
	carregarPrioridade();
	
	carregarIdentificador();
	
	FLUIGC.calendar('#meetingDate', {
		minDate: new Date(),
	});

	FLUIGC.calendar('#dueDate', {
		minDate: new Date(),
	});
	
	$("div.container").show();
	
	queryParams = getQueryParams(document.location.search);

	if (queryParams.WKNumState > 0) {
		$("#divMSG").show();
	} else {
		$("#divAtividades").show();
	}
}

/*$(function() {

});*/

function ocultarBtnExcluir(){
	var i = 1;
	
	$('.bnt_RemoveTAREFA').each(function(){
		var objBtn = $(this);
		
		if(i > 1){	
			if($(this).siblings("[name*=criacaoAdHoc___]").val() == 1){
				// Oculta o botao de excluir a tarefa
				objBtn.hide();
			}
		}
		
		i++;
	});
}

function adicionarCalendario(){
	FLUIGC.calendar('#date_inicioatividade');
	FLUIGC.calendar('#date_terminoatividade');
	
	FLUIGC.calendar('#date_reprogramacao');
	FLUIGC.calendar('#data_finalizacao');	
}

function carregarIdentificador(){
	$("[name=txt_prioridade]").change(function(){
		setIdentificador();
	});
}

function setSelectedZoomItem(selectedItem) {
	setIdentificador();	
}

function setIdentificador(){
	var prioridade = $("[name=txt_prioridade]:checked").val();
	var nomeProjeto = $("[name=txt_projeto]").val();
	
	var identificador = prioridade == undefined ? nomeProjeto : prioridade + " - " + nomeProjeto;
	
	$("[name=campo_descritor]").val(identificador);
}

function carregarPrioridade(){
	var prioridade = $("[name=txt_prioridade]:checked").val();
	
	if(prioridade != undefined){
		var prefixo = "lbl_";

		$("#" + prefixo + prioridade).addClass("active");		
	}	
}

function setSelectedZoomItem(selectedItem){
	if(selectedItem.inputName.indexOf('txtrespativ___') == 0){
		var index = selectedItem.inputId.split('___')[1];
		$('#hdnrespativ___' + index).val(selectedItem.colleagueId);
	} else if(selectedItem.inputName.indexOf('txt_projeto') == 0){
		$('#txt_numeroprojeto').val(selectedItem.txt_numeroprojeto);
	}
}