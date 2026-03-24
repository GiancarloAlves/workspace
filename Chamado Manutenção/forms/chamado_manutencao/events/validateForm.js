function validateForm(form) {
  var TASK = parseInt(getValue("WKNumState"));
  var WKCompletTask = getValue("WKCompletTask");

  const EVENTO_INICIO = 5;

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      if (WKCompletTask.equals("true")) {
        validarInicio();
      }
      break;
  }

  function validarInicio() {
    var problema = form.getValue("solicitacao");

    if (problema == "" || problema == null) {
      throw "Diga qual o problema que necessita de atendimento!";
    }
  }
}
