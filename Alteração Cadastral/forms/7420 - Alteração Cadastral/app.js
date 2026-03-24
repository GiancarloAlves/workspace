// CONSTANTES GLOBAIS
const EVENTO_INICIO = 3
const ALTERACAO = 4


async function starter() {
    
    const MATRICULA_USUARIO = parent.WCMAPI.getUserCode()
    const USUARIO = parent.WCMAPI.getUser()

    $(`#matricula`).val(MATRICULA_USUARIO)
    $(`#usuario`).val(USUARIO)
    const FILTRO = 'MATRICULA,' + document.getElementById('matricula').value;

        // Busca o supervisor do vendedor
        getSupervisorVendedor()

        const TIPO_SOLICITANTE = await userSupervisorVendas()
    
        $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)

    try {
        const tipoSolicitante = await obterTipoSolicitante();
  
        if (tipoSolicitante === "Usuário") {

            // COLOCAR ALGUMA CONDIÇÃO
        }
      } catch (error) {
        console.log("Erro ao obter o tipoSolicitante:", error);
      }

}

    async function obterTipoSolicitante() {
        // Lógica para obter o valor do tipoSolicitante
        return await Promise.all([userSupervisorVendas(), getSupervisorVendedor()])
          .then(() => {
            const TIPO = document.getElementById('tipoSolicitante').value;
            return TIPO;
          });
      }
      
      
function taskHandler(){

    const TASK = Number(getWKNumState()) 

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
        starter()
        $(`#cadastro`).addClass("blocked")
        break

        case ALTERACAO:
        removeEmptyRowsCliente()
        removeEmptyRowsComercial()
        removeEmptyRowsFinanceiro()
        $(`#dadoscliente`).addClass("blocked")
        $(`#dadoscadastro`).addClass("blocked")
        $(`#dadoscomerciais`).addClass("blocked")      
        $(`#dadosfinanceiros`).addClass("blocked")
        break


    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}


$(document).ready(() => {
    moment.locale("pt-br")

    taskHandler()
})

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}


// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    switch (inputId) {
        case `cod_cliente`:
            window["cliente"].setValue(selectedItem.CLIENTE)
            $(`#cnpjCliente`).val(formatarCNPJ(selectedItem.CGCCPF))
            deployItemCliente()
            deployItemComercial()
            deployItemFinanceiro()
            dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: "Escolha os campos que deseja alterar e preencha o dado novo na coluna ALTERAR PARA"});
            break
            
        case `cliente`:
            window["cod_cliente"].setValue(selectedItem.CODCLI)   
            $(`#cnpjCliente`).val(formatarCNPJ(selectedItem.CGCCPF))
            deployItemCliente()
            deployItemComercial()
            deployItemFinanceiro()
            dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: "Escolha os campos que deseja alterar e preencha o dado novo na coluna ALTERAR PARA"});   
            break


    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

function limparPaiFilho() {
    $(`${"#acessos_financeiros"} .remove-button:gt(0)`).trigger("click")
    $(`${"#acessos_cliente"} .remove-button:gt(0)`).trigger("click")      
    $(`${"#acessos_comerciais"} .remove-button:gt(0)`).trigger("click")  

}

// Função executada quando clicamos no x do zoom
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputName

    switch (inputId) {
        case `cod_cliente`:
            window["cliente"].clear()
            limparPaiFilho()
            break

        case `cliente`:
            window["cod_cliente"].clear()
            limparPaiFilho()
            break
    }
}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"
    const ID_PAPELA = "GERENTE_DE_COMPRAS"
    const ID_PAPELB = "GERENTE_DE_VENDAS"
    const ID_PAPELC = "GERENTE_DE_LOGISTICA"
    const ID_PAPELD = "admin"

    return PAPEIS_USUARIO.some(papel => papel === ID_PAPEL || papel === ID_PAPELA || papel === ID_PAPELB || papel === ID_PAPELC || papel == ID_PAPELD) ? "Supervisor" : "Usuário";
}

async function getSupervisorVendedor() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const SUPERVISOR = DADOS_ADICIONAIS.content.extData.Supervisor
    const MATRICULA_SUPERVISOR = DADOS_ADICIONAIS.content.extData["Matricula_supervisor"]

    $(`#supervisorSolicitante`).val(SUPERVISOR)
    $(`#matSupervisor`).val(MATRICULA_SUPERVISOR)
}

async function getDadosAdicionaisUser(user) {
    const RESPONSE = await fetch(`/api/public/2.0/users/getUser/${user}`, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function dispararAlerta(settings) {
    Swal.fire({
        icon: settings.icone,
        title: settings.titulo,
        text: `${settings.mensagem}`,
        timer: 5000
    })
}

function headerDataset(){

    var datasetId = "ds_cadastro_clientes_winthor"; // Substitua pelo ID do dataset desejado

    var dataset = DatasetFactory.getDataset(datasetId, null, null, null);
    var datasetColumns = dataset.columns;
    
    // Loop pelas colunas do dataset
    for (var i = 0; i < datasetColumns.length; i++) {
      var columnName = datasetColumns[i].name;
      
    }
    
    }

    function DatasetAcessosCliente() {
        var dataset = [];
      
        // Dados do cliente
        dataset.push({ Descricao: "Código", FieldName: "A01_COD_CLI" });
        dataset.push({ Descricao: "Nome", FieldName: "A02_CLIENTE" });
        dataset.push({ Descricao: "Nome fantasia", FieldName: "A03_FANTASIA" });
        dataset.push({ Descricao: "Tipo", FieldName: "A04_TIPO" });
        dataset.push({ Descricao: "CPF/CNPJ", FieldName: "A05_CPF_CGC" });
        dataset.push({ Descricao: "IE", FieldName: "A06_IE" });
        dataset.push({ Descricao: "Cód. atividade", FieldName: "A07_COD_ATIV" });
        dataset.push({ Descricao: "Ramo atividade", FieldName: "A08_RAMO_ATIVI" });
        dataset.push({ Descricao: "Rep. Comercial", FieldName: "A09_RCA" });
        dataset.push({ Descricao: "Cód. praça", FieldName: "A10_COD_PRACA" });
        dataset.push({ Descricao: "Nome praça", FieldName: "A11_PRACA" });
        dataset.push({ Descricao: "E-mail NF-e", FieldName: "A21_MAIL_COMERCIAL" }); // FieldName está com o nome invertido fazer troca no dataset depois
           
      
        return dataset;
      }


      function DatasetAcessosComercial() { 
        var dataset = [];
           
        // Dados comerciais
        dataset.push({ Descricao: "End. comercial", FieldName: "A13_END_COMERCIAL" });
        dataset.push({ Descricao: "Núm. end. comercial", FieldName: "A14_NUM_COMERCIAL" });
        dataset.push({ Descricao: "Bairro end. comercial", FieldName: "A15_BAIRRO_COMERCIAL" });
        dataset.push({ Descricao: "Município end. comercial", FieldName: "A16_MUNICIPIO_COMERCIAL" });
        dataset.push({ Descricao: "Compl. end. comercial", FieldName: "A17_COMPLE_COMERCIAL" });
        dataset.push({ Descricao: "Estado end. comercial", FieldName: "A18_UF_COMERCIAL" });
        dataset.push({ Descricao: "CEP end. comercial", FieldName: "A19_CEP_COMERCIAL" });
        dataset.push({ Descricao: "Tel. comercial", FieldName: "A20_FONE_COMERCIAL" });
        dataset.push({ Descricao: "E-mail comercial", FieldName: "A12_MAIL_NFE" }); // FieldName está com o nome invertido fazer troca no dataset depois
      
      
        return dataset;
      }

      function DatasetAcessosFinanceiro() {
        var dataset = [];           
     
        // Dados financeiros
        dataset.push({ Descricao: "End. cobrança", FieldName: "A22_END_COBRANCA" });
        dataset.push({ Descricao: "Núm. end. cobrança", FieldName: "A23_NUM_COBRANCA" });
        dataset.push({ Descricao: "Bairro end. cobrança", FieldName: "A24_BAIRRO_COBRANCA" });
        dataset.push({ Descricao: "Município end. cobrança", FieldName: "A25_MUNICIPIO_COBRANCA" });
        dataset.push({ Descricao: "Compl. end. cobrança", FieldName: "A26_COMPLE_COBRANCA" });
        dataset.push({ Descricao: "Estado end. cobrança", FieldName: "A27_UF_COBRANCA" });
        dataset.push({ Descricao: "CEP end. cobrança", FieldName: "A28_CEP_COBRANCA" });
        dataset.push({ Descricao: "Tel. cobrança", FieldName: "A29_FONE_COBRANCA" });
        dataset.push({ Descricao: "E-mail cobrança", FieldName: "A30_MAIL_COBRANCA" });

        return dataset;
      }

      function DatasetAcessosEntrega() {
        var dataset = [];           
      
        // Dados de entrega
        dataset.push({ Descricao: "End. entrega", FieldName: "A31_END_ENTREGA" });
        dataset.push({ Descricao: "Núm. end. entrega", FieldName: "A32_NUM_ENTREGA" });
        dataset.push({ Descricao: "Bairro end. entrega", FieldName: "A33_BAIRRO_ENTREGA" });
        dataset.push({ Descricao: "Município end. entrega", FieldName: "A34_MUNICIPIO_ENTREGA" });
        dataset.push({ Descricao: "Compl. end. entrega", FieldName: "A35_COMPLE_ENTREGA" });
        dataset.push({ Descricao: "Estado end. entrega", FieldName: "A36_UF_ENTREGA" });
        dataset.push({ Descricao: "CEP end. entrega", FieldName: "A37_CEP_ENTREGA" });
        dataset.push({ Descricao: "Tel. entrega", FieldName: "A38_FONE_ENTREGA" });
        dataset.push({ Descricao: "E-mail entrega", FieldName: "A39_MAIL_ENTREGA" });
      
        return dataset;
      }

    
    function deployItemCliente() {
      
        const CODCLI = document.getElementById('cod_cliente').value;
      
        var c2 = DatasetFactory.createConstraint('A01_COD_CLI', CODCLI, CODCLI, ConstraintType.MUST);
        var constraints = new Array(c2);
      
        var dataset = DatasetFactory.getDataset("ds_cadastro_clientes_winthor", null, constraints, null);
      
        var datasetAcessos = DatasetAcessosCliente();
      
        for (var i = 0; i < datasetAcessos.length; i++) {
          var descricao = datasetAcessos[i].Descricao;
          var fieldName = datasetAcessos[i].FieldName;
          var fieldValue = dataset.values[0][fieldName];
      
          wdkAddChild('acessos_cliente');
      
          $("#tipo_cliente___" + newId).val(descricao);
          $("#dado_cliente___" + newId).val(fieldValue);
        }
      }
    
      function deployItemComercial() {
      
        const CODCLI = document.getElementById('cod_cliente').value;
      
        var c2 = DatasetFactory.createConstraint('A01_COD_CLI', CODCLI, CODCLI, ConstraintType.MUST);
        var constraints = new Array(c2);
      
        var dataset = DatasetFactory.getDataset("ds_cadastro_clientes_winthor", null, constraints, null);
      
        var datasetAcessos = DatasetAcessosComercial();
      
        for (var i = 0; i < datasetAcessos.length; i++) {
          var descricao = datasetAcessos[i].Descricao;
          var fieldName = datasetAcessos[i].FieldName;
          var fieldValue = dataset.values[0][fieldName];
      
          wdkAddChild('acessos_comerciais');
      
          $("#tipo_comerciais___" + newId).val(descricao);
          $("#dado_comerciais___" + newId).val(fieldValue);
        }
      }

      function deployItemFinanceiro() {
      
        const CODCLI = document.getElementById('cod_cliente').value;
      
        var c2 = DatasetFactory.createConstraint('A01_COD_CLI', CODCLI, CODCLI, ConstraintType.MUST);
        var constraints = new Array(c2);
      
        var dataset = DatasetFactory.getDataset("ds_cadastro_clientes_winthor", null, constraints, null);
      
        var datasetAcessos = DatasetAcessosFinanceiro();
      
        for (var i = 0; i < datasetAcessos.length; i++) {
          var descricao = datasetAcessos[i].Descricao;
          var fieldName = datasetAcessos[i].FieldName;
          var fieldValue = dataset.values[0][fieldName];
      
          wdkAddChild('acessos_financeiros');
      
          $("#tipo_financeiros___" + newId).val(descricao);
          $("#dado_financeiros___" + newId).val(fieldValue);
        }
      }

      function deployItemEntrega() {
      
        const CODCLI = document.getElementById('cod_cliente').value;
      
        var c2 = DatasetFactory.createConstraint('A01_COD_CLI', CODCLI, CODCLI, ConstraintType.MUST);
        var constraints = new Array(c2);
      
        var dataset = DatasetFactory.getDataset("ds_cadastro_clientes_winthor", null, constraints, null);
      
        var datasetAcessos = DatasetAcessosEntrega();
      
        for (var i = 0; i < datasetAcessos.length; i++) {
          var descricao = datasetAcessos[i].Descricao;
          var fieldName = datasetAcessos[i].FieldName;
          var fieldValue = dataset.values[0][fieldName];
      
          wdkAddChild('acessos_entrega');
      
          $("#tipo_entrega___" + newId).val(descricao);
          $("#dado_entrega___" + newId).val(fieldValue);
        }
      }     
    
      
           
      function dispararAlerta(settings) {
        Swal.fire({
            icon: settings.icone,
            title: settings.titulo,
            text: `${settings.mensagem}`,
            timer: 5000
        })
    }

    
//     $(`body`).on("change", ".calc", e => {
//       const [, ROW] = e.target.id.split("___")
//       const QUANTIDADE = Number($(e.target).closest(`tr`).find(`:input[id*=qtde___]`).val())
//       validarQtDevolvida(e.target.value, QUANTIDADE, ROW)

// }


// function removeEmptyRows() {
//   var tabelaPaiFilho = $("#acessos_cliente").data("tablename");
//   var linhas = wdkAddChild(tabelaPaiFilho);

//   for (var i = 0; i < linhas; i++) {
//     var novoClienteInput = $("#novo_cliente___" + i);
//     var valorNovoCliente = novoClienteInput.val();

//     console.log("Verificando linha", (i + 1));
//     console.log("Valor do campo novo_cliente:", valorNovoCliente);

//     if (!valorNovoCliente) {
//       var mensagem = "A coluna 'novo_cliente' não pode estar em branco na linha " + (i + 1);
//       console.log("Campo novo_cliente vazio encontrado na linha", (i + 1));
//       FLUIGC.toast({
//         title: "Atenção!",
//         message: mensagem,
//         type: "warning"
//       });
//       novoClienteInput.focus();
//       return false;
//     }
//   }

//   return true;
// }

// function removeEmptyRows(){

// var rowCount = $("#acessos_cliente tbody tr").length;
// console.log(rowCount)

// if (rowCount > 0) {
//   for (var i = 0; i < rowCount; i++) {
//     var novoClienteInput = $("#novo_cliente___" + (i + 1));
//     console.log(novoClienteInput)
//     var valorNovoCliente = novoClienteInput.val();


//     if (valorNovoCliente == "") {
//       dispararAlerta({icone: "warning", titulo: "Atenção!", mensagem: "A coluna 'novo_cliente' não pode estar em branco"});
//     }
//   }
// }
// }

function removeEmptyRowsCliente() {
  const TABLE__GRID_ID = "#acessos_cliente";
  const rows = $(`${TABLE__GRID_ID} tbody tr`);

  rows.each(function(index) {
    const novoClienteInput = $(this).find(`input[name^="novo_cliente"]`);
    const valorNovoCliente = novoClienteInput.val();

    if (valorNovoCliente === "") {
      $(this).find(".remove-button").trigger("click");
    }
  });
}

function removeEmptyRowsComercial() {
  const TABLE__GRID_ID = "#acessos_comerciais";
  const rows = $(`${TABLE__GRID_ID} tbody tr`);

  rows.each(function(index) {
    const novoClienteInput = $(this).find(`input[name^="novo_comerciais"]`);
    const valorNovoCliente = novoClienteInput.val();

    if (valorNovoCliente === "") {
      $(this).find(".remove-button").trigger("click");
    }
  });
}

function removeEmptyRowsFinanceiro() {
  const TABLE__GRID_ID = "#acessos_financeiros";
  const rows = $(`${TABLE__GRID_ID} tbody tr`);

  rows.each(function(index) {
    const novoClienteInput = $(this).find(`input[name^="novo_financeiros"]`);
    const valorNovoCliente = novoClienteInput.val();

    if (valorNovoCliente === "") {
      $(this).find(".remove-button").trigger("click");
    }
  });
}

function formatarCNPJ(CNPJ) {
  console.log(CNPJ)
  return CNPJ ? CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ""
}

      