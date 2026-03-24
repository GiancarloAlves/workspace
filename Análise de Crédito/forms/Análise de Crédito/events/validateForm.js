// function validateForm(form){

//     var TASK = parseInt(getValue("WKNumState"));
//     var WKCompletTask = getValue("WKCompletTask");

//         //CONSTANTES GLOBAIS
//         const EVENTO_INICIO = 4
//         const ANALISE_FINANCEIRA = 5


//     switch(TASK) {
//         case 0:
//         case EVENTO_INICIO: 
//         if(WKCompletTask.equals("true")) {
//             validarInicio();
//             }
//             break

//     }

//     function validarInicio() {

//         var codcli = form.getValue("cod_cliente");
//         console.log(codcli)
//         if(codcli == "" || codcli == null) {
//             throw("Escolha um código de cliente!");
//         }
    
//         var motivo = form.getValue("justif");
//         if(motivo == "" || motivo == null) {
//             throw("Diga o motivo!");
//         }

//         var numNF = form.getValue("numNF");
//         if(numNF == "" || numNF == null) {
//             throw("Escolha um número de título!");
//         }

//         var boleto = form.getValue("boleto");
//         if(boleto == "" || boleto == null) {
//             throw("Diga qual a forma de envio do boleto!");
//         }
        
// 		validarPaiFilho()
//     }




// function validarPaiFilho() {
//     var indexes = form.getChildrenIndexes("TabelaTitulos");
//     if(indexes.length > 0) {
//         for(var i = 0; i < indexes.length; i++) { 
//             if(form.getValue("parcela___" + indexes[i]) == null || form.getValue("parcela___" + indexes[i]) == "") {
//                 throw "Preencha o campo <strong>Parcela!<strong>";
//             }
//             if(form.getValue("vencimentoDesejado___" + indexes[i]) == null || form.getValue("vencimentoDesejado___" + indexes[i]) == "") {
//                 throw "<strong>Diga a data de vencimento desejada!!<strong>";
//             }
//                     }
//     }
//     else {
//         throw("<strong>Adicione ao menos um item!</strong>");
//     }
// }

// }
