function afterTaskCreate(colleagueId) {
    var numEmpresa = getValue("WKCompany")
    var numProcesso = getValue("WKNumProces")
    var nrProxAtividade = getValue("WKNextState")
    var data = new Date()
    var tipoSolicitacao = hAPI.getCardValue("tipo_solic")

    if (nrProxAtividade == "4") {
        if (tipoSolicitacao == 'Demonstração de produto' || tipoSolicitacao == 'Item em vermelho') {
            var segundos = data.getHours() * 60 * 60 + data.getMinutes() * 60 + data.getSeconds()
            var obj = hAPI.calculateDeadLineTime(data, segundos, 30, "CIGAME_PADRAO");

            var horarioSegundos = obj[1]
        }
    }

    if (nrProxAtividade == "17") {
        if (tipoSolicitacao == 'Embarque após horário de corte') {
            var segundos = data.getHours() * 60 * 60 + data.getMinutes() * 60 + data.getSeconds()
            var obj = hAPI.calculateDeadLineTime(data, segundos, 10, "CIGAME_PADRAO");

            var horarioSegundos = obj[1]

            // data.setMinutes(data.getMinutes() + 10)
            // var horarioSegundos = data.getHours() * 60 * 60 + data.getMinutes() * 60 + data.getSeconds()
        }
    }

    if (nrProxAtividade == "28") {
        if (tipoSolicitacao == 'Cortar Item') {
            var segundos = data.getHours() * 60 * 60 + data.getMinutes() * 60 + data.getSeconds()
            var obj = hAPI.calculateDeadLineTime(data, segundos, 60, "CIGAME_PADRAO");

            var horarioSegundos = obj[1]
        }
    }

    hAPI.setDueDate(numProcesso, hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade), colleagueId, data, horarioSegundos)
}
