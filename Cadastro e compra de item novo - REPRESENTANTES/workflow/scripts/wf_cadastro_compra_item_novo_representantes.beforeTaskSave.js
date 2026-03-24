function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  var atv = getValue("WKNumState");

  if (atv == 3) {
    var anexos = hAPI.listAttachments();
    var temAnexo = false;

    if (anexos.size() >= 2) {
      temAnexo = true;
    }

    if (!temAnexo) {
      throw "Anexe a OC do cliente e o aceite do mesmo.";
    }
  }
}
