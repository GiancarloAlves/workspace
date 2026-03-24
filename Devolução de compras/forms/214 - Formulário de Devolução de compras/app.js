// CONSTANTES GLOBAIS
const EVENTO_INICIO = 2;
const SEPARACAO = 4;
const CONFERENCIA = 39;
const EMISSAO = 7;
const EMBARQUE = 10;
const CREDITO = 8;
const STANDBY = 28;

const TABLE__GRID_ID = `#produtos`;

function taskHandler() {
  const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode();
  $(`#matricula`).val(MATRICULA_VENDEDOR);

  const TASK = Number(getWKNumState());
  console.log(TASK);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      $("#additem").attr("hidden", true);
      updateLED("led_abertura", true);
      ligarLED("led_mercadoria");
      recolherOutrosPaineis("#abertura");
      break;

    case SEPARACAO:
      updateLED("led_separacao", true);
      recolherOutrosPaineis("#separacao");
      break;

    case CONFERENCIA:
      updateLED("led_conferencia", true);
      recolherOutrosPaineis("#conferencia");
      break;

    case EMISSAO:
      updateLED("led_emissao", true);
      $(`#dadosmercadoria`).addClass("blocked");
      recolherOutrosPaineis("#emissao");
      break;

    case EMBARQUE:
      updateLED("led_embarque", true);
      $(`#dadosmercadoria`).addClass("blocked");
      recolherOutrosPaineis("#embarque");
      break;

    case CREDITO:
      updateLED("led_financeiro", true);
      $(`#dadosmercadoria`).addClass("blocked");
      recolherOutrosPaineis("#credito");
      break;

    case STANDBY:
      updateLED("led_aguardando", true);
      $(`#dadosmercadoria`).addClass("blocked");
      recolherOutrosPaineis("#standby");
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
    wdkAddChild(`produtos`);
    filtrarZoomPaiFilho();
  });

  mostrarTodasSecoes();
  taskHandler();
  gerenciarPaiFilho();
});

function bloquearCampos(SECTION_ID) {
  $(`.panel-primary:not([id="${SECTION_ID}"]) :input`)
    .parent()
    .addClass("blocked");
}

function filtrarZoomPaiFilho() {
  const CODFORNECEDOR = document.getElementById("codfornec").value;
  console.log(CODFORNECEDOR);

  Array.from($(`:input[id*=codProd___]`)).map((el) => {
    reloadZoomFilterValues(el.id, `A14_COD_FORNEC,${CODFORNECEDOR}`);
    console.log(el.id);
  });

  Array.from($(`:input[id*=numNota___]`)).map((el) => {
    reloadZoomFilterValues(el.id, `A14_COD_FORNEC,${CODFORNECEDOR}`);
  });
}

function recolherOutrosPaineis(painel) {
  $(".panel-collapse").not(painel).removeClass("in"); // Remove a classe 'in' de todos os painéis exceto o fornecido
  $(painel)
    .on("show.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("up").addClass("down");
    })
    .on("hide.bs.collapse", function () {
      $(this).prev().find(".collapse-icon").removeClass("down").addClass("up");
    });
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName;
  const [, row] = selectedItem.inputName.split("___");
  const CODFORNECEDOR = document.getElementById("codfornec").value;

  switch (inputId) {
    case `codfornec`:
      window[`fornecedor`].setValue(selectedItem.FORNECEDOR);
      $(`#comprador`).val(selectedItem.NOME);
      $(`#matcomprador`).val(selectedItem.CODCOMPRADOR);
      $("#additem").removeAttr("hidden");
      break;

    case `fornecedor`:
      window[`codfornec`].setValue(selectedItem.CODFORNEC);
      $(`#comprador`).val(selectedItem.NOME);
      $(`#matcomprador`).val(selectedItem.CODCOMPRADOR);
      $("#additem").removeAttr("hidden");

      break;

    case `numNota___${row}`:
      reloadZoomFilterValues(
        `codProd___${row}`,
        `A03_NOTA,${selectedItem.A03_NOTA}`
      );
      break;

    case `codProd___${row}`:
      window[`numNota___${row}`].setValue(selectedItem.A03_NOTA);
      $(`#historico___${row}`).val(selectedItem.A23_HISTORICO_ENTRADA);
      $(`#descprod___${row}`).val(selectedItem.A17_PRODUTO);
      break;
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
    case `fornecedor`:
    case `codfornec`:
      limparPaiFilho();
      $("#additem").attr("hidden", true);
      window[`fornecedor`].clear();
      window[`codfornec`].clear();
      $(`#comprador`).val("");
      $(`#matcomprador`).val("");
      break;
  }
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

function ligarLED(ledID) {
  // Seleciona o LED específico com base no ID fornecido
  var ledEspecifico = $("#" + ledID);

  // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
  ledEspecifico.removeClass("inativo").addClass("ativo");
}

function calcularPrevisao() {
  var dataEscolhida = document.getElementById("dtChegada").value; // Obtém a data escolhida pelo usuário

  // Converte a string da data para o formato correto (YYYY-MM-DD)
  var dataConvertida = moment(dataEscolhida, "DD/MM/YYYY").format("YYYY-MM-DD");

  var data = new Date(dataConvertida); // Cria um objeto Date a partir da string da data

  var novaData = new Date(data.getTime() + 2 * 24 * 61 * 60 * 1000); // Soma 2 dias à data

  var dia = novaData.getDate();
  var mes = novaData.getMonth() + 1; // O mês é indexado a partir de 0, então adicionamos 1
  var ano = novaData.getFullYear();

  document.getElementById("dia").value = dia;
  document.getElementById("mes").value = mes;
  document.getElementById("ano").value = ano;

  var dataSomada =
    ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano; // Formata a data para o padrão dd/mm/yyyy

  document.getElementById("dtChegadaReal").value = dataSomada; // Define o valor da data somada de 90 dias em um campo do formulário
}

function gerenciarPaiFilho() {
  $(".js-add").each((i, el) => {
    let tableName = $(el).attr("produtos");
    console.log(tableName);
    const tableRows = $(`table[tablename='${tableName}'] tbody tr`).length;

    if (tableRows == 1) {
      const tableHeaders = $(`table[tablename='${tableName}'] thead th`).length;
      $(`table[tablename='${tableName}'] tbody`).append(`
                <tr>
                    <td class="js-pai-filho-polyfill" colspan="${tableHeaders}">Os itens poderão ser adicionados depois que o fornecedor for escolhido.</td>
                </tr>`);
    }
  });
}
