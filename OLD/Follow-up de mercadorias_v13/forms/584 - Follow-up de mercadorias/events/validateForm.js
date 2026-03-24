function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 4
        const ANALISE_FINANCEIRA = 5


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
        if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

    }

    function validarInicio() {
        
		validarPaiFilho()
    }


function validarPaiFilho() {
    var indexes = form.getChildrenIndexes("TabelaTitulos");
    if(indexes.length > 0) {
        for(var i = 0; i < indexes.length; i++) { 
            if(form.getValue("codprod___" + indexes[i]) == null || form.getValue("codprod___" + indexes[i]) == "") {
                throw "Preencha o campo <strong>Item!<strong>";
            }

            if(form.getValue("quantidade___" + indexes[i]) == null || form.getValue("quantidade___" + indexes[i]) == "") {
                throw "<strong>Diga a quantidade desejada!!<strong>";
            }

            if(form.getValue("datanec___" + indexes[i]) == null || form.getValue("datanec___" + indexes[i]) == "") {
                throw "<strong>Diga a data que precisa do produto!<strong>";
            }
                    }
    }
    else {
        throw("<strong>Adicione ao menos um item!</strong>");
    }
}

}
