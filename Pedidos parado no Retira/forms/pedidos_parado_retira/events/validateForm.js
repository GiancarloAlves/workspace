function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    var WKCompletTask = getValue("WKCompletTask")

    const EVENTO_INICIO = 19
    const ENVIO_EMAILS = 20

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            if (WKCompletTask.equals("true")) {
                validarInicio()
            }
            break

        case ENVIO_EMAILS:
            validarInicio()
            break
    }

    function validarInicio() {
        var qtdVendedoresInput = form.getValue("qtdVendedoresInput")
        if (qtdVendedoresInput == 'existemVendedores') {
            throw ("Você não disparou <strong>todos os e-mails</strong> para finalizar a solicitação!")
        }
    }
}