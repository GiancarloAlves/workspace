function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atv = getValue("WKNumState");

    if (atv == 3) {

        var anexos = hAPI.listAttachments();
        var temAnexo = false;

        if (anexos.size() >= 2) {
            temAnexo = true
        }

        if (!temAnexo) {
            throw "Anexar orçamento do fornecedor e OC e/ou aceite do cliente"
        }

    }
}