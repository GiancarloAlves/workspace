// CONSTANTES GLOBAIS
const EVENTO_INICIO = 7;
const TRATATIVA_PRIMA = 9;
const APROVACAO_INICIADOR = 54;
const APROVACAO_OCORRENCIAS = 45;
const RESOLUCAO_PROBLEMAS = 62;
const TRATATIVA_SEGUNDA = 41;
const RESPOSTA_GERENCIA = 22;
const REFATURAMENTO = 98;
const PEDIDO_SUBSTITUTO = 101;
const DEVOLUCAO_CASE = 79;
const ABRIR_DEVOLUCAO = 81;
const CONSOLIDAR_RESPONSAVEL_DEV = 91;
const INICIADOR_APROVA = 59;
const TABLE__GRID_ID = `#pedido`;

function taskHandler() {
  const TASK = Number(getWKNumState());
  console.log(TASK);

  switch (TASK) {
    case 0:
    case EVENTO_INICIO:
      updateLED("led_abertura");
      ligarLED("led_reclamacao");
      tratarPainel("abertura");
      $(`#reclamacao`).addClass("in");
      $(`#reclamacao`).removeClass("blocked");
      starter();

      break;

    case TRATATIVA_PRIMA:
      $(`#divSegUser`).addClass("blocked");

      updateLED("led_primum");
      tratarPainel("primum");

      $(`#RdOutroSetor`).on("change", (e) => {
        const EL = $(`#divSegUser`);
        e.target.value == "Sim"
          ? EL.removeClass("blocked")
          : EL.addClass("blocked");
      });

      const DEVOLUCAO = document.getElementById("devolucao").value;
      const responsavel_problema = document.getElementById(
        "responsavelProblema"
      ).value;
      const SUBPROCESSO = document.getElementById("subprocesso").value;

      if (responsavel_problema === "Transportadora") {
        $(`#devolucao`).val("Não");
      }

      if (DEVOLUCAO == "Não" || SUBPROCESSO == "Não") {
        $(`#ObsIniciador`).val("");
        $(`#SolucaoReclamac`).val("");
        $(`#devolucao`).val("Não");
      }

      break;

    case CONSOLIDAR_RESPONSAVEL_DEV:
      tratarPainel("painel");
      const SETOR_PROBLEMA = document.getElementById("setorTranstorno").value;
      const devolucao = document.getElementById("devolucao").value;
      const usuarioDevolucao = document.getElementById("usuarioDevolucao");
      const solicitante = document.getElementById("matSolicitante").value;

      if (devolucao === "Sim" && SETOR_PROBLEMA === "Logística") {
        usuarioDevolucao.value = 354;
        console.log("ocorrencias");
      } else {
        usuarioDevolucao.value = solicitante;
        console.log("solicitante");
      }

      break;

    case REFATURAMENTO:
      tratarPainel("refaturamentoPainel");
      updateLED("led_refaturamento");

      break;

    case DEVOLUCAO_CASE:
      tratarPainel("devolucaoPainel");
      updateLED("led_devolucao");

      if (responsavel_problema === "Transportadora") {
        const devolucao = document.getElementById("devolucao");
        devolucao.value = "Não";
        devolucao.disabled = true;
      }

      break;

    case PEDIDO_SUBSTITUTO:
      updateLED("led_pedido");
      tratarPainel("pedidoPainel");

      break;

    case TRATATIVA_SEGUNDA:
    case APROVACAO_OCORRENCIAS:
      updateLED("led_secundum");
      tratarPainel("secundum");

      break;

    case APROVACAO_INICIADOR:
      dispararAlerta({
        icone: "warning",
        titulo: "Atenção!",
        mensagem: `Para prosseguir nesta etapa do processo, você precisa ir até a seção "Aprovação do Iniciador", onde você deve dizer se o problema do cliente foi resolvido. Caso tenha sido resolvido, marque a opção "SIM". Caso não tenha sido resolvido, marque a opção "NÃO", que o processo retornará para o setor de ocorrências para ser resolvido.`,
      });

      updateLED("led_aprovacao");
      tratarPainel("aprovacao");
      break;

    case ABRIR_DEVOLUCAO:
    case INICIADOR_APROVA:
      $(`#DescrOcorrencia`).val("");
      $(`#SugestaoResoluc`).val("");
      break;

    case RESOLUCAO_PROBLEMAS:
      updateLED("led_resolucao");
      tratarPainel("resolucao");
      break;

    case RESPOSTA_GERENCIA:
      updateLED("led_supervisor");
      tratarPainel("fim");
      break;
  }
}

async function starter() {
  // Busca o supervisor do vendedor
  getSupervisorVendedor();

  const TIPO_SOLICITANTE = await userSupervisorVendas();
  const VENDEDOR = parent.WCMAPI.getUser();
  const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode();

  $(`#tipoSolicitante`).val(TIPO_SOLICITANTE);
  $(`#solicitante`).val(VENDEDOR);
  $(`#matSolicitante`).val(MATRICULA_VENDEDOR);

  // const FILTRO = 'A14_MATRICULA_VEN,' + document.getElementById('matSolicitante').value
  // reloadZoomFilterValues(`codCliente`, FILTRO)

  const FILTRO =
    "A09_MATRICULA_VEND," + document.getElementById("matSolicitante").value;
  // reloadZoomFilterValues(`numped`, FILTRO)
  // reloadZoomFilterValues(`codcli`, FILTRO)
  // reloadZoomFilterValues(`cliente`, FILTRO)
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
  moment.locale("pt-br");

  $(`.js-add`).on("click", (e) => {
    wdkAddChild(`pedido`);
    filtrarZoomPaiFilho();
  });
  taskHandler();
});

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName;
  const [, row] = selectedItem.inputId.split("___");

  const COD_CLIENTE = $(`#codCliente`).val();

  switch (inputId) {
    case `codCliente`:
      window[`cliente`].setValue(selectedItem.A05_CLIENTE);
      reloadZoomFilterValues(`numNF`, "A04_COD_CLI," + COD_CLIENTE);
      break;

    case `cliente`:
      window[`codCliente`].setValue(selectedItem.A04_COD_CLI);
      reloadZoomFilterValues(`numNF`, "A04_COD_CLI," + COD_CLIENTE);
      break;

    case `numNF`:
      window[`codCliente`].setValue(selectedItem.A04_COD_CLI);
      window[`cliente`].setValue(selectedItem.A05_CLIENTE);
      $(`#vendedor`).val(selectedItem.A08_VENDEDOR);
      $(`#matVendedor`).val(selectedItem.A07_MATRICULA_VEN);
      $(`#datafat`).val(selectedItem.A13_DT_FAT_SEFAZ);
      $(`#plano`).val(selectedItem.A18_PLANO);
      $(`#endereco`).val(selectedItem.A24_ENDERECO);
      $(`#validacao`).val(selectedItem.A03_PROD_ESPECIAL);
      $(`#transportadora`).val(selectedItem.A21_TRANSPORTADORA);
      $(`#qtditens`).val(selectedItem.A27_NUM_ITENS);
      $(`#qtditensesp`).val(selectedItem.A28_NUM_ITENS_ESP);
      $(`#qtdvolume`).val(selectedItem.A29_NUM_VOLUMES);
      $(`#cobranca`).val(selectedItem.A16_COBRANCA);
      $(`#codtransp`).val(selectedItem.A20_COD_FORNEC_FRETE);
      $(`#enderecoCompleto`).val(selectedItem.A24_ENDERECO);
      // const NF = document.getElementById('numNF').value;
      // filtrarZoomPaiFilho()
      validarProdutoEspecial();
      deployItem();
      break;

    case `codprod___${row}`:
      $(`#descprod___${row}`).val(selectedItem.A04_PRODUTO);
      $(`#tipo___${row}`).val(selectedItem.A07_TIPO_PROD);
      $(`#qtd___${row}`).val(selectedItem.A05_QT_PROD);
      break;

    case `motivoDevolucao`:
      console.log("TESTE MOTIVO");
      const MOTIVO = $(`#motivoDevolucao`).val();
      console.log(MOTIVO);
      if (
        MOTIVO == "MATERIAL AVARIADO" ||
        MOTIVO == "INVERSAO DE MERC.NA EXPEDICAO"
      ) {
        dispararAlerta({
          icone: "warning",
          titulo: "Atenção!",
          mensagem: `Para esse motivo, é recomendado que seja feito o anexo de pelo menos 1 foto do problema!`,
        });
      }
      break;
  }
}

function validarProdutoEspecial() {
  //só funciona quando a tarefa anda

  const PRODUTO_ESPECIAL =
    $("#validacao").val() === "***NF COM PRODUTO ESPECIAL***";

  if (PRODUTO_ESPECIAL) {
    $("#validacao").addClass("produto-especial");
  }
}

function deployItem() {
  // $('#additem').attr('hidden', true);
  // $('#deploylista').attr('hidden', true);

  const NF = document.getElementById("numNF").value;

  var c2 = DatasetFactory.createConstraint(
    "A01_NOTA",
    NF,
    NF,
    ConstraintType.MUST
  );
  var constraints = new Array(c2);

  var dataset = DatasetFactory.getDataset(
    "ds_reclamacao_clientes_nf_itens_winthor",
    null,
    constraints,
    null
  );

  for (var i = 0; i < dataset.values.length; i++) {
    wdkAddChild("pedido");
    window[`codprod___` + newId].setValue(dataset.values[i].A03_COD_PROD);
    $("#descprod___" + newId).val(dataset.values[i].A04_PRODUTO);
    $("#tipo___" + newId).val(dataset.values[i].A07_TIPO_PROD);
    $("#qtd___" + newId).val(dataset.values[i].A05_QT_PROD);
  }
}

function filtrarZoomPaiFilho() {
  // const NF = $(`#numNF`).val()

  const NF = document.getElementById("numNF").value;
  console.log(NF);

  Array.from($(`:input[id*=codprod___]`)).map((el) => {
    reloadZoomFilterValues(el.id, `A01_NOTA,${NF}`);
  });
}

function dispararAlerta(settings) {
  Swal.fire({
    icon: settings.icone,
    title: settings.titulo,
    text: `${settings.mensagem}`,
    timer: 15000,
  });
}

function tratarPainel(painel) {
  $(".panel-collapse").not(`#${painel}`).removeClass("in");
  $(".panel-collapse").not(`#${painel}`).addClass("blocked");
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

function limparPaiFilho() {
  $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click");
  $(`${TABLE__GRID_ID2} .remove-button:gt(0)`).trigger("click");
}
