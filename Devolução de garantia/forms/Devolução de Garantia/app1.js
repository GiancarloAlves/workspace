// Constantes e variáveis globais
const DEFAULT_INDEX = 0;
const MAX_PERCENT = 100;
let INDEX;

function aplicarMascaras() {
  FLUIGC.calendar(`.calendar`);

  $(`#nrSolicFluig`).val(
    getWKNumState() ? getWKNumProcess() : "Gerado após o envio desta etapa..."
  );
}

function liberacaoCredito() {
  const CREDITO = $(`#tipoCred`).val();

  switch (CREDITO) {
    case "A VISTA":
    case "CARTAO CREDITO":
    case "CARTAO CREDITO 1X":
    case "CARTAO CREDITO 10X":
    case "CARTAO CREDITO 11X":
    case "CARTAO CREDITO 12X":
    case "CARTAO CREDITO 2X":
    case "CARTAO CREDITO 3X":
    case "CARTAO CREDITO 4X":
    case "CARTAO CREDITO 5X":
    case "CARTAO CREDITO 6X":
    case "CARTAO CREDITO 7X":
    case "CARTAO CREDITO 8X":
    case "CARTAO CREDITO 9X":
    case "CARTAO DE DEBITO":
      $(`#responsCred`).val("Melissa Silva");
      $(`#matCred`).val("483");
      break;

    default:
      $(`#responsCred`).val("Maisa Rodrigues");
      $(`#matCred`).val("535");
  }
}

function gerenciarPaiFilho() {
  $(".js-add").each((i, el) => {
    let tableName = $(el).attr("data-tablename");
    const tableRows = $(`table[tablename='${tableName}'] tbody tr`).length;

    if (tableRows == 1) {
      const tableHeaders = $(`table[tablename='${tableName}'] thead th`).length;
      $(`table[tablename='${tableName}'] tbody`).append(`
                <tr>
                    <td class="js-pai-filho-polyfill" colspan="${tableHeaders}">Nenhum registro informado ainda.</td>
                </tr>`);
    }
  });

  // Adiciona linha no pai-filho
  $(document).on("click", ".js-add", (e) => {
    const tablename = $(e.target).attr("data-tablename");
    INDEX = wdkAddChild(tablename);
    filtrarZoom();

    $(`table[tablename='${tablename}'] tbody .js-pai-filho-polyfill`)
      .parent()
      .remove();
  });

  // Remove linha do pai-filho
  $(document).on("click", ".remove-button", (e) => {
    const tableID = $(e.target).closest("table").attr("tablename");
    const tableRows = $(`table[tablename='${tableID}'] tbody tr`).length;

    if (tableRows === 2) {
      const tableHeaders = $(e.target).closest("table").find("th").length;
      $(e.target).closest("tbody").append(`
                <tr>
                    <td class="js-pai-filho-polyfill" colspan="${tableHeaders}">Nenhum registro informado ainda.</td>
                </tr>
            `);
    }

    fnWdkRemoveChild(e.target);
    calcularValorTotalDevolucao();
  });
}

function calcularValorTotal(row) {
  const QUANTIDADE = $(`#qtdeDevolvida___${row}`).val();
  const VALOR_UNITARIO = Number($(`#valorUnitario___${row}`).val());

  $(`#valorTotal___${row}`).val(formataDinheiro(QUANTIDADE * VALOR_UNITARIO));
}

function calcularValorTotalDevolucao() {
  const TABLE_ID = Array.from($(`[tablename]`)),
    TARGET_ID = "valorTotalDevolucao",
    VALOR_TOTAL_SELECTOR = ".valorTotal:gt(0)";

  // VALOR TOTAL DA DEVOLUÇÃO (Previsto)
  TABLE_ID.map((el) => {
    const TABLE = `#${el.id}`;
    const INPUT_HIDDEN = $(el).find("tfoot").find("input");

    const VALOR_TOTAL_DEVOLUCAO = Array.from(
      $(TABLE).find(VALOR_TOTAL_SELECTOR)
    ).reduce((pv, cv) => {
      return pv + Number(cv.value.replace(/[^0-9,]*/g, "").replace(",", "."));
    }, DEFAULT_INDEX);

    $(el)
      .find("tfoot")
      .find("span")
      .html(formataDinheiro(VALOR_TOTAL_DEVOLUCAO));
    INPUT_HIDDEN ? INPUT_HIDDEN.val(VALOR_TOTAL_DEVOLUCAO) : "";
  });

  // VALOR TOTAL DA DEVOLUÇÃO (Real)
  const QTDE_RECEBIDA_SELECTOR = Array.from($(`:input[id*=qtdeRecebida___]`));

  if (QTDE_RECEBIDA_SELECTOR.length) {
    const PRODUTO_VALOR_UNITARIO = QTDE_RECEBIDA_SELECTOR.map((el) => {
      const [, ROW] = el.id.split("___");
      const QTDE_RECEBIDA = el.value;
      const VALOR_UNITARIO = Number($(`#valorUnitario___${ROW}`).val());

      return QTDE_RECEBIDA * VALOR_UNITARIO;
    });

    const VALOR_TOTAL_DEVOLUCAO_REAL = PRODUTO_VALOR_UNITARIO.reduce(
      (pv, cv) => pv + cv
    );
    $(`.valorTotalDevolucaoReal`).html(
      formataDinheiro(VALOR_TOTAL_DEVOLUCAO_REAL)
    );
  }
}

function formataDinheiro(valor) {
  return valor
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function filtrarZoom() {
  $('[name^="reprovar___"]').each(function (i) {
    const COD_CLIENTE = $(`#filtroNF`).val();
    console.log("COD_CLIENTE:", COD_CLIENTE); // Verificar valor de COD_CLIENTE

    const numeroNFId = `numeroNF___${i + 1}`;
    const descProdutoId = `descProduto___${i + 1}`;
    const codProdutoId = `codProduto___${i + 1}`;

    if ($(`[name="${numeroNFId}"]`).length) {
      console.log("Aplicando filtro para numeroNF:", numeroNFId);
      reloadZoomFilterValues(numeroNFId, `A01_NOTA,${COD_CLIENTE}`);
    }

    if ($(`[name="${descProdutoId}"]`).length) {
      console.log("Aplicando filtro para descProduto:", descProdutoId);
      reloadZoomFilterValues(descProdutoId, `A01_NOTA,${COD_CLIENTE}`);
    }

    if ($(`[name="${codProdutoId}"]`).length) {
      console.log("Aplicando filtro para codProduto:", codProdutoId);
      reloadZoomFilterValues(codProdutoId, `A01_NOTA,${COD_CLIENTE}`);
    }
  });
}

async function getDadosAdicionaisUser(user) {
  const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  const DATA = await RESPONSE.json();
  return DATA;
}

async function userSupervisorVendas() {
  const DADOS_ADICIONAIS = await getDadosAdicionaisUser(
    parent.WCMAPI.getUserCode()
  );
  const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles;
  const ID_PAPEL = "SUPERVISOR_DE_VENDAS";

  return PAPEIS_USUARIO.includes(ID_PAPEL) ? "Supervisor" : "Vendedor";
}

async function getSupervisorVendedor() {
  const DADOS_ADICIONAIS = await getDadosAdicionaisUser(
    parent.WCMAPI.getUserCode()
  );
  const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor;
  const MATRICULA_SUPERVISOR =
    DADOS_ADICIONAIS.content.extData["Matricula_supervisor"];

  $(`#supervisorSolicitante`).val(SUPERVISOR);
  $(`#matSupervisor`).val(MATRICULA_SUPERVISOR);
}

function ocultarCamposPaiFilho() {
  $(`[data-aprovacao-supervisor]`).hide();
  $(`[data-realizar-recebimento]`).hide();
  $(`[data-revisar-devolucao]`).hide();
  $(`[data-analisar-devolucao]`).hide();
  $(`[data-especialmente]`).hide();
  $(`[data-ddd]`).hide();
}

function ocultarSecoesForm() {
  $(`.panel-primary:gt(1)`).hide();
}

function displayFieldsJS() {
  taskHandler();
}

function validarProdutosReprovados() {
  const SELECTOR = `:input[id*=reprovar___]`;

  $(`body`).on("change", `${SELECTOR}`, (e) => {
    const STATUS = $(`${SELECTOR}:checked`).length;
    const EL = $(`#rdAprovaSup`).parent();
    STATUS ? EL.addClass("blocked") : EL.removeClass("blocked");

    $(`#itemReprovado`).val(STATUS ? "Sim" : "Não");
  });
}

function validarProdutoEspecial() {
  const SELECTOR = $(`.especial`),
    FIELD_ID = "#produtoEspecial";

  Array.from(SELECTOR).map((el) => {
    const PRODUTO_ESPECIAL =
      getFormMode() == "VIEW" ? $(el).text() : el.value == "Sim";
    const PRODUTO_FORA_PRAZO = $(el).closest("tr").find(".fora-prazo").val();
    const PRODUTO_FORA_PRAZO_STATUS = PRODUTO_FORA_PRAZO == "Fora do Prazo";

    if (PRODUTO_ESPECIAL || (PRODUTO_ESPECIAL && PRODUTO_FORA_PRAZO)) {
      $(el).parent().closest("tr").addClass("produto-especial");
    } else if (PRODUTO_FORA_PRAZO_STATUS) {
      $(el).parent().closest("tr").addClass("produto-fora-prazo");
    }
  });

  const PRODUTO_ESPECIAL = SELECTOR.parent()
    .closest("tr")
    .hasClass("produto-especial");
  PRODUTO_ESPECIAL ? $(FIELD_ID).val("Sim") : $(FIELD_ID).val("Não");
}

function aplicarBinds() {
  // Encaminha para a aba de anexos
  $(`.showcamera`).on("click", (_) => JSInterface.showCamera());

  // Habilita ou desabilita zoom endereço de coleta
  $(`[data-coleta]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    // e.target.value == "Sim" ? EL.removeClass("blocked") : EL.addClass("blocked")
  });

  $(`[data-ligar]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    // e.target.value == "Sim" ? EL.removeClass("blocked") : EL.addClass("blocked")
  });

  // Calcular valor total pai-filho
  $(`body`).on("change", ".calc", (e) => {
    const [, ROW] = e.target.id.split("___");
    const QUANTIDADE = Number(
      $(e.target).closest(`tr`).find(`:input[id*=qtde___]`).val()
    );
    validarQtDevolvida(e.target.value, QUANTIDADE, ROW);

    calcularValorTotal(ROW);
    calcularValorTotalDevolucao();
  });

  $(`body`).on("change", ".qtde-recebida", (e) =>
    calcularValorTotalDevolucao()
  );

  // Habilita o desabilita a aprovação do gerente de vendas
  $(`#rdCompras`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    // e.target.value == "Sim" ? EL.addClass("blocked") : EL.removeClass("blocked")
  });

  // Calcular quantidade divergente pai-filho
  $(`body`).on("change", ":input[id*=qtdeRecebida___]", (e) =>
    calcularQtdeDivergente()
  );

  // Aciona o select para habilitar ou desebalitar o campo
  $(`#rdCompras`).trigger("change");

  // Valida se o produto é especial e pinta a linha do pai-filho caso seja
  validarProdutoEspecial();

  // Calcula o valor total da devolução
  calcularValorTotalDevolucao();

  // Valida se algum produto foi reprovado pelo supervisor
  validarProdutosReprovados();

  // Aplica valor máximo no input number pai-filho
  setMaxInput();

  // Filtra campos de zoom
  filtrarZoom();

  // Garante que o valor total da dovolução sempre fique abaixo da coluna valor total
  setTimeout(() => atualizarCellIndex(), TIMER);

  // FORM VIEW
  if (getFormMode() == "VIEW") {
    validarProdutoEspecial();
    calcularValorTotalDevolucao();
  }
}

function consultarProdutosReprovados() {
  const TABLE_NAME = "gridDevolucao";

  const C1 = DatasetFactory.createConstraint(
    "tablename",
    TABLE_NAME,
    TABLE_NAME,
    ConstraintType.MUST
  );
  const C2 = DatasetFactory.createConstraint(
    "metadata#id",
    getDocumentId(),
    getDocumentId(),
    ConstraintType.MUST
  );
  const C3 = DatasetFactory.createConstraint(
    "reprovar",
    "Sim",
    "Sim",
    ConstraintType.MUST
  );
  const DATASET = DatasetFactory.getDataset(
    "ds_dev_garan_form_winthor",
    null,
    [C1, C2, C3],
    null
  );

  const { columns, values } = DATASET;
  const PRODUTOS_REPROVADOS = values;

  return PRODUTOS_REPROVADOS;
}

function consultarProdutosAprovados() {
  const TABLE_NAME = "gridDevolucaoRep";

  const C1 = DatasetFactory.createConstraint(
    "tablename",
    TABLE_NAME,
    TABLE_NAME,
    ConstraintType.MUST
  );
  const C2 = DatasetFactory.createConstraint(
    "metadata#id",
    getDocumentId(),
    getDocumentId(),
    ConstraintType.MUST
  );
  const C3 = DatasetFactory.createConstraint(
    "incluirNovamente",
    "Sim",
    "Sim",
    ConstraintType.MUST
  );
  const DATASET = DatasetFactory.getDataset(
    "ds_dev_garan_form_winthor",
    null,
    [C1, C2, C3],
    null
  );

  const { columns, values } = DATASET;
  const PRODUTOS_REPROVADOS = values;

  return PRODUTOS_REPROVADOS;
}

function popularPaiFilhoProdutosAprovados() {
  const PRODUTOS_APROVADOS = consultarProdutosAprovados();
  const TABLE_NAME = "gridDevolucao";

  if (PRODUTOS_APROVADOS.lenght) {
    PRODUTOS_APROVADOS.map((el) => {
      $(`[data-tablename="${TABLE_NAME}"]`).trigger("click");

      window[`numeroNF___${INDEX}`].setValue(el.numeroNFRep);
      window[`codProduto___${INDEX}`].setValue(el.codProdutoRep);
      window[`descProduto___${INDEX}`].setValue(el.descProdutoRep);

      $(`#foraPrazo___${INDEX}`).val(el.foraPrazoRep);
      $(`#qtde___${INDEX}`).val(el.qtdeRep);
      $(`#valorUnitario___${INDEX}`).val(el.valorUnitarioRep);
      $(`#qtdeDevolvida___${INDEX}`).val(el.qtdeDevolvidaRep);
      $(`#valorTotal___${INDEX}`).val(el.valorTotalRep);
      $(`#pedidoEspecial___${INDEX}`).val(el.pedidoEspecialRep);
      $(`#observacao___${INDEX}`).val(el.observacaoRep);

      el.especialmentePedidoRep == "Sim"
        ? $(`#especialmentePedido___${INDEX}`).prop("checked", true)
        : $(`#especialmentePedido___${INDEX}`).prop("checked", false);
      el.produtoDDDRep == "Sim"
        ? $(`#produtoDDD___${INDEX}`).prop("checked", true)
        : $(`#produtoDDD___${INDEX}`).prop("checked", false);
    });
  }

  aplicarBinds();
}

function popularPaiFilhoProdutosReprovados() {
  const PRODUTOS_REPROVADOS = consultarProdutosReprovados();
  const TABLE_NAME = "gridDevolucaoRep";

  if (PRODUTOS_REPROVADOS.length) {
    PRODUTOS_REPROVADOS.map((el) => {
      $(`[data-tablename="${TABLE_NAME}"]`).trigger("click");

      window[`numeroNFRep___${INDEX}`].setValue(el.numeroNF);
      window[`codProdutoRep___${INDEX}`].setValue(el.codProduto);
      window[`descProdutoRep___${INDEX}`].setValue(el.descProduto);

      $(`#foraPrazoRep___${INDEX}`).val(el.foraPrazo);
      $(`#qtdeRep___${INDEX}`).val(el.qtde);
      $(`#valorUnitarioRep___${INDEX}`).val(el.valorUnitario);
      $(`#qtdeDevolvidaRep___${INDEX}`).val(el.qtdeDevolvida);
      $(`#valorTotalRep___${INDEX}`).val(el.valorTotal);
      $(`#pedidoEspecialRep___${INDEX}`).val(el.pedidoEspecial);
      $(`#observacaoRep___${INDEX}`).val(el.observacao);

      el.especialmentePedido == "Sim"
        ? $(`#especialmentePedidoRep___${INDEX}`).prop("checked", true)
        : $(`#especialmentePedidoRep___${INDEX}`).prop("checked", false);
      el.produtoDDD == "Sim"
        ? $(`#produtoDDDRep___${INDEX}`).prop("checked", true)
        : $(`#produtoDDDRep___${INDEX}`).prop("checked", false);
    });
  }

  aplicarBinds();
}

function excluirLinhas(SELECTOR) {
  const LINHAS = Array.from($(`${SELECTOR}:checked`));

  if (LINHAS.length) {
    LINHAS.map((el) =>
      $(el).closest("tr").find(".remove-button").trigger("click")
    );
  }
}

function calcularQtdeDivergente() {
  const SELECTOR = Array.from($(`:input[id*=qtdeRecebida___]`));

  if (SELECTOR.length) {
    SELECTOR.map((el) => {
      const [, ROW] = el.id.split("___");
      const QUANTIDADE_DIVERGENTE = $(`#qtdeDivergente___${ROW}`);

      const QUANTIDADE_DEVOLVIDA = Number($(`#qtdeDevolvida___${ROW}`).val());
      const QUANTIDADE_RECEBIDA = Number($(`#qtdeRecebida___${ROW}`).val());

      if (QUANTIDADE_DEVOLVIDA && QUANTIDADE_RECEBIDA) {
        QUANTIDADE_DEVOLVIDA !== QUANTIDADE_RECEBIDA
          ? QUANTIDADE_DIVERGENTE.prop("checked", true)
          : QUANTIDADE_DIVERGENTE.prop("checked", false);
      }
    });
  }
}

async function viaCEP(CEP) {
  const RESPONSE = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
}

// Refazer depois com /process-management/api/v2/tasks?processInstanceId=0000&status=COMPLETED
function mostrarAtividadesExecutadas() {
  const SECTIONS = Array.from($(`.panel-collapse`));
  const INPUT_TYPE = `:input:not([type="hidden"]):not([readonly]):not([type="checkbox"])`;

  SECTIONS.map((el) => {
    const INPUT_VALUES = Array.from($(el).find(INPUT_TYPE)).flatMap((input) =>
      input.value ? input.value : []
    );
    const SECTION_ID = `#${el.id}`;

    if (INPUT_VALUES.length) {
      exibirSecaoForm(SECTION_ID);

      // $(`${SECTION_ID} :input:not([type="hidden"]):not(".js-add")`).parent().addClass("blocked")
      $(SECTION_ID).removeClass("in");
      $(SECTION_ID_INICIO).addClass("in");
    }
  });
}

function gridHandler() {
  const TABLE_ID = `#gridDevolucao`;
  const CURRENT_TASK = Number(getWKNumState());

  switch (CURRENT_TASK) {
    case CRIAR_ROTEIRO:
    case REALIZAR_RECEBIMENTO:
    case ACERTO_CREDITO:
      $(`${TABLE_ID} tbody td`).addClass("blocked");

      $(`[data-valor-unitario]`).hide();
      $(`[data-especialmente`).hide();
      $(`[data-especial]`).hide();
      $(`[data-ddd]`).hide();
      $(`:input[id*=receber___]`).parent().removeClass("center-content");
      $(`.js-add`).addClass("blocked");

      setTimeout(() => redimensionarTabela(TABLE_ID), TIMER);
      break;
  }
}

function redimensionarTabela(TABLE_ID) {
  const SELECTOR = $(`${TABLE_ID} thead th:visible`);
  const LENGTH = SELECTOR.length - 1;
  const WIDTH = MAX_PERCENT / LENGTH;

  SELECTOR.css("width", `${WIDTH}%`);
}

function atualizarCellIndex() {
  const [CELL_INDEX] = Array.from(
    $(`${TABLE__GRID_ID} thead th:visible`)
  ).flatMap((el, CELL_INDEX) =>
    el.hasAttribute("data-valor-total") ? CELL_INDEX : []
  );

  $(`${TABLE__GRID_ID} tfoot`).find("th").attr("colspan", CELL_INDEX);
}

function dispararAlerta(settings) {
  Swal.fire({
    icon: settings.icone,
    title: settings.titulo,
    text: `${settings.mensagem}`,
    timer: 2200,
  });
}

$(document).ready(() => {
  moment.locale("pt-br");

  aplicarMascaras();
  gerenciarPaiFilho();
  // ocultarCamposPaiFilho()
  ocultarSecoesForm();
  mostrarAtividadesExecutadas();
  gridHandler();
  displayFieldsJS();
  aplicarBinds();
  mostrarTodasSecoes();
});

function deployNota() {
  $("#addNF").attr("hidden", true);
  $(".adicionarItem").removeClass("blocked");
  tablename = "gridDevolucao";
  const tableHeaders = $(`table[tablename='${tablename}'] thead th`).length;

  $(`table[tablename='${tablename}'] tbody`).append(`
    <tr>
        <td class="js-pai-filho-polyfill" colspan="${tableHeaders}">NF listada por completo</td>
    </tr>`);

  const NF = document.getElementById("filtroNF").value;

  var c1 = DatasetFactory.createConstraint(
    "A01_NOTA",
    NF,
    NF,
    ConstraintType.MUST
  );
  var constraints = new Array(c1);

  var dataset = DatasetFactory.getDataset(
    "ds_dev_garan_form_winthor",
    null,
    constraints,
    null
  );

  for (var i = 0; i < dataset.values.length; i++) {
    wdkAddChild("gridDevolucao");

    $("#valorUnitario___" + newId).val(dataset.values[i].A06_VL_VENDA_UNIT);
    // $("#foraPrazo___" + newId).val(dataset.values[i].DATA_DEVOL);
    $("#qtde___" + newId).val(dataset.values[i].A05_QT_UNIT);

    window[`codProduto___` + newId].setValue(dataset.values[i].A03_COD_PROD);
    window[`descProduto___` + newId].setValue(dataset.values[i].A04_PRODUTO);
    window[`numeroNF___` + newId].setValue(dataset.values[i].A01_NOTA);

    validarProdutoEspecial();
    calcularValorTotal(newId);
    calcularValorTotalDevolucao();
    liberacaoCredito();

    $(`table[tablename='${tablename}'] tbody .js-pai-filho-polyfill`)
      .parent()
      .remove();
  }
}

function mostrarTodasSecoes() {
  $(`.panel-primary`).show();
}

function updateLED(ledID, isActive) {
  if (isActive) {
    $(`#${ledID}`).removeClass("inativo").addClass("ativo");
    $(".led").not(`#${ledID}`).removeClass("ativo").addClass("inativo");
  } else {
    $(`#${ledID}`).removeClass("ativo").addClass("inativo");
    $(".led").not(`#${ledID}`).removeClass("inativo").addClass("ativo");
  }
}

function revisarDivergencia() {
  if ($("#devolucaoRevisada").val() == "divergencia") {
    $(".divCodProdutoDiver").removeClass("blocked");
    $(".divQtdRecebido").removeClass("blocked");
    $(".divQtdEsperada").removeClass("blocked");
  } else {
    $(".divCodProdutoDiver").addClass("blocked");
    $(".divQtdRecebido").addClass("blocked");
    $(".divQtdEsperada").addClass("blocked");
  }
}

function bloqueiaCampoPossuiColeta() {
  if ($("#localCliente").val() == "balcao") {
    $("#rdPossuiColeta").addClass("blocked");
    $("#rdPossuiColeta").val("nao");
  } else {
    $("#rdPossuiColeta").removeClass("blocked");
    $("#rdPossuiColeta").val();
  }

  console.log("entrou");
}

function ligarLED(ledID) {
  // Seleciona o LED específico com base no ID fornecido
  var ledEspecifico = $("#" + ledID);

  // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
  ledEspecifico.removeClass("inativo").addClass("ativo");
}
