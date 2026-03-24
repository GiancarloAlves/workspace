$(function() {
	controleSite();
	
	controleJustificativa();
});

function controleSite(){
	$("[name=txt_atendimento]").change(function(){
		var txt_atendimento = $("[name=txt_atendimento] option:selected").val();
		
		if(txt_atendimento == "inloco"){
			$("#blocoSite").show();
		} else{
			$("#blocoSite").hide();
		}
	});
}

function controleJustificativa(){
	$("[name=txt_aprovacao]").change(function(){
		var txt_aprovacao = $("[name=txt_aprovacao] option:selected").val();
		
		if(txt_aprovacao == "nao"){
			$(".lbl_justificativa").addClass("required");
		} else{
			$(".lbl_justificativa").removeClass("required");
		}
	});
}

function setSelectedZoomItem(selectedItem) {	
	if(selectedItem.inputName == "txt_site"){
		var documentid = selectedItem["documentid"];
		
		getDadosSite( documentid );
	}
}

function getDadosSite( documentid ){	
	var c1 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('documentid', documentid, documentid, ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	
	var campos = new Array( "cod_grupo", "txt_sla", "txt_nome" );	
	var dataset = DatasetFactory.getDataset('cadastroSite', campos, filtros, null);

	var qtd = dataset.values.length;
	
	if(qtd > 0){
		var cod_grupo = dataset.values[0].cod_grupo;
		$("[name=txt_grupo]").val( cod_grupo );

		var sla = dataset.values[0].txt_sla;
		$("[name=txt_sla]").val( sla );
	} else{
		window['txt_site'].clear();
		
		FLUIGC.toast({
			title: '',
			message: "Não encontrado informações do Site selecionado.",
			type: 'danger'
		});
	}
}
