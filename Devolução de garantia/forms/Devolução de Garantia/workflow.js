// Constantes globais atividades
const EVENTO_INICIO = 24
const LIBERACAO_PEDIDO = 31
const ACERTO_CREDITO = 58
const REALIZAR_DEVOLUCAO = 51
const REVISAR_DEVOLUCAO = 53
const CRIAR_ROTEIRO = 76
const REALIZAR_RECEBIMENTO = 27
const CONFIRMAR_RECEBIMENTO = 55
const COMPRAS = 116

function taskHandler() {
    const TASK = Number(getWKNumState())

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            taskHandlerInicio()
            updateLED("led_abertura", true)

            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#criar-roteiro').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterVendas').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLog').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case COMPRAS:
            taskHandlerCompras()
            updateLED("led_compras", true)

            $('#liberacao').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#criar-roteiro').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')

            $('#MasterCompras').addClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLog').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case LIBERACAO_PEDIDO:
            taskHandlerLiberacao()
            updateLED("led_liberacao", true)

            $('#criar-roteiro').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLibe').addClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLog').removeClass("in")
            break

        case ACERTO_CREDITO:
            taskHandlerAcertoCredito()
            updateLED("led_acerto", true)

            $('#criar-roteiro').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterFin').addClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterLog').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case CRIAR_ROTEIRO:
            taskHandlerCriarRoteiro()
            updateLED("led_roteiro", true)

            $('#registro-devolucao').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLog').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case REALIZAR_RECEBIMENTO:
            taskHandlerRealizarRecebimento()
            updateLED("led_recebimento", true)

            $('#criar-roteiro').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLog').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case REVISAR_DEVOLUCAO:
            taskHandlerRevisarDevolucao()
            updateLED("led_revisar_devolucao", true)

            $('#criar-roteiro').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLog').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case REALIZAR_DEVOLUCAO:
            taskHandlerRealizarDevolucao()
            updateLED("led_devolucao", true)

            $('#criar-roteiro').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#confirmar_recebimento').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLog').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break

        case CONFIRMAR_RECEBIMENTO:
            taskHandlerConfirmarRecebimento()
            updateLED("led_confirma_recebimento", true)

            $('#criar-roteiro').addClass('blocked')
            $('#registro-devolucao').addClass('blocked')
            $('#liberacao').addClass('blocked')
            $('#acerto-credito').addClass('blocked')
            $('#realizar-recebimento').addClass('blocked')
            $('#ocorrencias').addClass('blocked')
            $('#realizar-devolucao').addClass('blocked')
            $('#revisar-devolucao').addClass('blocked')
            $('#compras').addClass('blocked')

            $('#MasterLog').addClass("in")
            $('#MasterCompras').removeClass("in")
            $('#MasterVendas').removeClass("in")
            $('#MasterFin').removeClass("in")
            $('#MasterLibe').removeClass("in")
            break
    }
}
