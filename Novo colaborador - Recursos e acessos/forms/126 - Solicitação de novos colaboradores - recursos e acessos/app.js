const EVENTO_INICIO = 4
const CADASTRO_RH = 5
const CADASTRO_TI = 6
const FIM = 10


function taskHandler(){
    const TASK = Number(getWKNumState()) 
    console.log(TASK)


    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            deployAcessos()
            $(`#rh`).addClass("blocked")   
     
            break

        case CADASTRO_RH: 
            $(`#dadosacesso`).addClass("blocked")   
            $(`#abertura`).addClass("blocked")
            break

        case CADASTRO_TI: 
            $(`#abertura`).addClass("blocked")
            $(`#rh`).addClass("blocked")
            break

        case FIM:
            $(`#abertura`).addClass("blocked")
            $(`#rh`).addClass("blocked")
            $(`#dadosacesso`).addClass("blocked")


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
    
})

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
    dataset.push({ Item: "PC" });
    dataset.push({ Item: "Headset" });
    dataset.push({ Item: "Impressora" });
 
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


// // Função executada quando selecionamos um item no zoom
// function setSelectedZoomItem(selectedItem) {
//     const inputId = selectedItem.inputName
//     const COD_CLIENTE = $(`#codCliente`).val()

//     switch (inputId) {

//         case `codCliente`:
//             window[`cliente`].setValue(selectedItem.A02_CLIENTE)
//             reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
//             break

//         case `cliente`:
//             window[`codCliente`].setValue(selectedItem.A01_CODCLI)
//             reloadZoomFilterValues(`numNF`, "A01_COD_CLI," + COD_CLIENTE)
//             break

//         case `numNF`:
//             $(`#valornota`).val(selectedItem.A05_VALOR)
//             $(`#cobranca`).val(selectedItem.A07_COBRANCA)
//             $(`#plano`).val(selectedItem.A09_PLANO)
//             $(`#datafat`).val(selectedItem.A12_DT_SEFAZ)
//             $(`#validacao`).val(selectedItem.A18_VALIDACAO)
//             $(`#pedido`).val(selectedItem.A04_PEDIDO)

//         }
// }

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

    document.getElementById("dia").value = dia45
    document.getElementById("mes").value = mes45
    document.getElementById("ano").value = ano45

    var dataSomada45 = ("0" + dia45).slice(-2) + "/" + ("0" + mes45).slice(-2) + "/" + ano45; // Formata a data para o padrão dd/mm/yyyy

    document.getElementById("data45").value = dataSomada45; // Define o valor da data somada de 45 dias em um campo do formulário

    var novaData90 = new Date(data.getTime() + (90 * 24 * 60 * 60 * 1000)); // Soma 90 dias à data

    var dia90 = novaData90.getDate();
    var mes90 = novaData90.getMonth() + 1; // O mês é indexado a partir de 0, então adicionamos 1 
    var ano90 = novaData90.getFullYear();

    var dataSomada90 = ("0" + dia90).slice(-2) + "/" + ("0" + mes90).slice(-2) + "/" + ano90; // Formata a data para o padrão dd/mm/yyyy

    document.getElementById("data90").value = dataSomada90; // Define o valor da data somada de 90 dias em um campo do formulário

  }

  function aplicarMascaras() {
     
    $(`#nrSolicFluig`).val(getWKNumState() ? getWKNumProcess() : "Gerado após o envio desta etapa...")

    const USUARIO = parent.WCMAPI.getUser()
    const MATRICULA = parent.WCMAPI.getUserCode()

    $(`#solicitante`).val(USUARIO)
    $(`#matSolicitante`).val(MATRICULA)
}

function dispararAlerta(settings) {
  Swal.fire({
      icon: settings.icone,
      title: settings.titulo,
      text: `${settings.mensagem}`,
      timer: 5000
  })
}

