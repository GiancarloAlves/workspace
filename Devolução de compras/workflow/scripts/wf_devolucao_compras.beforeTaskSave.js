function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atividade = getValue("WKNumState");
    var nextAtv = getValue("WKNextState");

    if (atividade == 35) {

        var anexos = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() > 0) {
            temAnexo = true;
        }

        if (!temAnexo) {
            throw "É preciso anexar o espelo da NF para continuar!";
        }

    }
}