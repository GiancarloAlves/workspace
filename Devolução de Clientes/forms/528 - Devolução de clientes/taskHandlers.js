// Constantes e variáveis globais
const SECTION_ID_INICIO = "#registro-devolucao";
const TABLE__GRID_ID = `#gridDevolucao`;
const TIMER = 1000;

const ETAPA_1 = `#registro-devolucao`;
const ETAPA_2 = `#aprovacao-supervisor`;
const ETAPA_3 = `#ajustar-devolucao`;
const ETAPA_4 = `#aprovacao-gerente`;
const ETAPA_5 = `#alteracao-cobranca`;
const ETAPA_6 = `#realizar-coleta`;
const ETAPA_7 = `#realizar-recebimento`;
const ETAPA_8 = `#confirmar-coleta`;
const ETAPA_9 = `#revisar-devolucao`;
const ETAPA_10 = `#recebimento-ajustado`;
const ETAPA_11 = `#acerto-credito`;
const ETAPA_12 = `#penalidade-gerente`;
const ETAPA_13 = `#acao-comportamental`;
const ETAPA_14 = `#confirmar-devolucao`;
const ETAPA_15 = `#analisar-devolucao`;
const ETAPA_16 = `#avaliacao-gerente`;
const ETAPA_17 = `#avaliacao-compras`;
const ETAPA_18 = `#criar-roteiro`;
const ETAPA_19 = `#desfaz-alteracao`;

const VENDAS = `#MasterVendas`;
const FIN = `#MasterFin`;
const LOGISTICA = `#MasterLog`;
const RH = `#MasterRH`;
const COMPRAS = `#MasterCompras`;

const etapas = [
  ETAPA_1,
  ETAPA_2,
  ETAPA_3,
  ETAPA_4,
  ETAPA_5,
  ETAPA_6,
  ETAPA_7,
  ETAPA_8,
  ETAPA_9,
  ETAPA_10,
  ETAPA_11,
  ETAPA_12,
  ETAPA_13,
  ETAPA_14,
  ETAPA_15,
  ETAPA_16,
  ETAPA_17,
  ETAPA_18,
  ETAPA_19,
];

async function taskHandlerInicio() {
  // const SECTION_ID = `#registro-devolucao`

  console.log(SECTION_ID_INICIO);

  $(`.data`).val(moment().format("L"));
  // Busca o supervisor do vendedor
  getSupervisorVendedor();
  // $("#freteConta").addClass("blocked")

  const TIPO_SOLICITANTE = await userSupervisorVendas();
  const VENDEDOR = parent.WCMAPI.getUser();
  const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode();

  $(`#vendedor`).val(VENDEDOR);
  $(`#tipoSolicitante`).val(TIPO_SOLICITANTE);
  $(`#matSolicitante`).val(MATRICULA_VENDEDOR);

  // Habilita form
  $(`${SECTION_ID_INICIO} :input`).parent().removeClass("blocked");

  // Aciona o select para habilitar ou desebalitar o campo endereço de coleta
  $(`#rdPossuiColeta`).trigger("change");

  $(SECTION_ID_INICIO).addClass("in");

  $(VENDAS).addClass("in");
  $(FIN).removeClass("in");
  $(LOGISTICA).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");

  subprocesso();

  // const FINALIZA = document.getElementById("coletaReprovada");
  // FINALIZA.value = "Não"
}

function taskHandlerAprovacaoSupervisor() {
  const SECTION_ID = `#aprovacao-supervisor`;
  const SELECTOR = `:input[id*=incluirNovamente___]`;

  // Exibe campo no pai-filho
  $(`[data-aprovacao-supervisor]`).show();

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  // Popula pai-filho original com as linhas que foram incluídas novamente
  setTimeout(() => {
    popularPaiFilhoProdutosAprovados();

    // Aciona o select para habilitar ou desebalitar o campo aprovar solicitação
    $(`:input[id*=reprovar___]`).trigger("change");

    // Habilitar pai-filho
    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  }, TIMER);

  // Remove as linhas pai-filho de produtos reprovados
  excluirLinhas(SELECTOR);

  $(`.calc`).trigger("change");

  pedidoSubstituto();

  $(VENDAS).addClass("in");
  $(FIN).removeClass("in");
  $(LOGISTICA).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");

  IEsemNF();
}

function taskHandlerAjustarDevolucao() {
  const SECTION_ID = `#ajustar-devolucao`;
  const SELECTOR = `:input[id*=reprovar___]`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  // Popula pai-filho de reprovados com as linhas excluídas no pai-filho original
  setTimeout(() => popularPaiFilhoProdutosReprovados(), TIMER);

  // Remove as linhas reprovadas do pai-filho original
  excluirLinhas(SELECTOR);

  // mostrarAtividadesExecutadas(SECTION_ID)

  $(VENDAS).addClass("in");
  $(FIN).removeClass("in");
  $(LOGISTICA).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerAprovacaoGerenteVendas() {
  const SECTION_ID = `#aprovacao-gerente`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");

  var acaoDesconto = parseFloat(document.getElementById("acaoDesconto").value);
  var formattedAcaoDesconto = acaoDesconto.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  $(`acaoDesconto`).val(formattedAcaoDesconto);
  // Agora, 'formattedAcaoDesconto' contém o valor formatado como dinheiro (R$12.000,00)
}

function taskHandlerAlteracaoCobranca() {
  const SECTION_ID = `#alteracao-cobranca`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(FIN).addClass("in");

  // Exibe grid em modo de visualização
  gridHandler();

  // mostrarAtividadesExecutadas(SECTION_ID)
}

function taskHandlerRealizarColeta() {
  const SECTION_ID = `#realizar-coleta`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");
  $(LOGISTICA).addClass("in");
  $(RH).removeClass("in");
}

function taskHandlerRealizarRecebimento() {
  const SECTION_ID = `#realizar-recebimento`;
  const CONFERENTE = parent.WCMAPI.getUser();
  const MATRICULA_CONFERENTE = parent.WCMAPI.getUserCode();

  const materialPresente = document.getElementById("avalColeta");
  materialPresente.value = "Sim";

  const coletaOk = document.getElementById("coletaReprovada");
  coletaOk.value = "Sim";

  $(`#conferenteRecebimento`).val(CONFERENTE);
  $(`#matConferenteRecebimento`).val(MATRICULA_CONFERENTE);

  // Exibe/esconde campos no pai-filho
  $(`[data-realizar-recebimento]`).show();
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`)
    .find("[data-realizar-recebimento]")
    .removeClass("blocked");

  // Exibe seção da atividade
  exibirSecaoForm(ETAPA_6);
  exibirSecaoForm(ETAPA_18);
  $(`${ETAPA_6} :input`).parent().removeClass("blocked");

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Mostra rodapé valor real
  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");
  $(`[data-observacao]`).hide();
  $(`[data-especialmente`).hide();
  $(`[data-especial]`).hide();
  $(`[data-ddd]`).hide();

  $(VENDAS).addClass("in");
  $(LOGISTICA).addClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerConfrimarColeta() {
  const SECTION_ID = `#confirmar-coleta`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");
  $(LOGISTICA).addClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerRevisarDevolucao() {
  const SECTION_ID = `#revisar-devolucao`;

  // Exibe campo no pai-filho
  $(`[data-revisar-devolucao]`).show();

  // Exibe campos no pai-filho
  $(`[data-realizar-recebimento]`).show();

  // Muda o valor do campo que resolve o exclusivo
  $(`#recebimentoOk`).val("Sim");

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Mostra rodapé valor real
  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(`[data-observacao]`).hide();
  $(`[data-especialmente`).hide();
  $(`[data-especial]`).hide();
  $(`[data-ddd]`).hide();

  $(LOGISTICA).addClass("in");
  $(RH).removeClass("in");

  ligarLED("led_abertura");
}

function taskHandlerRecebimentoAjustado() {
  const SECTION_ID = `#recebimento-ajustado`;
  const CONFERENTE = parent.WCMAPI.getUser();
  const MATRICULA_CONFERENTE = parent.WCMAPI.getUserCode();

  $(`#conferenteRecAjustado`).val(CONFERENTE);
  $(`#matConferenteRecAjustado`).val(MATRICULA_CONFERENTE);

  // Exibe campos no pai-filho
  $(`[data-revisar-devolucao]`).show();

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(LOGISTICA).addClass("in");
}

function taskHandlerAcertoCredito() {
  const SECTION_ID = `#acerto-credito`;

  // Exibe campos no pai-filho
  $(`[data-revisar-devolucao]`).show();

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");
  $(FIN).addClass("in");

  aplicaPenalidade();
}

function taskHandlerDecisaoGerente() {
  const SECTION_ID = `#penalidade-gerente`;

  // Exibe campos no pai-filho
  $(`[data-realizar-recebimento]`).show();
  $(`[data-revisar-devolucao]`).show();

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  // Mostra rodapé valor real
  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  $(VENDAS).addClass("in");
  $(LOGISTICA).removeClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerAcao() {
  const SECTION_ID = `#acao-comportamental`;
  const PENALIDADE = $(`#acaoPenalidade`).val();
  const DESCONTO = $(`#acaoDesconto`).val();
  const PARCELAS = $(`#parcelas`).val();

  // Exibe no campo a penalidade selecionada pelo gerente
  $(`#penalidade`).val(PENALIDADE);
  $(`#desconto`).val(DESCONTO);
  $(`#parcelaDP`).val(PARCELAS);

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
}

function taskHandlerConfirmarDevolucao() {
  $(`.panel-collapse`).addClass("in");

  // Mostra rodapé valor real
  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  $(VENDAS).addClass("in");
}

function taskHandlerAnalisarDevolucao() {
  // Exibe campos no pai-filho
  $(`[data-realizar-recebimento]`).show();
  $(`[data-analisar-devolucao]`).show();

  // Mostra rodapé valor real
  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  // Habilita form
  // $(`${SECTION_ID} :input`).parent().removeClass("blocked")
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  $(`[data-observacao]`).hide();
  $(`[data-especialmente`).hide();
  $(`[data-especial]`).hide();
  $(`[data-ddd]`).hide();
  $(`[data-conferente]`).hide();
  $(`[data-divergente]`).hide();

  $(VENDAS).addClass("in");
}

function taskHandlerAvaliacaoGerente() {
  const SECTION_ID = `#avaliacao-gerente`;

  // Seta valor campo
  $(`#rdCompras`).val("Não");

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(LOGISTICA).removeClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerAvaliacaoCompras() {
  const SECTION_ID = `#avaliacao-compras`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  $(SECTION_ID).addClass("in");
  $(RH).removeClass("in");
}

function taskHandlerCriarRoteiro() {
  const SECTION_ID = `#criar-roteiro`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(LOGISTICA).addClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerAprovaLogistica() {
  const SECTION_ID = `#logistica`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(LOGISTICA).removeClass("in");
  $(FIN).removeClass("in");
  $(RH).removeClass("in");
  $(COMPRAS).removeClass("in");
}

function taskHandlerDesfazAlteracao() {
  const SECTION_ID = `#desfaz-alteracao`;

  // Exibe seção da atividade
  exibirSecaoForm(SECTION_ID);

  // Habilita form
  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
}

function exibirSecaoForm(sectionID) {
  $(sectionID).parent().show();
}

function ocultarSecaoForm(sectionID) {
  $(sectionID).parent().hide();
}
