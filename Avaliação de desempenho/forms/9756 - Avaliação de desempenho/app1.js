const EVENTO_INICIO = 4
const AVALIACAO = 13
const CONFIRMACAO_RH = 5
const TRANSFERE_A = 52
const TRANSFERE_B = 55
const EFETIVACAO = 44
const FIM_OK = 16
const FIM_NOK = 9
const TABLE__GRID_ID = `#avaliacao`

function taskHandler(){
    const TASK = Number(getWKNumState()) 
    var caso = document.getElementById('tipoContrato').value;

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            updateLED("led_abertura", true)
            $(`#rh`).addClass("blocked")
            break

        case AVALIACAO: 
        $(`#abertura`).addClass("blocked")
        $(`#rh`).addClass("blocked")     
            updateLED("led_avaliacao", true)
            deployAcessos()
            definirTipo()
            break

        case CONFIRMACAO_RH:
        case EFETIVACAO:
          manipulaGrafico()
          $(`#abertura`).addClass("blocked")
          $(`#avaliacao`).addClass("blocked")   
            updateLED("led_rh", true)
            definirTipo()
 
    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

function recolherPainel(painel) {
    $(painel).removeClass('in'); // Remova a classe 'in' para garantir que o painel esteja recolhido inicialmente
  
    $(painel).on('show.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('up').addClass('down');
    }).on('hide.bs.collapse', function() {
      $(this).prev().find('.collapse-icon').removeClass('down').addClass('up');
    });
  }

$(document).ready(() => {
    moment.locale("pt-br")

  taskHandler()
  aplicarMascaras()
  definirTipo()

})

function DatasetFatores() {
  var dataset = [];

  // Adicionar os registros fixos ao dataset
  dataset.push({ Item: "A", Fatores: "APRESENTAÇÃO PESSOAL"});
  dataset.push({ Item: "B", Fatores: "PRODUTIVIDADE/QUALIDADE DO TRABALHO"});
  dataset.push({ Item: "C", Fatores: "CONHECIMENTO DO TRABALHO" });
  dataset.push({ Item: "D", Fatores: "COOPERAÇÃO" });
  dataset.push({ Item: "E", Fatores: "INICIATIVA" });
  dataset.push({ Item: "F", Fatores: "RELACIONAMENTO INTERPESSOAL" });
  dataset.push({ Item: "G", Fatores: "APRENDIZAGEM" });
  dataset.push({ Item: "H", Fatores: "HIERARQUIA E DISCIPLINA" });
  dataset.push({ Item: "I", Fatores: "ASSIDUIDADE E PONTUALIDADE" });
  dataset.push({ Item: "J", Fatores: "ATENDIMENTO AO CLIENTE" });
 
  return dataset;
}

function deployAcessos() {

  var nomeDataset = "avaliacao";
  var dataset = DatasetFatores();

  for (var i = 0; i < dataset.length; i++) {
      wdkAddChild(nomeDataset);

      $("#item___" + newId).val(dataset[i].Item);
      $("#fator___" + newId).val(dataset[i].Fatores);
  }
}

function updateLED(ledID, isActive) {
    if (isActive) {
      $(`#${ledID}`).removeClass('inativo').addClass('ativo');
      $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    } else {
      $(`#${ledID}`).removeClass('ativo').addClass('inativo');
      $('.led').not(`#${ledID}`).removeClass('inativo').addClass('ativo');
    }
  }

  function ligarLED(ledID) {
    // Seleciona o LED específico com base no ID fornecido
    var ledEspecifico = $('#' + ledID);
  
    // Remove a classe "inativo" e adiciona a classe "ativo" ao LED específico
    ledEspecifico.removeClass('inativo').addClass('ativo');
  
  } 

  function somar40Dias() {  
    var dataEscolhida = document.getElementById("datainicio").value; // Obtém a data escolhida pelo usuário

    // Converte a string da data para o formato correto (YYYY-MM-DD)  
    var dataConvertida = moment(dataEscolhida, "DD/MM/YYYY").format("YYYY-MM-DD");  

    var data = new Date(dataConvertida); // Cria um objeto Date a partir da string da data

    var novaData45 = new Date(data.getTime() + (40 * 24 * 60 * 60 * 1000)); // Soma 45 dias à data

    var dia45 = novaData45.getDate();
    var mes45 = novaData45.getMonth() + 1; // O mês é indexado a partir de 0, então adicionamos 1
    var ano45 = novaData45.getFullYear();

    var dataSomada45 = ("0" + dia45).slice(-2) + "/" + ("0" + mes45).slice(-2) + "/" + ano45; // Formata a data para o padrão dd/mm/yyyy

    document.getElementById("data45").value = dataSomada45; // Define o valor da data somada de 45 dias em um campo do formulário

    document.getElementById("dia").value = dia45
    document.getElementById("mes").value = mes45
    document.getElementById("ano").value = ano45

    var dataSomada90 = ("0" + dia90).slice(-2) + "/" + ("0" + mes90).slice(-2) + "/" + ano90; // Formata a data para o padrão dd/mm/yyyy

    document.getElementById("data90").value = dataSomada90; // Define o valor da data somada de 90 dias em um campo do formulário

  }   

  function somar80Dias() {  
    var dataEscolhida = document.getElementById("datainicio").value; // Obtém a data escolhida pelo usuário

    // Converte a string da data para o formato correto (YYYY-MM-DD)  
    var dataConvertida = moment(dataEscolhida, "DD/MM/YYYY").format("YYYY-MM-DD");  

    var data = new Date(dataConvertida); // Cria um objeto Date a partir da string da data

    var novaData90 = new Date(data.getTime() + (90 * 24 * 60 * 60 * 1000)); // Soma 90 dias à data

    var dia90 = novaData90.getDate();
    var mes90 = novaData90.getMonth() + 1; // O mês é indexado a partir de 0, então adicionamos 1 
    var ano90 = novaData90.getFullYear();

    var dataSomada90 = ("0" + dia90).slice(-2) + "/" + ("0" + mes90).slice(-2) + "/" + ano90; // Formata a data para o padrão dd/mm/yyyy

    document.getElementById("data90").value = dataSomada90; // Define o valor da data somada de 90 dias em um campo do formulário

    document.getElementById("dia").value = dia90
    document.getElementById("mes").value = mes90
    document.getElementById("ano").value = ano90

  }   

  // function somaPontuacao() { funciona com o grid de checkbox
  //   const SELECTOR4 = Array.from($(`:input[id*=f4___]`));
  //   const SELECTOR3 = Array.from($(`:input[id*=f3___]`));
  //   const SELECTOR2 = Array.from($(`:input[id*=f2___]`));
  //   const SELECTOR1 = Array.from($(`:input[id*=f1___]`));
  
  //   let pontos4 = 0;
  //   let pontos3 = 0;
  //   let pontos2 = 0;
  //   let pontos1 = 0;
  
  //   if (SELECTOR4.length) {
  //     pontos4 = SELECTOR4.reduce((total, el) => {
  //       if (el.checked) {
  //         return total + 4;
  //       } else {
  //         return total;
  //       }
  //     }, 0);
  
  //     console.log("Pontos atualizados para f4:", pontos4);
  //   }
  
  //   if (SELECTOR3.length) {
  //     pontos3 = SELECTOR3.reduce((total, el) => {
  //       if (el.checked) {
  //         return total + 3;
  //       } else {
  //         return total;
  //       }
  //     }, 0);
  
  //     console.log("Pontos atualizados para f3:", pontos3);
  //   }
  
  //   if (SELECTOR2.length) {
  //     pontos2 = SELECTOR2.reduce((total, el) => {
  //       if (el.checked) {
  //         return total + 2;
  //       } else {
  //         return total;
  //       }
  //     }, 0);
  
  //     console.log("Pontos atualizados para f2:", pontos2);
  //   }
  
  //   if (SELECTOR1.length) {
  //     pontos1 = SELECTOR1.reduce((total, el) => {
  //       if (el.checked) {
  //         return total + 1;
  //       } else {
  //         return total;
  //       }
  //     }, 0);
  
  //     console.log("Pontos atualizados para f1:", pontos1);
  //   }
  
  //   const pontos = pontos4 + pontos3 + pontos2 + pontos1;
  //   console.log("Pontos total:", pontos);

  //   }
    
function manipulaGrafico(){

  var chart = FLUIGC.chart('#grafico', {
    width: '600',
    height: '200',
   
  });
  
  var dados = obterNotas()

  var data = {
    labels: DatasetFatores().map(obj => obj.Fatores),
    datasets: [
      {
        label: "Avaliação de desempenho - 45 dias",
        fillColor: "rgba(135, 206, 235, 0.5)", // Azul claro
        strokeColor: "rgba(0, 0, 128, 1)", // Azul escuro
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,0,128,1)",
        data: dados
      }
    ]
  };
  
  // Defina as opções do gráfico aqui
    var options = {
      scaleShowLine: true,
      angleShowLineOut: true,
      // scaleShowLabels: true,
      scaleBeginAtZero: true,
      angleLineColor: 'rgba(0, 0, 0, 0.1)',
      angleLineWidth: 1,
      pointLabelFontFamily: "'Arial', sans-serif",
      pointLabelFontStyle: 'normal',
      pointLabelFontSize: 12,
      pointLabelFontColor: 'rgba(0, 0, 0, 0.6)',
      pointDot: true,
      pointDotRadius: 5,
      pointDotStrokeWidth: 2,
      pointHitDetectionRadius: 5,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: 'Legenda: <%=label%>',
    };
    
  
  // chame a função de gráfico de radar
  console.log("Label:", data.datasets[0].label)
  var radarChart = chart.radar(data, options);

  return html2canvas(document.querySelector("#grafico")).then(function (canvas) {
    var imgData = canvas.toDataURL(); // Contém a imagem do gráfico no formato base64
    return imgData;
  });
  
}

function obterNotas() {
  const SELECTOR = Array.from($(`select[id*=nota___]`));
  const notas = [];

  SELECTOR.forEach(el => {
    const nota = el.value;
    if (nota !== "") {
      notas.push(Number(nota));
    }
  });
  console.log("Notas selecionadas:", notas);

  const soma = notas.reduce((total, nota) => total + nota, 0);
  $("#soma").val(soma);

  const insuficiente = "Insuficiente - O empregado não alcança o padrão descrito, nem demonstra interesse ou capacidade para alcançá-lo."
  const fraco = "Fraco - O empregado não alcança o padrão descrito, mas apresenta interesse no desenvolvimento das atribuições."
  const razoavel = "Razoável - O empregado atende parcialmente ao padrão de desempenho descrito."
  const bom = "Bom - O empregado enquadra-se no padrão descrito."
  const excelente = "Excelente - O empregado está acima do padrão descrito, destacando-se significativamente dos demais servidores."

  if (soma >= 10 && soma <= 18){$("#resultado").val(insuficiente); dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Para essa avaliação, não se recomenda a prorrogação do contrato.`})}
  if (soma >= 19 && soma <= 23){$("#resultado").val(fraco);}
  if (soma >= 24 && soma <= 28){$("#resultado").val(razoavel);}
  if (soma >= 29 && soma <= 34){$("#resultado").val(bom);}
  if (soma >= 35 && soma <= 41){$("#resultado").val(excelente);}
  
  return notas
}
 
function validarPaiFilho() {
  var indexes = [];
  var validacao = false;
 

  var indexes = Array.from($(":input[id*=nota___]")).map(el => {
    return el.id.split("___")[1];
  });

  if (indexes.length > 0) {
    for (var i = 0; i < indexes.length; i++) {
      if ($("#nota___" + indexes[i]).val() == "") {
        FLUIGC.message.alert({
          message: "<strong>Fator " + (i + 1) + " está em branco! Preencha todos antes de gerar a avaliação!</strong>",
          title: "Erro",
        });
        validacao = true
        console.log(validacao)
      }
    }
  }

  console.log(validacao)

  if (validacao == false) {
    var graficoElement = document.querySelector("#grafico");
    if (graficoElement) {
      manipulaGrafico();
      dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Para manter o registro do gráfico, faça um print da tela e coloque nos anexos!`});
    } else {
      console.error("Elemento #grafico não foi encontrado no DOM.");
    }
  }
  
  // if (validacao == false){
  //   manipulaGrafico()
  //   dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: `Para manter o registro do gráfico, faça um print da tela e coloque nos anexos!`})

  // }
}

function dispararAlerta(settings) {
  Swal.fire({
      icon: settings.icone,
      title: settings.titulo,
      text: `${settings.mensagem}`,
      timer: 5000
  })
}

function aplicarMascaras() {
  
  $(`#nrSolicFluigAval`).val(getWKNumState() ? getWKNumProcess() : "Gerado após o envio desta etapa...")

  const SOLICITANTE = parent.WCMAPI.getUser()
  const MATRICULA_SOLICITANTE = parent.WCMAPI.getUserCode()

  $(`#solicitante`).val(SOLICITANTE)
  $(`#matSolicitante`).val(MATRICULA_SOLICITANTE)
  
}

// function anexarImagemGrafico(imgData) { não funcionou adequadamente
//   var attachmentData = {
//     fileName: "grafico_desempenho.png", // Nome do arquivo
//     mimeType: "image/png", // Tipo MIME da imagem (neste exemplo, está sendo usado o formato PNG)
//     base64: imgData.split(",")[1], // Removendo o cabeçalho 'data:image/png;base64,' do formato base64
//   };

//   var attachments = [];
//   attachments.push(attachmentData);

//   var cardId = getValue("WKCardId"); // Obtém o ID do formulário atual

//   // Realiza o upload da imagem como anexo do formulário
//   var serviceUrl = "/api/public/ecm/cardDocument/upload/" + cardId;
//   $.ajax({
//     type: "POST",
//     url: serviceUrl,
//     data: JSON.stringify(attachments),
//     contentType: "application/json",
//     success: function (data) {
//       console.log("Imagem do gráfico anexada com sucesso:", data);
//       // Coloque aqui o código para salvar o formulário ou prosseguir para a próxima etapa do processo.
//     },
//     error: function (xhr, textStatus, error) {
//       console.error("Erro ao anexar a imagem do gráfico:", error);
//     },
//   });
// }

function definirTipo(){

  var acao = document.getElementById("acao").value
  var acao_fim = document.getElementById("acaofim").value
  console.log(acao)
  console.log(acao_fim)

  if(acao == "rescindir" || acao_fim == "rescindir") {

    $(`#desligamento`).hide()

  }

  var tipo = document.getElementById("tipoContrato").value
  if(tipo == "aval") {

   $(`#divFluigAcesso`).hide()
   $(`#divAcao`).hide()
   $(`#divAcaofim`).hide()
   $(`#caption40`).hide()
   $(`#caption80`).hide()
   $(`#divData45`).hide()
   $(`#divData80`).hide()
  //  $(`#divAvaliador`).show()
   
  } else{
    $(`#divFluigAcesso`).show()
    $(`#divAcao`).show()
    $(`#divAcaofim`).show()
    $(`#caption40`).show()
    $(`#caption80`).show()
    $(`#divData45`).show()
    $(`#divData80`).show()
    // $(`#divAvaliador`).hide()

  }

  if(tipo=="quarenta"){
    $("#contrato80").val("oitenta");
    $(`#caption80`).hide()

    somar80Dias()
  }

  if(tipo=="oitenta"){
    $(`#caption40`).hide()
  }
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
  const inputId = selectedItem.inputName
  console.log (inputId)

  switch (inputId) {

      case `matricula`:
          window[`nome`].setValue(selectedItem.A03_NOME)
          $(`#datainicio`).val(selectedItem.A05_DT_ADMISSAO)
          $(`#setor`).val(selectedItem.A18_SETOR)
          $(`#cargo`).val(selectedItem.A19_FUNCAO)
          $(`#profissao`).val(selectedItem.A20_PROFISSAO)
          $(`#tipoContrato`).val("aval")
          ligarLED("led_avaliacao")
          definirTipo()
          break

      case `nome`:
          window[`matricula`].setValue(selectedItem.A01_MATRICULA)
          $(`#datainicio`).val(selectedItem.A05_DT_ADMISSAO)
          $(`#setor`).val(selectedItem.A18_SETOR)
          $(`#cargo`).val(selectedItem.A19_FUNCAO)
          $(`#profissao`).val(selectedItem.A20_PROFISSAO)
          $(`#tipoContrato`).val("aval")
          ligarLED("led_avaliacao")
          definirTipo()
          break

      case `avaliador`:
        $(`#matSolicitante`).val(selectedItem.MATRICULA)
          break
      }
}

function removedZoomItem(removedItem) {
  const inputId = removedItem.inputId

  switch (inputId) {

      case `matricula`:
          window[`nome`].clear()
          $(`#guerra`).val("")
          $(`#datainicio`).val("")
          $(`#setor`).val("")
          $(`#cargo`).val("")
          $(`#profissao`).val("")
          $(`#tipoContrato`).val("")
          limparPaiFilho()
          break

      case `nome`:
          window[`matricula`].clear()
          $(`#guerra`).val("")
          $(`#datainicio`).val("")
          $(`#setor`).val("")
          $(`#cargo`).val("")
          $(`#profissao`).val("")
          $(`#tipoContrato`).val("")
          limparPaiFilho()
          break
  }

}

function limparPaiFilho() {
  $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")

}

