function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")

    const EVENTO_INICIO = 3
    const ANALISE_TI = 4
    const ANALISE_SUPERVISOR = 17

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case ANALISE_SUPERVISOR:
            validarAnaliseSupervisor()
            break
    }

    function validarInicio() {
        var descrMelhoria = form.getValue("DescrMelhoria")
        var ganho = form.getValue("Ganho")

        if (descrMelhoria == "" || descrMelhoria == null) {
            throw ('Você precisa completar o campo de "Descrição"!')
        }

        if (ganho == "" || ganho == null) {
            throw ("Você precisa estimar os ganhos da melhoria!")
        }
    }

    function validarAnaliseSupervisor() {
        var analiseSupervisor = form.getValue("analiseSupervisor")

        if (analiseSupervisor == "" || analiseSupervisor == null) {
            throw ("Você deve deixar um comentário sobre sua aprovação!")
        }
    }
}
