// Constantes e variáveis globais
const SECTION_ID_INICIO = "#registro-devolucao"
const TABLE__GRID_ID = `#gridDevolucao`
const TIMER = 1000

async function taskHandlerInicio() {
    // Busca o supervisor do vendedor
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#vendedor`).val(VENDEDOR)
    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)

    // Habilita form
    $(`${SECTION_ID_INICIO} :input`).parent().removeClass("blocked")
    
    // Aciona o select para habilitar ou desebalitar o campo endereço de coleta
    $(`#rdPossuiColeta`).trigger("change")

    }

function taskHandlerAprovacaoSupervisor() {
    const SECTION_ID = `#aprovacao-supervisor`
    const SELECTOR = `:input[id*=incluirNovamente___]`

    // Exibe campo no pai-filho 
    $(`[data-aprovacao-supervisor]`).show()

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)
    
    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")

    // Popula pai-filho original com as linhas que foram incluídas novamente
    setTimeout(() => {
        popularPaiFilhoProdutosAprovados()
            
        // Aciona o select para habilitar ou desebalitar o campo aprovar solicitação
        $(`:input[id*=reprovar___]`).trigger("change")
        
        // Habilitar pai-filho
        $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked")
    }, TIMER)

    // Remove as linhas pai-filho de produtos reprovados
    excluirLinhas(SELECTOR)

    $(`.calc`).trigger("change")

    pedidoSubstituto()

}

function taskHandlerAjustarDevolucao() {
    const SECTION_ID = `#ajustar-devolucao`
    const SELECTOR = `:input[id*=reprovar___]`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")

    // Popula pai-filho de reprovados com as linhas excluídas no pai-filho original
    setTimeout(() => popularPaiFilhoProdutosReprovados(), TIMER)

    // Remove as linhas reprovadas do pai-filho original
    excluirLinhas(SELECTOR)

    // mostrarAtividadesExecutadas(SECTION_ID)
}

function taskHandlerAprovacaoGerenteVendas() {
    const SECTION_ID = `#aprovacao-gerente`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerAlteracaoCobranca() {
    const SECTION_ID = `#alteracao-cobranca`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")

    // Exibe grid em modo de visualização
    gridHandler()

    // mostrarAtividadesExecutadas(SECTION_ID)
}

function taskHandlerRealizarColeta() {
    const SECTION_ID = `#realizar-coleta`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerRealizarRecebimento() {
    const SECTION_ID = `#realizar-recebimento`
    const CONFERENTE = parent.WCMAPI.getUser()
    const MATRICULA_CONFERENTE = parent.WCMAPI.getUserCode()

    $(`#conferenteRecebimento`).val(CONFERENTE)
    $(`#matConferenteRecebimento`).val(MATRICULA_CONFERENTE)   

    // Exibe/esconde campos no pai-filho 
    $(`[data-realizar-recebimento]`).show()
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("[data-realizar-recebimento]").removeClass("blocked")

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Mostra rodapé valor real
    $(`.valorTotalDevolucaoReal`).closest("tr").show()

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
    $(`[data-observacao]`).hide()
    $(`[data-especialmente`).hide()
    $(`[data-especial]`).hide()
    $(`[data-ddd]`).hide()
}

function taskHandlerConfrimarColeta() {
    const SECTION_ID = `#confirmar-coleta`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerRevisarDevolucao() {
    const SECTION_ID = `#revisar-devolucao`

    // Exibe campo no pai-filho 
    $(`[data-revisar-devolucao]`).show()

    // Exibe campos no pai-filho 
    $(`[data-realizar-recebimento]`).show()

    // Muda o valor do campo que resolve o exclusivo
    $(`#recebimentoOk`).val("Sim")

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Mostra rodapé valor real
    $(`.valorTotalDevolucaoReal`).closest("tr").show()

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked")
    $(SECTION_ID).addClass("in")
        
    $(`[data-observacao]`).hide()
    $(`[data-especialmente`).hide()
    $(`[data-especial]`).hide()
    $(`[data-ddd]`).hide()
}

function taskHandlerRecebimentoAjustado() {
    const SECTION_ID = `#recebimento-ajustado`
    const CONFERENTE = parent.WCMAPI.getUser()
    const MATRICULA_CONFERENTE = parent.WCMAPI.getUserCode()

    $(`#conferenteRecAjustado`).val(CONFERENTE)
    $(`#matConferenteRecAjustado`).val(MATRICULA_CONFERENTE) 

    // Exibe campos no pai-filho 
    $(`[data-revisar-devolucao]`).show()

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerAcertoCredito() {
    const SECTION_ID = `#acerto-credito`

    // Exibe campos no pai-filho 
    $(`[data-revisar-devolucao]`).show()

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")

    aplicaPenalidade()
}

function taskHandlerDecisaoGerente() {
    const SECTION_ID = `#penalidade-gerente`

    // Exibe campos no pai-filho 
    $(`[data-realizar-recebimento]`).show()
    $(`[data-revisar-devolucao]`).show()

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")

    // Mostra rodapé valor real
    $(`.valorTotalDevolucaoReal`).closest("tr").show()
}

function taskHandlerAcao() {
    const SECTION_ID = `#acao-comportamental`
    const PENALIDADE = $(`#acaoPenalidade`).val()

    // Exibe no campo a penalidade selecionada pelo gerente
    $(`#penalidade`).val(PENALIDADE)

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerConfirmarDevolucao() {
    $(`.panel-collapse`).addClass("in")

    // Mostra rodapé valor real
    $(`.valorTotalDevolucaoReal`).closest("tr").show()
}

function taskHandlerAnalisarDevolucao() {
    // Exibe campos no pai-filho 
    $(`[data-realizar-recebimento]`).show()
    $(`[data-analisar-devolucao]`).show()

    // Mostra rodapé valor real
    $(`.valorTotalDevolucaoReal`).closest("tr").show()

    // Habilita form
    // $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked")
    $(`[data-observacao]`).hide()
    $(`[data-especialmente`).hide()
    $(`[data-especial]`).hide()
    $(`[data-ddd]`).hide()
    $(`[data-conferente]`).hide()
    $(`[data-divergente]`).hide()
}

function taskHandlerAvaliacaoGerente() {
    const SECTION_ID = `#avaliacao-gerente`

    // Seta valor campo
    $(`#rdCompras`).val("Não")

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerAvaliacaoCompras() {
    const SECTION_ID = `#avaliacao-compras`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerCriarRoteiro() {
    const SECTION_ID = `#criar-roteiro`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
    $(SECTION_ID).addClass("in")
}

function taskHandlerDesfazAlteracao() {
    const SECTION_ID = `#desfaz-alteracao`

    // Exibe seção da atividade
    exibirSecaoForm(SECTION_ID)

    // Habilita form
    $(`${SECTION_ID} :input`).parent().removeClass("blocked")
}

function exibirSecaoForm(sectionID) {
    $(sectionID).parent().show()
}

function ocultarSecaoForm(sectionID) {
    $(sectionID).parent().hide()
}
