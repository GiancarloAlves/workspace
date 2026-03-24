function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))
    // var WKCompletTask = getValue("WKCompletTask")

    const EVENTO_INICIO = 25
    const REVISAR_ITENS_BLOQUEADOS = 24
    const REVISAR_PEDIDOS_PARADOS = 15
    const CHECK_LIST_CARRINHOS_OP = 21
    const PERCENT_FRETES_TRANSP = 28

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:

            break
        case REVISAR_ITENS_BLOQUEADOS:
            validaEstoque()
            break
        case REVISAR_PEDIDOS_PARADOS:
            validaSaida()
            break

        case CHECK_LIST_CARRINHOS_OP:
            validaSaida()
            break

        case PERCENT_FRETES_TRANSP:
            validaViaAuto()
            break
    }

    function validaEstoque() {
        const revisaItensBloq = form.getValue('taskEstoq1')
        const ObsPendEstoque = form.getValue('ObsPendEstoque')

        if (revisaItensBloq == 'danger') {
            if (ObsPendEstoque == '' || ObsPendEstoque == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaSaida() {
        const revisaPedParados = form.getValue('taskSaida1')
        const checkListCar = form.getValue('taskSaida2')
        const ObsPendSaida = form.getValue('ObsPendSaida')

        if (revisaPedParados == 'danger' || checkListCar == 'danger') {
            if (ObsPendSaida == '' || ObsPendSaida == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaViaAuto() {
        const percentTaskTransp = form.getValue('taskViaAuto1')
        const ObsPendViaAuto = form.getValue('ObsPendViaAuto')

        if (percentTaskTransp == 'danger') {
            if (ObsPendViaAuto == '' || ObsPendViaAuto == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }
}