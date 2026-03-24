const EVENTO_INICIO = 4;
const AGENDAMENTO = 5;
const ACESSOS_TI = 6;
const FIM = 12;

function taskHandler() {
  const TASK = Number(getWKNumState());

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      deployAcessos();
      esconderVariaveis();
      $(`#rh`).hide();
      break;

    case AGENDAMENTO:
      $(`#abertura`).parent().addClass("blocked");
      reaplicarHide();
      $(`#rh`).show();
      validarInativo();
      break;

    case ACESSOS_TI:
      $(`#abertura`).parent().addClass("blocked");

    case FIM:
      reaplicarHide();
      dispararAlerta({
        icone: "warning",
        titulo: "Atenção!",
        mensagem: `Esta etapa é somente consultiva, para mostrar ao solicitante o fechamento da solicitação. Basta conferir os dados e clicar em Enviar para encerrar o processo.`,
      });
      $(`#abertura`).parent().addClass("blocked");
      $(`#ti`).parent().addClass("blocked");
      $(`#rh`).parent().addClass("blocked");
  }
}

function esconderPaineis() {
  $(`.panel-primary:gt(1)`).hide();
}

function mostrarTodasSecoes() {
  $(`.panel-primary`).show();
}

function recolherPainel(painel) {
  $(painel).removeClass("in"); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente

  $(painel)
    .on("show.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("up").addClass("down");
    })
    .on("hide.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("down").addClass("up");
    });
}

$(document).ready(() => {
  $(document).on("click", ".js-add", (e) => {
    wdkAddChild(`acessos`);
  });

  moment.locale("pt-br");
  taskHandler();
});

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName;
  console.log(inputId);

  switch (inputId) {
    case `matricula`:
      window[`nome`].setValue(selectedItem.A03_NOME);
      $(`#guerra`).val(selectedItem.A04_NOME_GUERRA);
      $(`#admissao`).val(selectedItem.A05_DT_ADMISSAO);
      $(`#sit528`).val(selectedItem.A06_SITUACAO_528);
      $(`#setor`).val(selectedItem.A18_SETOR);
      $(`#cargo`).val(selectedItem.A19_FUNCAO);
      $(`#profissao`).val(selectedItem.A20_PROFISSAO);
      $(`#motivo528`).val(selectedItem.A21_MOTIVO_528);
      break;

    case `nome`:
      window[`matricula`].setValue(selectedItem.A01_MATRICULA);
      $(`#guerra`).val(selectedItem.A04_NOME_GUERRA);
      $(`#admissao`).val(selectedItem.A05_DT_ADMISSAO);
      $(`#sit528`).val(selectedItem.A06_SITUACAO_528);
      $(`#setor`).val(selectedItem.A18_SETOR);
      $(`#cargo`).val(selectedItem.A19_FUNCAO);
      $(`#profissao`).val(selectedItem.A20_PROFISSAO);
      $(`#motivo528`).val(selectedItem.A21_MOTIVO_528);
      break;
  }
}

function removedZoomItem(removedItem) {
  const inputId = removedItem.inputId;

  switch (inputId) {
    case `matricula`:
      window[`nome`].clear();
      $(`#guerra`).val("");
      $(`#admissao`).val("");
      $(`#sit528`).val("");
      $(`#setor`).val("");
      $(`#cargo`).val("");
      $(`#profissao`).val("");
      $(`#motivo528`).val("");
      break;

    case `nome`:
      window[`matricula`].clear();
      $(`#guerra`).val("");
      $(`#admissao`).val("");
      $(`#sit528`).val("");
      $(`#setor`).val("");
      $(`#cargo`).val("");
      $(`#profissao`).val("");
      $(`#motivo528`).val("");
      break;
  }
}

function DatasetAcessos() {
  var dataset = [];

  // Adicionar os registros fixos ao dataset
  dataset.push({ Item: "Winthor" });
  dataset.push({ Item: "BDTI" });
  dataset.push({ Item: "E-mail" });
  dataset.push({ Item: "Fluig" });
  dataset.push({ Item: "WMS" });
  dataset.push({ Item: "Fusion" });
  dataset.push({ Item: "Arquivos" });
  dataset.push({ Item: "Ramal/Siga-me" });
  dataset.push({ Item: "Cart. de clientes" });
  dataset.push({ Item: "Recolher PC" });

  return dataset;
}

function deployAcessos() {
  var nomeDataset = "acessos";
  var dataset = DatasetAcessos();

  for (var i = 0; i < dataset.length; i++) {
    wdkAddChild(nomeDataset);

    $("#tipo___" + newId).val(dataset[i].Item);
  }
}

function validarInativo() {
  const MATRICULA = document.getElementById("matricula").value;
  console.log(MATRICULA);

  var c1 = DatasetFactory.createConstraint(
    "A01_MATRICULA",
    MATRICULA,
    MATRICULA,
    ConstraintType.MUST
  );
  var constraints = new Array(c1);

  var datasetMatricula = DatasetFactory.getDataset(
    "ds_desligamento_colaborador_winthor",
    null,
    constraints,
    null
  );
  var SITUACAO_528 = datasetMatricula.values[0]["A06_SITUACAO_528"];
  var MOTIVO_528 = datasetMatricula.values[0]["A21_MOTIVO_528"];
  var SITUACAO_517 = datasetMatricula.values[0]["A22_BLOQUEIO_RCA_517"];
  var MOTIVO_517 = datasetMatricula.values[0]["A25_MOTIVO_RCA_517"];

  $("#sit528").val(SITUACAO_528);
  $(`#motivo528`).val(MOTIVO_528);
  $(`#sit517`).val(SITUACAO_517);
  $(`#motivo517`).val(MOTIVO_517);
}

function esconderVariaveis() {
  var $novosal = $("#divnovosal");
  var $novocargo = $("#divnovocargo");

  $novosal.hide();
  $novocargo.hide();
  $(`#dadosacesso`).hide();
}

function reaplicarHide() {
  var $novosal = $("#divnovosal");
  var $novocargo = $("#divnovocargo");

  var aumentosal = document.getElementById("aumentosal").value;

  if (aumentosal == "Sim") {
    $novosal.show();
  } else {
    $novosal.hide();
  }

  var trocacargo = document.getElementById("trocacargo").value;

  if (trocacargo == "Sim") {
    $novocargo.show();
  } else {
    $novocargo.hide();
  }

  var trocaacesso = document.getElementById("trocaacessos").value;

  if (trocaacesso == "Sim") {
    expandirPainel(`#ti`);
  } else {
    recolherPainel(`#ti`);
  }
}

function expandirPainel(painel) {
  $(painel).addClass("in"); // Adicione a classe 'in' para garantir que o painel esteja expandido inicialmente

  $(painel)
    .on("show.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("down").addClass("up");
    })
    .on("hide.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("up").addClass("down");
    });
}

function dispararAlerta(settings) {
  Swal.fire({
    icon: settings.icone,
    title: settings.titulo,
    text: `${settings.mensagem}`,
    timer: 10000,
  });
}
