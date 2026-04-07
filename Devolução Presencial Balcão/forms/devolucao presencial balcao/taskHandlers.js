// Constantes e variáveis globais
const SECTION_ID_INICIO = "#registro-devolucao";
const TABLE__GRID_ID = `#gridDevolucao`;
const TIMER = 1000;

const ETAPA_1 = `#registro-devolucao`;
const ETAPA_2 = `#aprovacao-supervisor`;
const ETAPA_3 = `#pos-venda`;
const ETAPA_4 = `#realizar-devolucao`;
const ETAPA_5 = `#finalizacao-pos-venda`;
const ETAPA_6 = `#liberacao-pedido-substituto`;

const VENDAS = `#MasterVendas`;
const POS_VENDA = `#MasterPosVenda`;
const LOGISTICA = `#MasterLog`;

const etapas = [ETAPA_1, ETAPA_2, ETAPA_3, ETAPA_4, ETAPA_5, ETAPA_6];

// Bloqueia todas as seções e desbloqueia apenas a seção atual
function bloquearOutrasSecoes(secaoAtual) {
  etapas.forEach((etapa) => {
    if (etapa !== secaoAtual) {
      $(`${etapa} :input`).parent().addClass("blocked");
    }
  });
}

async function taskHandlerInicio() {
  bloquearOutrasSecoes(ETAPA_1);

  // Habilita form e abre seção antes do await
  $(`${SECTION_ID_INICIO} :input`).parent().removeClass("blocked");
  $(SECTION_ID_INICIO).addClass("in");
  $(VENDAS).addClass("in");
  $(POS_VENDA).removeClass("in");
  $(LOGISTICA).removeClass("in");

  $(`.data`).val(moment().format("L"));
  getSupervisorVendedor();
  $(`#rdPossuiColeta`).trigger("change");
  subprocesso();

  const TIPO_SOLICITANTE = await userSupervisorVendas();
  const VENDEDOR = parent.WCMAPI.getUser();
  const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode();

  $(`#vendedor`).val(VENDEDOR);
  $(`#tipoSolicitante`).val(TIPO_SOLICITANTE);
  $(`#matSolicitante`).val(MATRICULA_VENDEDOR);
}

function taskHandlerAprovacaoSupervisor() {
  const SECTION_ID = `#aprovacao-supervisor`;
  const SELECTOR = `:input[id*=incluirNovamente___]`;

  bloquearOutrasSecoes(SECTION_ID);

  $(`[data-aprovacao-supervisor]`).show();

  exibirSecaoForm(SECTION_ID);

  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  setTimeout(() => {
    popularPaiFilhoProdutosAprovados();

    $(`:input[id*=reprovar___]`).trigger("change");

    $(`${TABLE__GRID_ID} tbody tr:gt(0)`).find("td").removeClass("blocked");
  }, TIMER);

  excluirLinhas(SELECTOR);

  $(`.calc`).trigger("change");

  togglePedidoSubstituto();
  pedidoSubstituto();

  $(VENDAS).addClass("in");
  $(POS_VENDA).removeClass("in");
  $(LOGISTICA).removeClass("in");

  IEsemNF();
}

function taskHandlerValidacaoAprovacao() {
  const SECTION_ID = `#pos-venda`;

  bloquearOutrasSecoes(SECTION_ID);

  exibirSecaoForm(SECTION_ID);

  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(POS_VENDA).addClass("in");
  $(LOGISTICA).removeClass("in");
}

function taskHandlerDevolucao() {
  const SECTION_ID = `#realizar-devolucao`;
  const CONFERENTE = parent.WCMAPI.getUser();
  const MATRICULA_CONFERENTE = parent.WCMAPI.getUserCode();

  bloquearOutrasSecoes(SECTION_ID);

  $(`#conferenteRecebimento`).val(CONFERENTE);
  $(`#matConferenteRecebimento`).val(MATRICULA_CONFERENTE);

  $(`[data-realizar-recebimento]`).show();
  $(`${TABLE__GRID_ID} tbody tr:gt(0)`)
    .find("[data-realizar-recebimento]")
    .removeClass("blocked");

  exibirSecaoForm(SECTION_ID);

  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  $(`[data-observacao]`).hide();
  $(`[data-especialmente`).hide();
  $(`[data-especial]`).hide();
  $(`[data-ddd]`).hide();

  $(VENDAS).addClass("in");
  $(POS_VENDA).removeClass("in");
  $(LOGISTICA).addClass("in");
}

function taskHandlerFinalizacaoAvaliacao() {
  const SECTION_ID = `#finalizacao-pos-venda`;

  bloquearOutrasSecoes(SECTION_ID);

  $(`[data-realizar-recebimento]`).show();

  exibirSecaoForm(SECTION_ID);

  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(`.valorTotalDevolucaoReal`).closest("tr").show();

  $(VENDAS).addClass("in");
  $(POS_VENDA).addClass("in");
  $(LOGISTICA).removeClass("in");
}

function taskHandlerLiberacaoPedidoSubstituto() {
  const SECTION_ID = `#liberacao-pedido-substituto`;

  bloquearOutrasSecoes(SECTION_ID);

  exibirSecaoForm(SECTION_ID);

  $(`${SECTION_ID} :input`).parent().removeClass("blocked");
  $(SECTION_ID).addClass("in");

  $(VENDAS).addClass("in");
  $(POS_VENDA).removeClass("in");
  $(LOGISTICA).addClass("in");
}

function exibirSecaoForm(sectionID) {
  $(sectionID).parent().show();
}

function ocultarSecaoForm(sectionID) {
  $(sectionID).parent().hide();
}
