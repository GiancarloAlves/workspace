function validateForm(form){

    var TASK = parseInt(getValue("WKNumState"));
    var WKCompletTask = getValue("WKCompletTask");

        //CONSTANTES GLOBAIS
        const EVENTO_INICIO = 7
        const TRATATIVA_PRIMA = 9
        const APROVACAO_INICIADOR = 54
        const APROVACAO_OCORRENCIAS = 45
        const RESOLUCAO_PROBLEMAS = 62
        const TRATATIVA_SEGUNDA = 41
        const RESPOSTA_GERENCIA = 22

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            if(WKCompletTask.equals("true")) {
            validarInicio();
            }
            break

        case TRATATIVA_PRIMA: 
            validarTrativa()
            break


        case TRATATIVA_SEGUNDA: 
            validarSegTratativa()
            break

    }

    function validarInicio() {

        var nota = form.getValue("numNF");
        if(nota == "" || nota == null) {
            throw("Informe o número da nota!");
        }

        var pessoa = form.getValue("PessoaCliente");
        if(pessoa == "" || pessoa == null) {
            throw("Diga o nome da pessoa que fez a reclamação!");
        }  
        
		var telefone = form.getValue("ContTelefonico");
        if(telefone == "" || telefone == null) {
            throw("Preencha o contato telefônico");
        }



        var tipo = form.getValue("motivoDevolucao");
        if(tipo == "Selecione" || tipo == null) {
            throw("Informe o motivo da reclamação!");
        }

        var setor = form.getValue("setorTranstorno");
        if(setor == "Selecione" || setor == null) {
            throw("Informe o setor que está causando o problema.");
        }

        var modo = form.getValue("modoReclamacao");
        if(modo == "Selecione" || modo == null) {
            throw("Informe o meio pelo qual o cliente manifestou a reclamação.");
        }

        var ocorrencia = form.getValue("DescrOcorrencia");
        if(ocorrencia == "" || ocorrencia == null) {
            throw("Descreva a ocorrência");
        }

    }

    function validarTrativa() {

        var pq = form.getValue("PqReclamacao");
        if(pq == "" || pq == null) {
            throw("Descreva porque foi gerada a reclamação");
        }

        var solucao = form.getValue("SolucaoReclamac");
        if(solucao == "" || solucao == null) {
            throw("Descreva a solução");
        }

  
    }

    function validarSegTratativa() {

        var segunda = form.getValue("SolucaoReclamac2");
        if(segunda == "" || segunda == null) {
            throw("Descreva a solução");
        }
    }

}


