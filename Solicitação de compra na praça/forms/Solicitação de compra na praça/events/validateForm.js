function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
// CONSTANTES GLOBAIS
const EVENTO_INICIO = 3
const COMPRA = 20
const RECEBIMENTO = 10
const RETIRA_RASTREIO = 37
const LIBERACAO_PEDIDO = 73
const FINALIZA = 75

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            validarPaiFilho()
            }
            break

        case COMPRA: 
            validarCompra()
            break

        case RECEBIMENTO: 
            validarRecebimento()
            break

        case RETIRA_RASTREIO:
            validarRemocao()
            break
        
        case LIBERACAO_PEDIDO:
            validarLiberacao()
            break
        
        case FINALIZA:
            validarFim()
            break

    }

    function validarInicio(){

        var pedido = form.getValue("numped");
        if(pedido == "" || pedido == null) {
            throw("Informe o número do pedido!");
        }
    
        var status = form.getValue("status");
            if (status != "Pendente") {
              throw ("O pedido está " + status + ", mas deve estar pendente para abrir o processo.");
            } 

            var codfornec = form.getValue("codfornec");
            if (codfornec == "") {
              throw ("Escolha um código de fornecedor.");
            }         

            var fornecedor = form.getValue("fornecedor");
            if (fornecedor == "") {
              throw ("Escolha um fornecedor.");
            }      
      
        var wms = form.getValue("statuswms");
        if(wms == "" || wms == null) {
            throw("Status do WMS não pode estar em branco!");
        }

}

    function validarCompra(){

        var rastreio = form.getValue("rastreio");
        if (rastreio == "nao") {
            throw("Aplicado rastreio foi marcado como não!");
        }
    }

    function validarRecebimento(){
        
        var recebimento = form.getValue("recebido");
        if (recebimento == "nao") {
            throw("Recebimento do material foi marcado como não!");
        }        
    }

    function validarRemocao(){
        
        var remocao = form.getValue("remove_rast");
        if (remocao == "nao") {
            throw("Removido rastreio foi marcado como não!");
        }
    }

    function validarLiberacao() {
        var liberacao = form.getValue("status2");
        if (liberacao != "Liberado" && liberacao != "Pendente") {
            throw ("O pedido está " + liberacao + ", mas deve estar liberado ou pendente para o processo continuar.");
        }
}

    function validarFim() {
        var pedido = form.getValue("numped");
        var pedido2 = form.getValue("pedido2");

    if (pedido != pedido2) {
          throw ("O pedido que originou esta NF não é o mesmo que originou a solicitação!");
        }
  }


  function validarPaiFilho() {
    var indexes = form.getChildrenIndexes("pedido");
    if(indexes.length > 0) {
        for(var i = 0; i < indexes.length; i++) { 
            if(form.getValue("codprod___" + indexes[i]) == null || form.getValue("codprod___" + indexes[i]) == "") {
                throw "<strong> Há campos de código do produto em branco. Preencha todos.<strong>";
            }
            if(form.getValue("qtdCompra___" + indexes[i]) == null || form.getValue("qtdCompra___" + indexes[i]) == "") {
              throw "<strong> Há campos de quantidade de compra em branco. Preencha todos<strong>";
            }
            if(form.getValue("liquido___" + indexes[i]) == null || form.getValue("liquido___" + indexes[i]) == "") {
              throw "<strong> Há campos de valor líquido em branco. Preencha todos<strong>";
            }
            if(form.getValue("precocalc___" + indexes[i]) == null || form.getValue("precocalc___" + indexes[i]) == "") {
                throw "<strong> Há campos de preço calculado em branco. Preencha todos<strong>";
              }
                    }
    }
    else {
        throw("<strong>Adicione ao menos um item!</strong>");
    }
}


}