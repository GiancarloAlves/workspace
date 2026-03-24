const EVENTO_INICIO = 3
const RESPOSTA_LOG = 9
const RESPOSTA_ESTOQUE = 4
const RESPOSTA_RECEBIMENTO = 16
const RESPOSTA_FATURAMENTO = 17
const RESPOSTA_SEPARACAO = 28
const FINALIZACAO_SOLICITANTE = 40
const RESPOSTA_ENTREGAS_VIA_AUTO = 79
const RESPOSTA_ENTREGAS_LEOMAR = 81
const RESPOSTA_ENTREGAS = 83

function taskHandler() {
    const TASK = Number(getWKNumState())
    const matriculaSolicitante = parent.WCMAPI.getUserCode()
    const solicitante = parent.WCMAPI.getUser()

    $(`.matriculaSolic`).val(matriculaSolicitante)
    $(`#nome`).val(solicitante)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            updateLED("led_abertura", true)
            ligarLED("led_tabela")
            tratarPainel('#dadosSolicitacao')

            break

        case RESPOSTA_ENTREGAS_VIA_AUTO:
            updateLED("led_entregasViaAuto", true)
            tratarPainel('#respostaEntregasViaAuto')
            break

        case RESPOSTA_ENTREGAS_LEOMAR:
            updateLED("led_entregasLeomar", true)
            tratarPainel('#respostaEntregasLeomar')
            break

        case RESPOSTA_ESTOQUE:
            updateLED("led_estoque", true)
            tratarPainel('#respostaEstoque')

            break

        case RESPOSTA_RECEBIMENTO:
            updateLED("led_recebimento", true)
            tratarPainel('#respostaRecebimento')

            break

        case RESPOSTA_ENTREGAS:
            updateLED("led_Entregas", true)
            tratarPainel('#respostaEntregas')
            break

        case RESPOSTA_FATURAMENTO:
            updateLED("led_faturamento", true)
            tratarPainel('#respostaFaturamento')

            break

        case RESPOSTA_SEPARACAO:
            updateLED("led_separacao", true)
            tratarPainel('#respostaSeparacao')

            break

        case RESPOSTA_LOG:
            updateLED("led_gerencia", true)
            tratarPainel('#respostaLog')

            break

        case FINALIZACAO_SOLICITANTE:
            updateLED("led_RespostaSolicitante", true)
            tratarPainel('#respostaSolicitante')

            break
    }
}

function selectTipoSolicitacao() {
    const selectEstoque = $('#comboArea').val()
    const numOpcoesSolic = $('#tipo_solic option').length
    $('#divSelectSolicitacao').removeClass('blocked')

    if (numOpcoesSolic > 1) {
        $('#tipo_solic').empty()
        $('.group-item').addClass('blocked')
        $('.inputItem').attr('readonly', true)
        $('.defaultField').val('')
        $('.iconWarning').addClass('hidden')

        window["numNF"].clear()
        window["codCliente"].clear()
        window["numPed"].clear()
    }

    switch (selectEstoque) {
        case 'estoque':
            $('#tipo_solic').append('<option>Selecione</option>')
            // $('#tipo_solic').append('<option value="Liberação de item bloqueado">Liberação de item bloqueado</option>')
            $('#tipo_solic').append('<option value="Item em vermelho">Item em vermelho</option>')
            $('#tipo_solic').append('<option value="Consulta de pontas de cabos">Consulta de pontas de cabos</option>')
            $('#tipo_solic').append('<option value="Demonstração de produto">Demonstração de produto</option>')
            $('#tipo_solic').append('<option value="Resolução de ocorrências">Resolução de ocorrências</option>')
            $('#tipo_solic').append('<option value="Inventariar item">Inventariar item c/ pedido liberado</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        case 'recebimento':
            $('#tipo_solic').append('<option>Selecione</option>')
            $('#tipo_solic').append('<option value="Liberação de item bloqueado">Liberação de item bloqueado</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        case 'faturamento':
            $('#tipo_solic').append('<option>Selecione</option>')
            $('#tipo_solic').append('<option value="Trocar transportadora">Trocar transportadora</option>')
            $('#tipo_solic').append('<option value="Embarque após horário de corte">Embarque após horário de corte</option>')
            $('#tipo_solic').append('<option value="NF foi expedida?">NF foi expedida?</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        case 'separacao':
            $('#tipo_solic').append('<option>Selecione</option>')
            $('#tipo_solic').append('<option value="Cortar Item">Cortar Item</option>')
            $('#tipo_solic').append('<option value="Cancelar Pedido">Cancelar Pedido</option>')
            $('#tipo_solic').append('<option value="Embarque pedidos">Embarque pedidos</option>')
            $('#tipo_solic').append('<option value="Enviar brinde">Enviar brinde</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        case 'gerencia':
            $('#tipo_solic').append('<option>Selecione</option>')
            $('#tipo_solic').append('<option value="analiseSolicitacao">Análise Solicitação</option>')
            $('#tipo_solic').append('<option value="info">Informação</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        case 'entregasViaAuto':
        case 'entregasLeomar':
        case 'fluxoEntregas':
            $('#tipo_solic').append('<option>Selecione</option>')
            $('#tipo_solic').append('<option value="atrasoEntrega">Atraso na entrega</option>')
            $('#tipo_solic').append('<option value="outros">Outros</option>')

            break

        default:
            $('#divSelectSolicitacao').addClass('blocked')
            break
    }
}

function exibirCampos() {
    const tipoSolicitacao = $('#tipo_solic').val()
    const numOpcoesSolic = $('#tipo_solic option').length
    prazoFinal()

    if (numOpcoesSolic > 1) {
        $('.group-item').addClass('blocked')
        $('.inputItem').attr('readonly', true)
        $('.defaultField').val('')
        $('.iconWarning').addClass('hidden')

        window["numNF"].clear()
        window["codCliente"].clear()
        window["numPed"].clear()
    }

    switch (tipoSolicitacao) {
        case 'Liberação de item bloqueado':
            $('#codItemGroup').removeClass('blocked')
            $('#nomeFornecGroup').removeClass('blocked')
            $('#codItem').removeAttr('readonly')
            $('#nomeFornec').removeAttr('readonly')

            $('.iconWarningCodItem').removeClass('hidden')
            $('.iconWarningNomeFornec').removeClass('hidden')

            break

        case 'Consulta de pontas de cabos':
            $('#codItem').removeAttr('readonly')
            $('#codItemGroup').removeClass('blocked')
            $('.iconWarningCodItem').removeClass('hidden')

            break

        case 'Resolução de ocorrências':
        case 'NF foi expedida?':
            $('#numNFGroup').removeClass('blocked')
            $('#numNF').removeAttr('readonly')
            $('.iconWarningNumNF').removeClass('hidden')
            reloadZoomFilterValues(`numNF`, `A03_POSICAO,FATURADO`)

            break

        case 'Inventariar item':
        case 'Demonstração de produto':
        case 'Cortar Item':
            $('#codItemGroup').removeClass('blocked')
            $('#codItem').removeAttr('readonly')

            $('.iconWarningCodItem').removeClass('hidden')

            break

        case 'Item em vermelho':
            $('#codItemGroup').removeClass('blocked')
            $('#codItem').removeAttr('readonly')
            $('#numPedGroup').removeClass('blocked')
            $('#numPed').removeAttr('readonly')

            $('.iconWarningCodItem').removeClass('hidden')
            $('.iconWarningNumPed').removeClass('hidden')

            break

        case 'Embarque após horário de corte':
        case 'Trocar transportadora':
            $('#numPedGroup').removeClass('blocked')
            $('#nomeTranspGroup').removeClass('blocked')
            $('#codClienteGroup').removeClass('blocked')
            $('#codCliente').removeAttr('readonly')
            $('#numPed').removeAttr('readonly')
            $('#nomeTransp').removeAttr('readonly')

            $('.iconWarningCodClient').removeClass('hidden')
            $('.iconWarningNumPed').removeClass('hidden')
            $('.iconWarningNomeTransp').removeClass('hidden')

            break

        case 'Cancelar Pedido':
        case 'Embarque pedidos':
        case 'Enviar brinde':
            $('#numPedGroup').removeClass('blocked')
            $('#numPed').removeAttr('readonly')
            $('#codClienteGroup').removeClass('blocked')
            $('#codCliente').removeAttr('readonly')

            $('.iconWarningNumPed').removeClass('hidden')
            $('.iconWarningCodClient').removeClass('hidden')

            break
        case 'atrasoEntrega':
            $('#codClienteGroup').removeClass('blocked')
            $('#codCliente').removeAttr('readonly')
            $('.iconWarningCodClient').removeClass('hidden')

            $('#numNFGroup').removeClass('blocked')
            $('#numNF').removeAttr('readonly')
            $('.iconWarningNumNF').removeClass('hidden')
            reloadZoomFilterValues(`numNF`, `A03_POSICAO,FATURADO`)
            break
    }
}

function prazoFinal() {
    const tipoSolicitacao = $('#tipo_solic').val()
    let time = 0
    let prazo = 0
    let dataAtual = new Date().getTime()

    if (tipoSolicitacao == 'Demonstração de produto' || tipoSolicitacao == 'Item em vermelho') {
        time = 30 * 60000
    } else if (tipoSolicitacao == 'Embarque após horário de corte') {
        time = 10 * 60000
    } else if (tipoSolicitacao == 'Cortar Item') {
        time = 60 * 60000
    } else {
        time = 120 * 60000
    }

    let prazoTimeStamp = dataAtual + time

    prazo = new Date(prazoTimeStamp)

    let segundo = ("0" + prazo.getSeconds()).slice(-2)
    let minuto = ("0" + prazo.getMinutes()).slice(-2)
    let hora = ("0" + prazo.getHours()).slice(-2)
    let dia = ("0" + prazo.getDate()).slice(-2)
    let mes = ("0" + (prazo.getMonth() + 1)).slice(-2)
    let ano = prazo.getFullYear()

    $('#dia').val(dia)
    $('#mes').val(mes)
    $('#ano').val(ano)
    $('#hora').val(hora)
    $('#minuto').val(minuto)
    $('#segundo').val(segundo)
    let dataFormatada = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto + ':' + segundo

    $('#prazo').val(dataFormatada)
}

function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName

    switch (inputId) {
        case `codCliente`:
            $(`#nomeCliente`).val(selectedItem.A14_CLIENTE)

            break

        case `numPed`:
            window[`codCliente`].setValue(selectedItem.A13_COD_CLIENTE)
            $(`#posicaoPed`).val(selectedItem.A03_POSICAO)
            // $(`#dataPed`).val(selectedItem.A04_DATA_PEDIDO)
            $(`#dataLibera`).val(selectedItem.A05_DATA_LIBERACAO)
            $(`#nomeCliente`).val(selectedItem.A14_CLIENTE)
            $(`#entrega`).val(selectedItem.A15_ENTREGA)

            break

        case `numNF`:
            $(`#dataLibera`).val(selectedItem.A05_DATA_LIBERACAO)
            $(`#dataNF`).val(selectedItem.A06_DATA_NF)

            break
    }
}

function removedZoomItem(removedItem) {
    const inputId = removedItem.inputName

    switch (inputId) {
        case `codCliente`:
            window["numPed"].clear()
            window["numNF"].clear()
            $('.defaultField').val('')

            break

        case `numPed`:
            window["codCliente"].clear()
            window["numNF"].clear()
            $('.defaultField').val('')

            break

        case `numNF`:
            window["codCliente"].clear()
            window["numPed"].clear()
            $('.defaultField').val('')

            break
    }
}

function tratarPainel(painel) {
    $('.panel-collapse').not(painel).removeClass("in");
    $('.panel-collapse').not(painel).addClass("blocked");
    // $('.panel-collapse').not(`#${painel}`).addClass("hide");
}

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
}

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
}

$(document).ready(() => {
    taskHandler()
})