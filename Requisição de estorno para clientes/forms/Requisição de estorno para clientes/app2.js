//CONSTANTES GLOBAIS
const EVENTO_INICIO = 4;
const ESTORNO = 5;
const CREDITO = 13;
const FIM = 17;

function taskHandler() {
  const TASK = Number(getWKNumState());
  const VENDEDOR = parent.WCMAPI.getUser();
  $(`#vendedor`).val(VENDEDOR);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      esconderVariaveis();
      $(`#credito`).hide();
      $(`#cp`).hide();
      break;

    case ESTORNO:
      reaplicarHide();
      $(`#abertura`).parent().addClass("blocked");
      $(`#credito`).parent().addClass("blocked");
      break;

    case CREDITO:
      reaplicarHide();
      $(`#abertura`).parent().addClass("blocked");
      $(`#cp`).parent().addClass("blocked");
      break;

    case FIM:
      console.log(FIM);
      reaplicarHide();
      $(`#abertura`).parent().addClass("blocked");
      $(`#cp`).parent().addClass("blocked");
      $(`#credito`).parent().addClass("blocked");
      break;
  }
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName;
  // const FILTRO = 'CODCLI,' + document.getElementById('matricula').value;
  // reloadZoomFilterValues(`comprador`, FILTRO)

  switch (inputId) {
    case `codCliente`:
      window["cliente"].setValue(selectedItem.CLIENTE);
      reloadZoomFilterValues(`numNF`, `CODCLI,${selectedItem.CODCLI}`);
      break;

    case `cliente`:
      window["codCliente"].setValue(selectedItem.CODCLI);
      reloadZoomFilterValues(`numNF`, `CODCLI,${selectedItem.CODCLI}`);
      break;
  }
}

function esconderPaineis() {
  $(`.panel-primary:gt(1)`).hide();
}

function mostrarTodasSecoes() {
  $(`.panel-primary`).show();
}

$(document).ready(() => {
  moment.locale("pt-br");

  taskHandler();
  $(".form-group").removeClass("hide");

  var $modalidade = $("#modalidade");
  var $pix = $("#divpix");
  var $tipopix = $("#divtipopix");
  var $conta = $("#divconta");
  var $agencia = $("#divagencia");
  var $cnpj = $("#divcnpj");
  var $iniciocartao = $(`#diviniciocartao`);
  var $fimcartao = $(`#divfimcartao`);
  var $numNF = $(`#divnumNF`);
  var $codbanco = $(`#divcodbanco`);

  $(document).ready(function () {
    $modalidade.change(function () {
      var selectedOption = $(this).val();
      if (selectedOption === "Pix") {
        $pix.show();
        $tipopix.show();
        $conta.hide();
        $agencia.hide();
        $cnpj.hide();
        $iniciocartao.hide();
        $fimcartao.hide();
        $numNF.hide();
        $codbanco.hide();
      }

      if (selectedOption === "Cartão de crédito") {
        $pix.hide();
        $tipopix.hide();
        $conta.hide();
        $agencia.hide();
        $cnpj.hide();
        $iniciocartao.show();
        $fimcartao.show();
        $numNF.show();
        $codbanco.hide();
      } else if (selectedOption === "TED/DOC") {
        $pix.hide();
        $tipopix.hide();
        $conta.show();
        $agencia.show();
        $cnpj.show();
        $iniciocartao.hide();
        $fimcartao.hide();
        $numNF.hide();
        $codbanco.show();
      }
    });
  });
});

function esconderVariaveis() {
  var $pix = $("#divpix");
  var $tipopix = $("#divtipopix");
  var $conta = $("#divconta");
  var $agencia = $("#divagencia");
  var $cnpj = $("#divcnpj");
  var $iniciocartao = $(`#diviniciocartao`);
  var $fimcartao = $(`#divfimcartao`);
  var $numNF = $(`#divnumNF`);
  var $codbanco = $(`#divcodbanco`);

  $pix.hide();
  $tipopix.hide();
  $conta.hide();
  $agencia.hide();
  $cnpj.hide();
  $iniciocartao.hide();
  $fimcartao.hide();
  $numNF.hide();
  $codbanco.hide();
}

function reaplicarHide() {
  var $pix = $("#divpix");
  var $tipopix = $("#divtipopix");
  var $conta = $("#divconta");
  var $agencia = $("#divagencia");
  var $cnpj = $("#divcnpj");
  var $iniciocartao = $(`#diviniciocartao`);
  var $fimcartao = $(`#divfimcartao`);
  var $numNF = $(`#divnumNF`);
  //   var $codbanco = $(`#divcodbanco`);

  var modalidade = document.getElementById("modalidade").value;

  if (modalidade == "Pix") {
    $pix.show();
    $tipopix.show();
    $conta.hide();
    $agencia.hide();
    $cnpj.hide();
    $iniciocartao.hide();
    $fimcartao.hide();
    $numNF.hide();
    // $codbanco.hide();
  }

  if (modalidade == "TED/DOC") {
    $pix.hide();
    $tipopix.hide();
    $conta.show();
    $agencia.show();
    $cnpj.show();
    $iniciocartao.hide();
    $fimcartao.hide();
    $numNF.hide();
    // $codbanco.hide();
  }

  if (modalidade == "Cartão de crédito") {
    $pix.hide();
    $tipopix.hide();
    $conta.hide();
    $agencia.hide();
    $cnpj.hide();
    $iniciocartao.show();
    $fimcartao.show();
    $numNF.show();
    // $codbanco.show();
  }
}
