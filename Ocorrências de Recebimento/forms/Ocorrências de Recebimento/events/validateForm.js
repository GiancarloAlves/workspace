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
        
        var OC = form.getValue("mainOC");
        var NF = form.getValue("numNF")
        var motivo = form.getValue("motivo")

        if(motivo=="2"){
            if(NF == "" || NF == null) {
            throw("Preencha o número da NF!");
        }
     } else {
            
            if (OC == ""|| OC == null) {
            throw("Preencha o número da OC")
            }
            validarPaiFilho();

        }

    }


function validarPaiFilho() {
    var indexes = form.getChildrenIndexes("tabela");
    if(indexes.length > 0) {
        for(var i = 0; i < indexes.length; i++) { 
            if(form.getValue("codprod___" + indexes[i]) == null || form.getValue("codprod___" + indexes[i]) == "") {
                throw "Preencha o campo <strong>Item!<strong>";
            }

                    }
    }
    else {
        throw("<strong>Adicione ao menos um item!</strong>");
    }
}

}