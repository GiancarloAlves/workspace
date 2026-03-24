function validateForm(form) {
    var TASK = parseInt(getValue("WKNumState"))

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

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:

            break

        case REVISAR_PALETES:
            validaRecebimento()
            break
        case REVISAR_RECEBIMENTOS:
            validaRecebimento()
            break

        case REVISAR_DEVOLUCOES:
            validaRecebimento()
            break

        case REVISAR_INVENTARIO:
            validaEstoque()
            break

        case REVISAR_ITENS_CORTADOS:
            validaEstoque()
            break

        case REVISAR_WMS_WINT:
            validaEstoque()
            break

        case REVISAR_ERROS_OPERACAO_OCORR:
            validaEstoque()
            break

        case LIMPEZA_PAV:
            validaRecebimento()
            break

        case LIMPEZA_EMP_PALET:
            validaEstoque()
            break

        case REVISAR_FOTOS_CANHOTO:
            validaSaida()
            break

        case CHECK_LIST_MAQ_COST_SAIDA:
            validaSaida()
            break

        case REVISAR_OCORRENCIAS:
            validaSaida()
            break

        case MERCADORIA_PARADA:
            validaSaida()
            break

        case SOBRAS_SEPARACAO:
            validaSaida()
            break

        case INVENTARIO_BOBINAS_CONTROLE_lOTE:
            validaFiosEcabos()
            break

        case CHECK_MAQ_COST_FIOS:
            validaFiosEcabos()
            break

        case CHECK_MQA_CABO:
            validaFiosEcabos()
            break

        case REVISAR_LIMP_PAV_FIOS:
            validaFiosEcabos()
            break

        case REUNIAO_OCORRENCIAS:
            validaNoite()
            break

        case CHECK_FECHAMENTO:
            validaNoite()
            break

        case REVISAR_FOTOS_CANHOTO_DIA:
            validaViaAuto()
            break
    }

    function validaRecebimento() {
        const revisaPaletes = form.getValue('task1')
        const revisaReceb = form.getValue('task2')
        const revisaDev = form.getValue('task3')
        const limpezaPav = form.getValue('task4')
        const ObsPendRecebimento = form.getValue('ObsPendRecebimento')

        if (revisaPaletes == 'danger' || revisaReceb == 'danger' || revisaDev == 'danger' || limpezaPav == 'danger') {
            if (ObsPendRecebimento == '' || ObsPendRecebimento == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaEstoque() {
        const revisaInvet = form.getValue('taskEstoq1')
        const revisaItensCort = form.getValue('taskEstoq2')
        const revisaWMSxWINT = form.getValue('taskEstoq3')
        const revisaErros = form.getValue('taskEstoq4')
        const limpezaPavEmp = form.getValue('taskEstoq5')
        const ObsPendEstoque = form.getValue('ObsPendEstoque')

        if (revisaInvet == 'danger' || revisaItensCort == 'danger' || revisaWMSxWINT == 'danger' || revisaErros == 'danger' || limpezaPavEmp == 'danger') {
            if (ObsPendEstoque == '' || ObsPendEstoque == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaSaida() {
        const revisaFotosCanhoto = form.getValue('taskSaida1')
        const checkListMaqSaida = form.getValue('taskSaida2')
        const revisaOcorren = form.getValue('taskSaida3')
        const mercadoriaParad = form.getValue('taskSaida4')
        const sobrasSeparacao = form.getValue('taskSaida5')
        const ObsPendSaida = form.getValue('ObsPendSaida')

        if (revisaFotosCanhoto == 'danger' || checkListMaqSaida == 'danger' || revisaOcorren == 'danger' || mercadoriaParad == 'danger' || sobrasSeparacao == 'danger') {
            if (ObsPendSaida == '' || ObsPendSaida == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaFiosEcabos() {
        const inventBobinasControl = form.getValue('taskFiosCabos1')
        const checkListMaqFiosCabos = form.getValue('taskFiosCabos2')
        const checkListMaqCabos = form.getValue('taskFiosCabos3')
        const revisaLimpezaPav = form.getValue('taskFiosCabos4')
        const ObsPendFiosECabos = form.getValue('ObsPendFiosECabos')

        if (inventBobinasControl == 'danger' || checkListMaqFiosCabos == 'danger' || checkListMaqCabos == 'danger' || revisaLimpezaPav == 'danger') {
            if (ObsPendFiosECabos == '' || ObsPendFiosECabos == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaNoite() {
        const reuniaoOcorren = form.getValue('taskNoite1')
        const checkFechamento = form.getValue('taskNoite2')
        const ObsPendNoite = form.getValue('ObsPendNoite')

        if (reuniaoOcorren == 'danger' || checkFechamento == 'danger') {
            if (ObsPendNoite == '' || ObsPendNoite == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }

    function validaViaAuto() {
        const revisaFotosCanhotoTransp = form.getValue('taskViaAuto1')
        const ObsPendViaAuto = form.getValue('ObsPendViaAuto')

        if (revisaFotosCanhotoTransp == 'danger') {
            if (ObsPendViaAuto == '' || ObsPendViaAuto == null) {
                throw ("Você deve esclarecer a pendência!")
            }
        }
    }
}