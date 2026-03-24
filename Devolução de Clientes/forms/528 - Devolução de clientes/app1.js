// Constantes e variáveis globais
const DEFAULT_INDEX = 0;
const DATASET_PROCESSO = "dsWFDevolucaoClientes";
const MAX_PERCENT = 100;
let INDEX;

function aplicarMascaras() {
  FLUIGC.calendar(`.calendar`);

  $(`#nrSolicFluig`).val(
    getWKNumState() ? getWKNumProcess() : "Gerado após o envio desta etapa..."
  );
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
    pedidoSubstituto();
    aplicaPenalidade();
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
  const COD_CLIENTE = $(`#codCliente`).val();
  const NF_SELECTOR = $(`:input[id*=numeroNF___]`);
  const DESC_SELECTOR = $(`:input[id*=descProduto___]`);
  const COD_PRODUTO_SELECTOR = $(`:input[id*=codProduto___]`);

  if (NF_SELECTOR.length) {
    Array.from(NF_SELECTOR).map((el) =>
      reloadZoomFilterValues(el.id, "CODCLI," + COD_CLIENTE)
    );
  }

  if (DESC_SELECTOR.length) {
    Array.from(DESC_SELECTOR).map((el) =>
      reloadZoomFilterValues(el.id, "CODCLI," + COD_CLIENTE)
    );
  }

  if (COD_PRODUTO_SELECTOR.length) {
    Array.from(COD_PRODUTO_SELECTOR).map((el) =>
      reloadZoomFilterValues(el.id, "CODCLI," + COD_CLIENTE)
    );
  }
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

  $(`[data-balcao]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    const EL2 = $(`#rdPossuiColeta`);
    const COLETA = document.getElementById("rdPossuiColeta");
    const usuarioConferencia = document.getElementById(
      "usuarioConferenciaMaterial"
    );

    console.log(EL);
    console.log(EL2);

    if (e.target.value == "balcao") {
      EL.addClass("blocked");
      COLETA.value = "Não";
      usuarioConferencia.value = 430;
    } else {
      EL.removeClass("blocked");
      COLETA.value = "";
      usuarioConferencia = [182, 426];
    }
  });

  // Habilita ou desabilita zoom endereço de coleta
  $(`[data-coleta]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    e.target.value == "Sim"
      ? EL.removeClass("blocked")
      : EL.addClass("blocked");
  });

  $(`[data-ligar]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    e.target.value == "Sim"
      ? EL.removeClass("blocked")
      : EL.addClass("blocked");
  });

  $(`[data-destino]`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    e.target.value == "Sim"
      ? EL.addClass("blocked")
      : EL.removeClass("blocked");
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

  // Habilita o desabilita a aprovação do gerente de compras
  $(`#rdCompras`).on("change", (e) => {
    const EL = $(e.target).parent().next();
    e.target.value == "Sim"
      ? EL.addClass("blocked")
      : EL.removeClass("blocked");
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
    DATASET_PROCESSO,
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
    DATASET_PROCESSO,
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

  // if(PRODUTOS_APROVADOS.length) {
  //     PRODUTOS_APROVADOS.map(el => {
  //         $(`[data-tablename="${TABLE_NAME}"]`).trigger("click")

  //         for(const FIELD_NAME in el) {
  //             Array.from($(`#${TABLE_NAME} tbody tr:gt(0) td :input`)).map(e => {
  //                 const ID = e.id
  //                 const [ID_ORIGINAL] = ID.split("___")
  //                 const TYPE = e.type
  //                 const VALUE = el[FIELD_NAME]

  //                 if(ID_ORIGINAL == FIELD_NAME.replace("Rep", "") && ID) {
  //                     switch (TYPE) {
  //                         case "select-multiple":
  //                             window[ID].setValue(VALUE)
  //                             break

  //                         case "checkbox":
  //                             VALUE == "Sim" ? $(`#${ID}`).prop("checked", true) : ""
  //                             break

  //                         default:
  //                             $(`#${ID}`).val(VALUE)
  //                             break
  //                     }
  //                 }
  //             })
  //         }
  //     })
  // }

  // VERSÃO SIMPLIFICADA
  // if(PRODUTOS_APROVADOS.length)
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

  // PRODUTOS_REPROVADOS.map(el => {
  //     $(`[data-tablename="${TABLE_NAME}"]`).trigger("click")

  //     for(const FIELD_NAME in el) {
  //         Array.from($(`#${TABLE_NAME} tbody tr:gt(0) td :input`)).map(e => {
  //             const ID = e.id
  //             const [ID_ORIGINAL] = ID.split("Rep___")
  //             const TYPE = e.type
  //             const VALUE = el[FIELD_NAME]

  //             if(ID_ORIGINAL == FIELD_NAME && ID) {
  //                 switch (TYPE) {
  //                     case "select-multiple":
  //                         window[ID].setValue(VALUE)
  //                         break

  //                     case "checkbox":
  //                         VALUE == "Sim" ? $(`#${ID}`).prop("checked", true) : ""
  //                         break

  //                     default:
  //                         $(`#${ID}`).val(VALUE)
  //                         break
  //                 }
  //             }
  //         })
  //     }
  // })

  // VERSÃO SIMPLIFICADA
  // if(PRODUTOS_REPROVADOS.length)
  if (PRODUTOS_REPROVADOS.lenght) {
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
// function mostrarAtividadesExecutadas() {
//     const SECTIONS = Array.from($(`.panel-collapse`))
//     const INPUT_TYPE = `:input:not([type="hidden"]):not([readonly]):not([type="checkbox"])`

//     SECTIONS.map(el => {
//         const INPUT_VALUES = Array.from($(el).find(INPUT_TYPE)).flatMap(input => input.value ? input.value : [])
//         const SECTION_ID = `#${el.id}`

//         if(INPUT_VALUES.length) {
//             exibirSecaoForm(SECTION_ID)

//             $(`${SECTION_ID} :input:not([type="hidden"]):not(".js-add")`).parent().addClass("blocked")
//             $(SECTION_ID).removeClass("in")
//             $(SECTION_ID_INICIO).addClass("in")
//         }
//     })
// }

function mostrarAtividadesExecutadas() {
  const SECTION_ID_INICIO = "#registro-devolucao";
  const SECTIONS = Array.from($(`.panel-collapse`));
  const INPUT_TYPE = `:input:not([type="hidden"]):not([readonly]):not([type="checkbox"])`;
  const VENDAS = `#MasterVendas`;

  $(".panel-collapse").not(SECTION_ID_INICIO).removeClass("in");

  SECTIONS.map((el) => {
    const INPUT_VALUES = Array.from($(el).find(INPUT_TYPE)).flatMap((input) =>
      input.value ? input.value : []
    );
    const SECTION_ID = `#${el.id}`;

    if (INPUT_VALUES.length) {
      exibirSecaoForm(SECTION_ID);

      $(`${SECTION_ID} :input:not([type="hidden"]):not(".js-add")`)
        .parent()
        .addClass("blocked");
      $(SECTION_ID).removeClass("in");

      $(VENDAS).addClass("in");
      $(SECTION_ID_INICIO).addClass("in");
    }
  });
}

function gridHandler() {
  const TABLE_ID = `#gridDevolucao`;
  const CURRENT_TASK = Number(getWKNumState());
  const DESFAZ_ALTERACAO = DESFAZ_ALTERACAO_COBRANCA.includes(CURRENT_TASK)
    ? CURRENT_TASK
    : "";

  switch (CURRENT_TASK) {
    case APROVACAO_GERENTE_VENDAS:
    case ALTERACAO_COBRANCA:
      $(`${TABLE_ID} tbody td`).addClass("blocked");
      $(`.js-add`).addClass("blocked");
      break;

    case CRIAR_ROTEIRO:
    case REALIZAR_COLETA:
    case REALIZAR_RECEBIMENTO:
    case CONFIRMAR_COLETA:
    case DESFAZ_ALTERACAO:
    case DECISAO_GERENTE:
    case ACERTO_CREDITO:
    case RECEBIMENTO_AJUSTADO:
      $(`${TABLE_ID} tbody td`).addClass("blocked");

      $(`[data-valor-unitario]`).hide();
      $(`[data-especialmente`).hide();
      $(`[data-especial]`).hide();
      $(`[data-ddd]`).hide();
      $(`:input[id*=receber___]`).parent().removeClass("center-content");
      $(`.js-add`).addClass("blocked");

      setTimeout(() => redimensionarTabela(TABLE_ID), TIMER);
      break;

    case CONFIRMAR_DEVOLUCAO:
      $(`${TABLE_ID} tbody td`).addClass("blocked");

      $(`[data-valor-unitario]`).hide();
      $(`[data-especialmente`).hide();
      $(`[data-especial]`).hide();
      $(`[data-ddd]`).hide();
      $(`[data-revisar-devolucao]`).hide();
      $(`.js-add`).addClass("blocked");

      $(`th[data-realizar-recebimento]:lt(2)`).show();
      $(`:input[id*=qtdeRecebida___]`).parent().show();
      $(`:input[id*=avaria___]`).parent().show();

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

$(document).ready(() => {
  moment.locale("pt-br");

  aplicarMascaras();
  gerenciarPaiFilho();
  ocultarCamposPaiFilho();
  // ocultarSecoesForm()
  mostrarAtividadesExecutadas();
  gridHandler();
  displayFieldsJS();
  aplicarBinds();
  aplicaPenalidade();
  mostrarTodasSecoes();
  contaAnexos();
  alertNFdevolucao();
});

function deployNota() {
  $("#addNF").attr("hidden", true);
  tablename = "gridDevolucao";
  const tableHeaders = $(`table[tablename='${tablename}'] thead th`).length;

  const NF = document.getElementById("filtroNF").value;

  var c1 = DatasetFactory.createConstraint(
    "NUMNOTA",
    NF,
    NF,
    ConstraintType.MUST
  );
  var constraints = new Array(c1);

  var dataset = DatasetFactory.getDataset(
    "ds_produtos_nf_saida_winthor",
    null,
    constraints,
    null
  );

  for (var i = 0; i < dataset.values.length; i++) {
    wdkAddChild("gridDevolucao");

    $("#valorUnitario___" + newId).val(dataset.values[i].PVENDA);
    $("#pedidoEspecial___" + newId).val(
      converterProduto(dataset.values[i].DEVOLUCAO)
    );
    $("#foraPrazo___" + newId).val(dataset.values[i].DATA_DEVOL);
    $("#qtde___" + newId).val(dataset.values[i].QT);
    $("#qtdeDevolvida___" + newId).val(dataset.values[i].QT);

    window[`codProduto___` + newId].setValue(dataset.values[i].CODPROD);
    window[`descProduto___` + newId].setValue(dataset.values[i].DESCRICAO);
    window[`numeroNF___` + newId].setValue(dataset.values[i].NUMNOTA);

    validarProdutoEspecial();
    calcularValorTotal(newId);
    calcularValorTotalDevolucao();

    $(`table[tablename='${tablename}'] tbody .js-pai-filho-polyfill`)
      .parent()
      .remove();
  }

  $(`table[tablename='${tablename}'] tbody`).append(`
    <tr>
        <td class="js-pai-filho-polyfill" colspan="${tableHeaders}">NF listada por completo</td>
    </tr>`);
}

function pedidoSubstituto() {
  const PEDIDO_SUBSTITUTO = $("#pedidoSubst").val();
  const COLETA = $("#rdPossuiColeta").val();
  const tipoRemessa = document.getElementById("tipoRemessa");
  const usuarioConferencia = document.getElementById(
    "usuarioConferenciaMaterial"
  );

  if (COLETA === "Não") {
    usuarioConferencia.value = 430;
  } else {
    usuarioConferencia.value = [182, 426];
  }

  if (PEDIDO_SUBSTITUTO === "" && COLETA === "Sim") {
    tipoRemessa.value = "Sim";
  } else {
    tipoRemessa.value = "Não";
  }
}

function aplicaPenalidade() {
  const PENA = $("#acaoPenalidade").val();
  let aplicaPena = "";

  if (PENA == "N/A - Erro de outro setor" || PENA == "Verbal" || PENA == "") {
    aplicaPena = "Não";
  } else if (PENA === "Formal" || PENA === "Desconto em folha") {
    aplicaPena = "Sim";
  }

  $("#aplicaPena").val(aplicaPena);
}

function mostrarTodasSecoes() {
  $(`.panel-primary`).show();
}

function confirmarMaterial() {}

function recolherPainel(painel) {
  $(".panel-collapse").not(painel).removeClass("in");
}

function updateLED(ledID) {
  $(".led").not(`#${ledID}`).removeClass("ativo").addClass("inativo");
  $(`#${ledID}`).removeClass("inativo").addClass("ativo");
}

function ligarLED(ledID) {
  $("#" + ledID)
    .removeClass("inativo")
    .addClass("ativo");
}

function recolherPainel(painel) {
  $(".panel-collapse").not(painel).removeClass("in");
}

function contabilizaFrete() {
  const MOTIVO = $("#motivoDevolucao").val();
  const motivoString = MOTIVO[0];
  console.log(motivoString);

  // if (motivoString == "CLIENTE SOLICITOU ERRADO" || motivoString == "SOBRA DE OBRA" || motivoString == "VENDEDOR VENDEU ERRADO") {
  //     $(`#freteConta`).removeClass("blocked")
  // } else {
  //     $(`#freteConta`).addClass("blocked")
  //     console.log("else")
  // }
}

function contaAnexos() {
  var qtdAnexos = 0;
  $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
    qtdAnexos++;
  });

  $(`#anexos`).val(qtdAnexos);
  console.log(qtdAnexos);

  return qtdAnexos;
}

function dispararAlerta(settings) {
  Swal.fire({
    icon: settings.icone,
    title: settings.titulo,
    text: `${settings.mensagem}`,
    timer: settings.timer,
  });
}

function alertNFdevolucao() {
  var qtdAnexos = document.getElementById("anexos").value;

  if (qtdAnexos <= 0) {
    dispararAlerta({
      icone: "warning",
      titulo: "Atenção!",
      mensagem: `Caso o cliente tenha IE não esqueça de anexar a NF!`,
      timer: 65000,
    });
  }
}

function fiscal() {
  const FISCAL = $(`#ieCliente`).val();
  const EMISSAO = document.getElementById("rdEmiteNFDev");
  if (FISCAL == "ISENTO" || FISCAL == null) {
    EMISSAO.value = "Não";
  } else {
    EMISSAO.value = "Sim";
  }
}

function IEsemNF() {
  const EMISSAO = $(`#rdEmiteNFDev`).val();

  const ANEXO = contaAnexos();
  const FISCAL = document.getElementById("fiscal");

  console.log(EMISSAO);
  console.log(ANEXO);

  if (EMISSAO == "Sim" && ANEXO == "0") {
    FISCAL.value = "Sim";
    console.log("ENTREI NO SIM");
  } else {
    FISCAL.value = "Não";
    console.log("ENTREI NO NÃO");
  }
}

function subprocesso() {
  const SUBPROCESSO = $(`#subprocesso`).val();
  console.log(SUBPROCESSO);

  if (SUBPROCESSO == "Sim") {
    // $(`#freteConta`).removeClass("blocked")
    deployNota();
    deploySub();
    fiscal();
  }
}

function deploySub() {
  const CODCLIENTE = document.getElementById("codCliente").value;

  console.log(CODCLIENTE);

  var c2 = DatasetFactory.createConstraint(
    "CODCLI",
    CODCLIENTE,
    CODCLIENTE,
    ConstraintType.MUST
  );
  var constraints = new Array(c2);

  var dataset = DatasetFactory.getDataset(
    "Ds_Consulta_Clientes_Winthor",
    null,
    constraints,
    null
  );
  console.log(dataset);

  $(`#ieCliente`).val(dataset.values[0].IE);
  $(`#cnpjCliente`).val(formatarCNPJ(dataset.values[0].CGCCPF));
  window[`cliente`].setValue(dataset.values[0].CLIENTE);
  reloadZoomFilterValues(`endColeta`, `CODCLI,${dataset.values[0].CODCLI}`);
  const FILTROA = "CODCLI," + document.getElementById("codCliente").value;
  reloadZoomFilterValues(`filtroNF`, FILTROA);
}
