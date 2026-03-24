function enableFields(form){ 
    var activity = getValue("WKNumState");
if (activity == 4 || activity == 6 || activity == 7){

    form.setEnabled("ObsFinanceiro", false);

}

if (activity == 5 || activity == 15){

    form.setEnabled("ObsEntrada", false);
    
}

}