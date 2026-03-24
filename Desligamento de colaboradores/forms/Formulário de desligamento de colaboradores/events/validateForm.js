function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const INFORMAR_ACESSOS = 17
const AGENDAMENTO_BLOQUEIO = 5
const BLOQUEIO_TI = 6
const EFETIVACAO_CANCELAMENTO = 11
const FIM = 9

var caso = form.getValue("automatico");

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }

            if(caso == "nao" || caso == null) {
            validarPaiFilho()
            }            
            break

        case INFORMAR_ACESSOS:
            validarPaiFilho()

        case AGENDAMENTO_BLOQUEIO:
            validarAgendamento();
            break

        case EFETIVACAO_CANCELAMENTO:
            validarDesligamento()
            break

    }

    function validarInicio() {

        var matricula = form.getValue("matricula");
        if(matricula == "" || matricula == null) {
            throw("Informe um número de matrícula ou usuário!");
        }

        var desligamento = form.getValue("desligamento");
        if(desligamento == "" || desligamento == null) {
            throw("Informe a data que deve ocorrer o desligamento!");
        }

        var aviso = form.getValue("aviso");
        if(aviso == "" || aviso == null) {
            throw("<strong>Informe o tipo de aviso!</strong>");
        }

       
          
    }

    function validarAgendamento() {

        var desligamento = form.getValue("desligamento");
        if(desligamento == "" || desligamento == null) {
            throw("Informe a data de desligamento!");
        }
          
    }

    function validarDesligamento() {

        var situacao = form.getValue("sit528");
        if(situacao == "ATIVO" || situacao == null) {
            throw("Situação não pode ser nula ou ATIVA! Inative o usuário na 528 para continuar.");
        }

        var motivo528 = form.getValue("motivo528");
        if(motivo528 == "" || motivo528 == null) {
            throw("Motivo da 528 não pode ser nulo.");
        }

        var cargo = form.getValue("cargo");
        var carteira = form.getValue("sit517");
        var motivo517 = form.getValue("motivo517");
        if (cargo == "VENDEDOR") {
            if (carteira == "LIVRE" || carteira == null){
            throw("Para cargo de vendedor, situação da 517 não pode ser nula ou LIVRE! Inative a carteira na 517 para continuar.");
            }

            if(motivo517 == "" || motivo517 == null) {
                throw("Para cargo de vendedor, motivo da 517 não pode ser nulo.");
            }      


        }

    }

    function validarPaiFilho() {
        var indexes = form.getChildrenIndexes("acessos");
        if(indexes.length > 0) {
            for(var i = 0; i < indexes.length; i++) { 
                if(form.getValue("destino___" + indexes[i]) == "Selecione" || form.getValue("destino___" + indexes[i]) == "") {
                    throw "<strong>Selecione uma das opções para os acessos!<strong> Caso o acesso não se aplique ao colaborador, pressione o botão X para excluí-lo.";
                }   

            if(form.getValue("destino___" + indexes[i]) == "Transferir") {
                if(form.getValue("novo___" + indexes[i]) == "" || form.getValue("novo___" + indexes[i]) == "null"){
                    throw "<strong>Diga para quem será transferido o acesso!<strong>";
                }   

                        }
                    }
        

        }

    }

}