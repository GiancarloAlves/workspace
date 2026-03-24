const EVENTO_INICIO = 19
const ENVIO_EMAILS = 20
const FIM = 18

function taskHandler() {
    const TASK = Number(getWKNumState())

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            updateLED("led_abertura", true)
            tratarPainel('#dadosSolicitacao')

            ligarLED("led_vendedores")
            $('#vendedores').removeClass('blocked')
            break

        case ENVIO_EMAILS:
            updateLED("led_abertura", true)
            tratarPainel('#dadosSolicitacao')

            ligarLED("led_vendedores")
            $('#vendedores').removeClass('blocked')
            break

        case FIM:
            $('.divVendedores').attr('hidden', true)
            $('.btn-exibe-pedidos').addClass('blocked')
            $('.botaoVerificaPedidos').addClass('hidden')
            $('.vendedoresTitle').addClass('hidden')
            $('.success-message').removeClass('hidden')
    }
}

function addNewRow() {
    var buttonOrder = $('.btn-exibe-pedidos')
    var dataset = DatasetFactory.getDataset("ds_pedidos_parados_retira_winthor")

    buttonOrder.addClass('blocked')

    for (i = 0; i < dataset.values.length; i++) {
        var row = wdkAddChild('tabelaPedidos')

        $('#checkPedido___' + row).attr('checked', true)
        $('#numPedido___' + row).val(dataset.values[i].A03_PEDIDO)
        $('#qtdItemEspecial___' + row).val(dataset.values[i].A04_ITENS_ESPECIAL)
        $('#codCliente___' + row).val(dataset.values[i].A01_COD_CLI)
        $('#cliente___' + row).val(dataset.values[i].A02_CLIENTE)
        $('#dataPedido___' + row).val(converterTimeStamp(dataset.values[i].A05_PEDIDO_DATA))
        $('#dataLibPedido___' + row).val(dataset.values[i].A06_PEDIDO_LIBERACAO)
        $('#dataIntegraWms___' + row).val(dataset.values[i].A07_PEDIDO_WMS)
        $('#tempoParadoRetira___' + row).val(dataset.values[i].A08_PEDIDO_PARADO + 'h')
        $('#vendedor___' + row).val(dataset.values[i].A11_VENDEDOR)
        $('#emailVendedor___' + row).val(dataset.values[i].A15_VENDEDOR_MAIL)
        $('#supervisor___' + row).val(dataset.values[i].A14_SUPERVISOR)
        $('#emailSupervisor___' + row).val(dataset.values[i].A16_SUPERVISOR_MAIL)

        if ($('#qtdItemEspecial___' + row).val() >= 1) {
            $('#qtdItemEspecial___' + row).addClass('produto-especial')
        }
    }
    atualizarContadorVendedores()
}

function verificaPedidoEstaChecked() {
    var divVendedores = $('.divVendedores')

    divVendedores.empty()

    $('[name^="checkPedido___"]').each(function (i) {

        if ($(this).is(':checked')) {
            var vendedor = $(`[name="vendedor___${i + 1}"]`).val()
            var pedidoVendedor = $(`[name="numPedido___${i + 1}"]`).val()
            var qtdItemEspecialPedido = $(`[name="qtdItemEspecial___${i + 1}"]`).val()
            var emailVendedor = $(`[name="emailVendedor___${i + 1}"]`).val()
            var emailSupervisor = $(`[name="emailSupervisor___${i + 1}"]`).val()
            var conteudo =
                `
                    
                    <div class="rowPedidoSelecionado">
                        <div class="form-group col-md-3">
                            <label style="margin: 0px;">Vendedor:</label>
                            <div class="input-group">
                                <input type="text" value="${vendedor}" class="form-control"
                                    name="vendedorSelecionado${i}"
                                    id="vendedorSelecionado${i}" readonly>
                                <span class="input-group-addon">
                                    <i class="flaticon flaticon-account-qualification icon-sm"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label style="margin: 0px;">Pedido:</label>
                            <div class="input-group">
                                <input type="text" value="${pedidoVendedor}"
                                    class="form-control" name="numeroPedidoVendedor${i}"
                                    id="numeroPedidoVendedor${i}" readonly>
                                <span class="input-group-addon">
                                    <i class="flaticon flaticon-pages icon-sm"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label style="margin: 0px;">Quantidade Item Especial:</label>
                            <div class="input-group">
                                <input type="text" value="${qtdItemEspecialPedido}"
                                    class="form-control" name="qtdItemEspecialPedido${i}"
                                    id="qtdItemEspecialPedido${i}" readonly>
                                <span class="input-group-addon">
                                    <i class="flaticon flaticon-new-releases icon-sm"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label style="margin: 0px;">E-mail vendedor:</label>
                            <div class="input-group">
                                <input type="text" value="${emailVendedor}"
                                    class="form-control" name="emailVendedor${i}"
                                    id="emailVendedor${i}" readonly>
                                <span class="input-group-addon">
                                    <i class="flaticon flaticon-new-releases icon-sm"></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <label style="margin: 0px;">Enviar e-mail para o vendedor:</label>
                            <input onclick="enviarEmail('${emailVendedor}', '${emailSupervisor}', '${pedidoVendedor}', this)" type="button" class="btn btn-warning form-control" id="btnEnviar" value="Enviar">
                        </div>
                    </div>
                `
            divVendedores.append(conteudo)
        }
    })
    atualizarContadorVendedores()
}


function enviarEmail(destinatario, emailSupervisor, numPedido, button) {
    var _jSonRest = {
        "to": `${destinatario};${emailSupervisor};expedicao@cigame.com.br`,
        "from": "fluig@cigame.com.br",
        "templateId": "template_pedidos_parado_retira",
        "subject": `Pendência no Pedido ${numPedido} - Mais de 24h no retira`, "dialectId": "pt_BR",
        "param": {
            "corpo": `O Pedido - <strong>${numPedido}</strong> - está parado a mais de <strong>24h na expedição/retira</strong>. Favor entrar em contato com a expedição informando
            a data que o cliente irá buscar ou solicitar o cancelamento do pedido ao seu supervisor!`
        }
    }

    jQuery.ajax({
        method: 'POST',
        data: JSON.stringify(_jSonRest),
        url: '/api/public/alert/customEmailSender',
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function () {
            $(button).val('Enviado').removeClass('btn-warning').addClass('btn-success')

            if ($(button).val() == 'Enviado') {
                setTimeout(() => {
                    $(button).closest('.rowPedidoSelecionado').remove()
                    atualizarContadorVendedores()
                }, 2000)
            }
        },
        error: function (x, e, e2) {
            alert(`Deu erro no envio do e-mail - ${numPedido} -: ${x.status} ${e} ${e2}`)
        }
    })
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

function converterTimeStamp(timestamp) {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
}

function atualizarContadorVendedores() {
    var totalVendedores = $('.rowPedidoSelecionado').length;
    $('.qtdVendedores').text(totalVendedores)
    $('#qtdVendedoresInput').val(totalVendedores)

    if ($('#qtdVendedoresInput').val() == '0') {
        $('#qtdVendedoresInput').val('vazio')
    } else {
        $('#qtdVendedoresInput').val('existemVendedores')
    }
}

$(document).ready(function () {
    taskHandler()
    verificaPedidoEstaChecked()
})