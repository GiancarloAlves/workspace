function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const RETIRADA_CHAVE = 14
const CHECKLIST = 31
const DADOS_KM = 18
const ENTREGA = 34

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")){
            validarInicio();
            }
            break

        case RETIRADA_CHAVE:
            Entrega();
            break

        case CHECKLIST:
            validarPaiFilho();
            break

        case DADOS_KM:
            Devolucao();
            break

        case ENTREGA:
            validarPaiFilhoB();
            break

}

function validarInicio(){
              
    var drive = form.getValue("drive");
    if (drive == "Nao") {
        throw("Você marcou que o agendamento no drive não foi feito!");
    }    
}

function Entrega(){

    var chavea = form.getValue("chaveentregue");
    if (chavea == "Nao") {
        throw("Você marcou que a chave não foi entregue!");
    }

    var entregachave = form.getValue("entregachave");
    if (entregachave == "") {
        throw("Preencha a data e a hora que a chave foi entregue!");
    }
}

function Devolucao(){

    var chaveb = form.getValue("devolvechave");
    if (chaveb == "Nao") {
        throw("Você marcou que a chave não foi devolvida!");
    }

    var kmfinal = form.getValue("kmfinal");
    if (kmfinal == "") {
        throw("Indique a quilometragem final!");
    }    
}

function validarPaiFilho(){
    var indexes = form.getChildrenIndexes("checklist");
    if(indexes.length > 0) {
        for(var i = 0; i < indexes.length; i++) { 
            if(form.getValue("f4___" + indexes[i]) == "" && form.getValue("f3___" + indexes[i]) == "") {
                ind = i+1;
                throw "Preencha o campo <strong>Ok ou Nok!<strong> no item" + ind;
            }

                    }
    }
}

function validarPaiFilhoB(){
    var indexes = form.getChildrenIndexes("checklist2");
        if(indexes.length > 0) {
        for(var i = 0; i < indexes.length; i++) { 
            if(form.getValue("f2___" + indexes[i]) == "" && form.getValue("f1___" + indexes[i]) == "") {
                ind = i+1;
                throw "Preencha o campo <strong>Ok ou Nok!<strong> no item" + ind;
            }

                    }
    }
}

}