function startconditional10() {
	

    var analise = DatasetFactory.getDataset("ds_analise_cred_winthor", null, null, null);
    var dataset = DatasetFactory.getDataset("ds_analise_credito", null, null, null);
    var encontrouPedido = false;   
    

    for (var j = 0; j < analise.values.length; j++) {
    
        var pedidoNumero = analise.getValue(j, "NUMPED");
        encontrouPedido = false;
       
        for (var i = 0; i < dataset.values.length; i++){

            var numped = dataset.getValue(i, "numped");
            if (numped == pedidoNumero){
                encontrouPedido = true;
            }
        }    
    
        if(encontrouPedido == false){
            break;
        }
}

        if(encontrouPedido == false){
            return true;
        }
}