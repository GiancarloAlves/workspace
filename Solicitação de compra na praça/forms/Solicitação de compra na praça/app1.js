//SOLICITAÇÃO DE COMPRA NA PRAÇA
// CONSTANTES GLOBAIS
const EVENTO_INICIO = 3;
const COMPRA = 20;
const RECEBIMENTO = 10;
const RETIRA_RASTREIO = 37;
const TABLE__GRID_ID = `#pedido`;
const LIBERACAO_PEDIDO = 73;
const FINALIZA = 75;

async function starter() {
  getSupervisorVendedor();

  const TIPO_SOLICITANTE = await userSupervisorVendas();
  const VENDEDOR = parent.WCMAPI.getUser();
  const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode();

  $(`#tipoSolicitante`).val(TIPO_SOLICITANTE);
  $(`#solicitante`).val(VENDEDOR);
  $(`#matSolicitante`).val(MATRICULA_VENDEDOR);

  const FILTRO =
    "A09_MATRICULA_VEND," + document.getElementById("matSolicitante").value;
}

async function userSupervisorVendas() {
  const DADOS_ADICIONAIS = await getDadosAdicionaisUser(
    parent.WCMAPI.getUserCode()
  );
  const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles;
  const ID_PAPEL = "SUPERVISOR_DE_VENDAS";

  // return PAPEIS_USUARIO
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

async function getDadosAdicionaisUser(user) {
  const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  const DATA = await RESPONSE.json();
  return DATA;
}

function taskHandler() {
  const TASK = Number(getWKNumState());
  const PEDIDO = document.getElementById("numped").value;

  console.log(TASK);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      starter();
      updateLED("led_abertura");
      ligarLED("led_tabela");
      recolherPainel("abertura");

      $(`#tabela`).show();

      $(`#compra`).addClass("blocked");
      $(`#recebimento`).addClass("blocked");
      $(`#rastreio`).addClass("blocked");
      $(`#liberacao`).addClass("blocked");
      $(`#finalizacao`).addClass("blocked");
      $(`[data-follow]`).hide();
      $(`#tabela`).removeClass("blocked");
      break;

    case COMPRA:
      updateLED("led_compra");
      recolherPainel("compra");

      $(`#abertura`).addClass("blocked");
      $(`#tabela`).addClass("blocked");
      $(`#recebimento`).addClass("blocked");
      $(`#rastreio`).addClass("blocked");
      $(`#liberacao`).addClass("blocked");
      $(`#finalizacao`).addClass("blocked");
      $(`#tabela`).removeClass("blocked");
      validarProdutoEspecial();
      break;

    case RECEBIMENTO:
      updateLED("led_recebimento");
      atualizaValores();
      recolherPainel("recebimento");

      $(`#abertura`).addClass("blocked");
      $(`#tabela`).addClass("blocked");
      $(`#compra`).addClass("blocked");
      $(`#rastreio`).addClass("blocked");
      $(`#liberacao`).addClass("blocked");
      $(`#finalizacao`).addClass("blocked");
      break;

    case RETIRA_RASTREIO:
      updateLED("led_rastreio");
      $("#subprocesso").val("nao");
      atualizaValores();
      recolherPainel("rastreio");

      $(`#abertura`).addClass("blocked");
      $(`#tabela`).addClass("blocked");
      $(`#compra`).addClass("blocked");
      $(`#recebimento`).addClass("blocked");
      $(`#liberacao`).addClass("blocked");
      $(`#finalizacao`).addClass("blocked");
      break;

    case LIBERACAO_PEDIDO:
      updateLED("led_liberacao");
      $("#subprocesso").val("sim");
      recolherPainel("liberacao");
      atualizaValores();

      $(`#tabela`).addClass("blocked");
      // $(`#abertura`).addClass("blocked")
      $(`#reavaliacao`).addClass("blocked");
      $(`#aprovacao`).addClass("blocked");
      $(`#faturamento`).addClass("blocked");
      $(`#compras`).addClass("blocked");

      const status_lib = document.getElementById("status2");
      if (status_lib !== "Liberado") {
        dispararAlerta({
          icone: "warning",
          titulo: "Atenção!",
          mensagem: `Pedido está com status diferente de Liberado. Pedido precisa estar liberado para o processo continuar`,
        });
      }
      break;

    case FINALIZA:
      updateLED("led_finalizacao");
      recolherPainel("finalizacao");

      $(`#tabela`).addClass("blocked");
      $(`#abertura`).addClass("blocked");
      $(`#reavaliacao`).addClass("blocked");
      $(`#aprovacao`).addClass("blocked");
      $(`#faturamento`).addClass("blocked");
      $(`#compras`).addClass("blocked");

      // recolherPainel(`#tabela`)
      // recolherPainel(`#abertura`)
      // recolherPainel(`#faturamento`)
      // recolherPainel(`#aprovacao`)
      // recolherPainel(`#cancelamento`)
      // recolherPainel(`#compras`)
      break;
  }
}

function esconderPaineis() {
  $(`.panel-primary:gt(1)`).hide();
}

function mostrarTodasSecoes() {
  $(`.panel-primary`).show();
}

function esconderBotoesPaiFilho() {
  $(`.remove-button`).hide();
  $(`.js-add`).hide();
}

$(document).ready(() => {
  moment.locale("pt-br");

  $(`.js-add`).on("click", (e) => {
    wdkAddChild(`pedido`);
    filtrarZoomPaiFilho();
  });
  mostrarTodasSecoes();
  taskHandler();
  validarProdutoEspecial();
  $(`#tabela`).addClass("in");
  $(`#abertura`).addClass("in");
});

// function recolherPainel(painel) {
//     $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente

//     $(painel).on('show.bs.collapse', function() {
//       $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
//     }).on('hide.bs.collapse', function() {
//       $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
//     });
//   }

function bloquearPaineis(id) {
  $(".panel")
    .filter(function () {
      return $(this).attr("id") !== id;
    })
    .addClass("blocked");
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName;
  const [, row] = selectedItem.inputName.split("___");
  const COD_CLIENTE = $(`#codClienteVal`).val();

  switch (inputId) {
    case `numped`:
      window[`codcli`].setValue(selectedItem.A02_COD_CLI);
      window[`cliente`].setValue(selectedItem.A03_CLIENTE);
      $(`#dataped`).val(selectedItem.A04_DT_PEDIDO);
      $(`#dtwms`).val(selectedItem.A05_DT_INTEGRACAO_WMS);
      $(`#status`).val(selectedItem.A06_STATUS_PEDIDO);
      $(`#status2`).val(selectedItem.A06_STATUS_PEDIDO);
      $(`#statuswms`).val(selectedItem.A07_WMS_INTEGRACAO);
      $(`#qtditensesp`).val(selectedItem.A14_QT_ESPECIAL);
      $(`#validacao`).val(selectedItem.A15_ESPECIAL);
      validarProdutoEspecial();
      validaStatus();
      // deployItem()

      break;

    case `codfornec`:
      window[`fornecedor`].setValue(selectedItem.FORNECEDOR);
      $(`#comprador`).val(selectedItem.NOME);
      $(`#matcomprador`).val(selectedItem.CODCOMPRADOR);
      break;

    case `fornecedor`:
      window[`codfornec`].setValue(selectedItem.CODFORNEC);
      $(`#comprador`).val(selectedItem.NOME);
      $(`#matcomprador`).val(selectedItem.CODCOMPRADOR);
      console.log(selectedItem);
      console.log(selectedItem.NOME);
      console.log(selectedItem.CODCOMPRADOR);
      break;

    case `codClienteVal`:
      window[`clienteVal`].setValue(selectedItem.A02_CLIENTE);
      reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE);
      break;

    case `clienteVal`:
      window[`codClienteVal`].setValue(selectedItem.A01_COD_CLI);
      reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE);
      break;

    case `numNF`:
      window[`codClienteVal`].setValue(selectedItem.A01_COD_CLI);
      window[`clienteVal`].setValue(selectedItem.A02_CLIENTE);
      $(`#pedido2`).val(selectedItem.A04_PEDIDO);
      avaliaNF();
      break;

    case `mainOC`:
      $(`#previsaoChegada`).val(
        converterTimeStamp(selectedItem.A17_PREVISAO_ENTREGA)
      );
      break;

    case `codprod___${row}`:
      $(`#descprod___${row}`).val(selectedItem.A10_PRODUTO);
      $(`#tipo___${row}`).val(selectedItem.A11_TIPO_PRODUTO);
      $(`#qtd___${row}`).val(selectedItem.A12_QT);

      const PRODUTO_ESPECIAL = $(`#tipo___${row}`).val() == "PRODUTO ESPECIAL";

      if (PRODUTO_ESPECIAL) {
        $(`#tipo___${row}`).addClass("produto-especial");
      }
  }
}

function avaliaNF() {
  const pedido = document.getElementById("numped").value;
  const pedido2 = document.getElementById("pedido2").value;
  console.log(pedido);
  console.log(pedido2);

  if (pedido != pedido2) {
    dispararAlerta({
      icone: "warning",
      titulo: "Atenção!",
      mensagem: `O pedido desta NF não é o mesmo que iniciou o processo`,
    });
  }
}

function converterTimeStamp(timeStamp) {
  return new moment(timeStamp).format("L");
}

function limparPaiFilho() {
  $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click");
}
// Função executada quando clicamos no x do zoom (prorrogação de títulos)
function removedZoomItem(removedItem) {
  const inputId = removedItem.inputId;

  switch (inputId) {
    case `numped`:
      limparPaiFilho();
      window[`cliente`].clear();
      window[`codcli`].clear();
      break;

    case `codcli`:
      limparPaiFilho();
      window[`numped`].clear();
      window[`cliente`].clear();
      break;

    case `cliente`:
      limparPaiFilho();
      window[`numped`].clear();
      window[`codcli`].clear();
      break;

    case `numNF`:
      window[`codClienteVal`].clear();
      window[`clienteVal`].clear();
      $(`#pedido2`).clear();
      avaliaNF();
      break;
  }
}

function deployItem() {
  //FUNÇÃO PARA FAZER O DEPLOY DO PEDIDO INTEIRO

  const ITEM = document.getElementById("numped").value;

  var c2 = DatasetFactory.createConstraint(
    "A01_PEDIDO",
    ITEM,
    ITEM,
    ConstraintType.MUST
  );
  var constraints = new Array(c2);

  var dataset = DatasetFactory.getDataset(
    "ds_compra_praca_itens_winthor",
    null,
    constraints,
    null
  );

  for (var i = 0; i < dataset.values.length; i++) {
    wdkAddChild("pedido");
    $("#codprod___" + newId).val(dataset.values[i].A09_COD_PROD);
    $("#descprod___" + newId).val(dataset.values[i].A10_PRODUTO);
    $("#tipo___" + newId).val(dataset.values[i].A11_TIPO_PRODUTO);
    $("#qtd___" + newId).val(dataset.values[i].A12_QT);

    const PRODUTO_ESPECIAL = $("#tipo___" + newId).val() == "PRODUTO ESPECIAL";

    if (PRODUTO_ESPECIAL) {
      $("#tipo___" + newId).addClass("produto-especial");
    }

    const ANALISE_COMPRAS =
      $("#tipo___" + newId).val() == "VERIFICAR SETOR DE COMPRAS";

    if (ANALISE_COMPRAS) {
      $("#tipo___" + newId).addClass("analise-compras");
    }
  }
}

function validarProdutoEspecial() {
  //só funciona quando a tarefa anda

  const PRODUTO_ESPECIAL =
    $("#validacao").val() == "PEDIDO COM PRODUTO ESPECIAL";

  if (PRODUTO_ESPECIAL) {
    $("#validacao").addClass("produto-especial");
  } else {
    // $('#validacao').addClass("produto-normal");
  }
}

function atualizaValores() {
  const ITEM = document.getElementById("numped").value;

  var c2 = DatasetFactory.createConstraint(
    "A01_PEDIDO",
    ITEM,
    ITEM,
    ConstraintType.MUST
  );
  var constraints = new Array(c2);

  var dataset = DatasetFactory.getDataset(
    "ds_compra_praca_form_winthor",
    null,
    constraints,
    null
  );
  console.log(dataset);

  $("#dtwms").val(dataset.values[0].A05_DT_INTEGRACAO_WMS);
  $("#status").val(dataset.values[0].A06_STATUS_PEDIDO);
  $("#statuswms").val(dataset.values[0].A07_WMS_INTEGRACAO);
}

function validaStatus() {
  const STATUS = document.getElementById("status").value;
  const STATUSWMS = document.getElementById("statuswms").value;

  if (STATUS !== "Pendente") {
    dispararAlerta({
      icone: "warning",
      titulo: "Atenção!",
      mensagem: `Pedido possui status diferente de pendente. Só é possível iniciar compra de itens na praça quando o pedido vinculado estiver pendente.`,
    });
  }
}

function dispararAlerta(settings) {
  Swal.fire({
    icon: settings.icone,
    title: settings.titulo,
    text: `${settings.mensagem}`,
    timer: 45000,
  });
}

function updateLED(ledID) {
  $(".led").not(`#${ledID}`).removeClass("ativo").addClass("inativo");
  $(`#${ledID}`).removeClass("inativo").addClass("ativo");
}

function ligarLED(ledID) {
  // Seleciona o LED específico com base no ID fornecido
  var ledEspecifico = $("#" + ledID);

  // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
  ledEspecifico.removeClass("inativo").addClass("ativo");
}

function recolherPainel(painel) {
  console.log(painel);
  $(".panel-collapse").not(`#${painel}`).removeClass("in");
}

function validarMarcacao() {
  const SELECTOR = `:input[id*=praca___]`;

  const STATUS = $(`${SELECTOR}:checked`).length;
  const EL = $(`#rdAprovaSup`).parent();
  STATUS ? EL.addClass("blocked") : EL.removeClass("blocked");

  $(`#itemReprovado`).val(STATUS ? "Sim" : "Não");
}

function validarCheckbox() {
  var indexes = [];
  var validacao = false;

  var indexes = Array.from($(":input[id*=praca___]")).some((el) => {
    return el.checked;
  });

  if (!indexes) {
    FLUIGC.message.alert({
      message:
        "<strong>Nenhum produto foi marcado. Você precisa indicar quais produtos serão comprados na praça!</strong>",
      title: "Erro",
    });
    validacao = true;
  }
}

function filtrarZoomPaiFilho() {
  console.log("ENTREI NO FILTRO NOVO");
  const NUM_PED = $(`#numped`).val();

  console.log(NUM_PED);

  Array.from($(`:input[id*=codprod___]`)).map((el) => {
    reloadZoomFilterValues(el.id, `A01_PEDIDO,${NUM_PED}`);
  });
}

function praca() {
  const PRACA = $("#rdPossuiColeta").val();
  const COMPRADOR = document.getElementById("comprador");
  const MATCOMP = document.getElementById("matcomprador");
  const COMPRADOR_ORIGINAL = $(`#compras1`).val();
  const MATCOMP_ORIGINAL = $(`#matcompras1`).val();

  if (PRACA == "Sim") {
    COMPRADOR.value = "Maicon Conceição (praça)";
    MATCOMP.value = "209";
  } else {
    COMPRADOR.value = COMPRADOR_ORIGINAL;
    MATCOMP.value = MATCOMP_ORIGINAL;
  }
}
