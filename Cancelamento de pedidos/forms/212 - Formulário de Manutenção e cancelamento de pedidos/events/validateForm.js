function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

    const EVENTO_INICIO = 3
    const ALTERAR_PEDIDO = 4
    const APROVACAO_COMPRAS = 10
    const APROVACAO_GERENTE = 20
    const AGUARDA_FATURAMENTO = 53

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio();
            }
            break

        case APROVACAO_GERENTE:
            validarGerente()
            break

        case AGUARDA_FATURAMENTO:
            validarAguardaFaturamento()
            break
    }

    function validarInicio() {

        var wms = form.getValue("statuswms");

        //     if(wms == "Integrou"){
        //     var status = form.getValue("status");
        //     if(status !== "Aguardando Onda") {
        //         throw("<strong>PEDIDO JÁ ENTROU EM SEPARAÇÃO E NÃO PODE SER CANCELADO!");
        //     }
        // }

        var pedido = form.getValue("numped");
        if (pedido == "" || pedido == null) {
            throw ("Informe o número do pedido!");
        }

        var motivo = form.getValue("motivo");
        if (motivo == "" || motivo == null) {
            throw ("Informe o motivo!");
        }

        var status = form.getValue("status");
        if (status == "" || status == null) {
            throw ("Status do pedido não pode estar em branco!");
        }

        var wms = form.getValue("statuswms");
        if (wms == "" || wms == null) {
            throw ("Status do WMS não pode estar em branco!");
        }


        // var tipoSolicitante = form.getValue("tipoSolicitante")
        // if(tipoSolicitante == "Supervisor"){
        //     if(wms == "Não Integrou") {
        //         throw("<strong>PEDIDO NÃO INTEGROU NO WMS! ELE DEVE SER CANCELADO POR VOCÊ!");
    }

    function validarAguardaFaturamento() {
        var numeroNF = form.getValue("numNF")

        if (numeroNF == "" || numeroNF == null) {
            throw ("Você deve inserir o Número da NF!!")
        }
    }

    function validarGerente() {
        //     var status = form.getValue("status");
        //     var wms = form.getValue("statuswms");

        //     if(wms == "Não Integrou") {
        //         throw("<strong>PEDIDO NÃO INTEGROU NO WMS! ELE DEVE SER CANCELADO CANCELADO POR VOCÊ");
        //     }
    }

}


