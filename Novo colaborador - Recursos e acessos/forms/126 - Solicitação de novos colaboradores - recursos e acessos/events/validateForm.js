function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
// CONSTANTES GLOBAIS
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
            validarCadastro()
            break

    }

    function validarInicio() {

        var nome = form.getValue("nome");
        if(nome == "" || nome == null) {
            throw("Informe o nome!");
        }

        var setor = form.getValue("setor");
        if(setor == "" || setor == null) {
            throw("Informe o setor!");
        }
    
       var cargo = form.getValue("cargo");
        if(cargo == "" || cargo == null) {
            throw("Informe o cargo!");
        }

        var localtrab = form.getValue("localtrab");
        if(localtrab == "" || localtrab == null) {
            throw("Informe o local de trabalho!");
        }

        var datainicio = form.getValue("datainicio");
        if(datainicio == "" || datainicio == null) {
            throw("Informe a data de início!!");
        }

        var workstation = form.getValue("workstation");
        if(workstation == "" || workstation == null) {
            throw("Informe o local de trabalho!!");
        }

         validarPaiFilho()

    }

    function validarCadastro() {

        var nomerh = form.getValue("nome_rh");
        if(nomerh == "" || nomerh == null) {
            throw("Informe o nome cadastrado!!");
        }

        var matricula = form.getValue("matricula");
        if(matricula == "" || matricula == null) {
            throw("Informe a matricula!!");
        }

        var rca = form.getValue("rca");
        if(rca == "" || rca == null) {
            throw("Informe o RCA!!");
        }  
    }

    function validarGerente() {

        
    }


    function validarPaiFilho() {
        var indexes = form.getChildrenIndexes("acessos");
        if(indexes.length > 0) {
            for(var i = 0; i < indexes.length; i++) { 
                if(form.getValue("destino___" + indexes[i]) == "Selecione" || form.getValue("destino___" + indexes[i]) == "") {
                    throw "<strong>Selecione uma das opções para os acessos!<strong> Caso o acesso não se aplique ao colaborador, pressione o botão X para excluí-lo.";
                }   
    
            if(form.getValue("destino___" + indexes[i]) == "Migrar de outro usuário") {
                if(form.getValue("novo___" + indexes[i]) == "" || form.getValue("novo___" + indexes[i]) == "null"){
                    throw "<strong>Diga o usuário de origem na opção Migrar de outro usuário!<strong>";
                }   
    
                        }
                    }
        
    
        }
    
    }

}




