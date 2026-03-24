const EVENTO_INICIO = 13
const REVISAR_PALETES = 37
const REVISAR_RECEBIMENTOS = 39
const REVISAR_DEVOLUCOES = 41
const LIMPEZA_PAV = 95
const REVISAR_INVENTARIO = 47
const REVISAR_ITENS_CORTADOS = 49
const REVISAR_WMS_WINT = 53
const REVISAR_ERROS_OPERACAO_OCORR = 55
const LIMPEZA_EMP_PALET = 58
const REVISAR_FOTOS_CANHOTO = 62
const CHECK_LIST_MAQ_COST_SAIDA = 66
const REVISAR_OCORRENCIAS = 68
const MERCADORIA_PARADA = 72
const SOBRAS_SEPARACAO = 74
const INVENTARIO_BOBINAS_CONTROLE_lOTE = 78
const CHECK_MAQ_COST_FIOS = 80
const CHECK_MQA_CABO = 82
const REVISAR_LIMP_PAV_FIOS = 107
const REUNIAO_OCORRENCIAS = 85
const CHECK_FECHAMENTO = 87
const REVISAR_FOTOS_CANHOTO_DIA = 90

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:

            break

        case REVISAR_PALETES:
            tratarPainel("recebimento")
            break
        case REVISAR_RECEBIMENTOS:
            tratarPainel("recebimento")
            break

        case REVISAR_DEVOLUCOES:
            tratarPainel("recebimento")
            break

        case REVISAR_INVENTARIO:
            tratarPainel("estoque")
            break

        case REVISAR_ITENS_CORTADOS:
            tratarPainel("estoque")
            break

        case REVISAR_WMS_WINT:
            tratarPainel("estoque")
            break

        case REVISAR_ERROS_OPERACAO_OCORR:
            tratarPainel("estoque")
            break

        case LIMPEZA_PAV:
            tratarPainel("recebimento")
            break

        case LIMPEZA_EMP_PALET:
            tratarPainel("estoque")
            break

        case REVISAR_FOTOS_CANHOTO:
            tratarPainel("saida")
            break

        case CHECK_LIST_MAQ_COST_SAIDA:
            tratarPainel("saida")
            break

        case REVISAR_OCORRENCIAS:
            tratarPainel("saida")
            break

        case MERCADORIA_PARADA:
            tratarPainel("saida")
            break

        case SOBRAS_SEPARACAO:
            tratarPainel("saida")
            break

        case INVENTARIO_BOBINAS_CONTROLE_lOTE:
            tratarPainel("fiosEcabos")
            break

        case CHECK_MAQ_COST_FIOS:
            tratarPainel("fiosEcabos")
            break

        case CHECK_MQA_CABO:
            tratarPainel("fiosEcabos")
            break

        case REVISAR_LIMP_PAV_FIOS:
            tratarPainel("fiosEcabos")
            break

        case REUNIAO_OCORRENCIAS:
            tratarPainel("noite")
            break

        case CHECK_FECHAMENTO:
            tratarPainel("noite")
            break

        case REVISAR_FOTOS_CANHOTO_DIA:
            tratarPainel("viaAuto")
            break
    }
}

function tratarPainel(painel) {
    $('.panel-primary').not(`.${painel}`).addClass("blocked");
}

$(document).ready(function () {
    taskHandler()
});