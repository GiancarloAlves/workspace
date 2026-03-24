function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 4
        const CADASTRO_RH = 5
        const CADASTRO_TI = 6


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case CADASTRO_RH: 
            validarInicio()
            break

        case CADASTRO_TI: 

            break


    }

    function validarInicio() {

        var setor = form.getValue("setor");
        if(setor == "" || setor == null) {
            throw "Preencha o campo SETOR!";
        }
    
        var cargo = form.getValue("cargo");
        if (cargo == "" || cargo == null) {
          throw "Preencha o campo CARGO!";
        }

        var nome = form.getValue("nome");
        if (nome == "" || nome == null) {
          throw "Preencha o campo NOME!";
        }

        var localtrab = form.getValue("localtrab");
        if (localtrab == "" || localtrab == null) {
        throw "Preencha o campo LOCAL DE TRABALHO!";
        }
    
        var datainicio = form.getValue("datainicio");
        if (datainicio == "" || datainicio == null) {
        throw "Preencha o campo DATA DE INICIO!";
        }

        var workstation = form.getValue("workstation");
        if (workstation == "" || workstation == null) {
        throw "Preencha o campo ESTAÇÃO DE TRABALHO!";
        }

        var nomerh = form.getValue("nome_rh");
        if (nomerh == "" || nomerh == null) {
        throw "Preencha o campo ESTAÇÃO DE TRABALHO!";
        }

        var matricula = form.getValue("matricula");
        if (matricula == "" || matricula == null) {
        throw "Preencha o campo MATRICULA";
        }

        var rca = form.getValue("rca");
        if (rca == "" || rca == null) {
        throw "Preencha o campo RCA!";
        }

        var acessos = form.getValue("acessos");
        if (acessos == "" || acessos == null) {
        throw "Preencha o campo ACESSOS E SISTEMAS!";
        }
    }
}