const EVENTO_INICIO = 4
const AGENDAMENTO_BLOQUEIO = 5
const BLOQUEIO_TI = 6
const EFETIVACAO_CANCELAMENTO = 11
const FIM = 12
const TABLE__GRID_ID = `#acessos`

function taskHandler(){
    const TASK = Number(getWKNumState()) 

    // var caso = document.getElementById('automatico').value;
    // if(caso == "nao") {}

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
        atualizaValores()
        $(`#dadosacesso`).show()
            break

        case EFETIVACAO_CANCELAMENTO: 
        console.log(EFETIVACAO_CANCELAMENTO)
        $(`#ti`).show()
        recolherPainel(`#ti`)
        validarInativo()
        limpaTabela()
            break
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
    $(document).on("click", ".js-add", e => {
        wdkAddChild(`acessos`)
    })

    moment.locale("pt-br")
    taskHandler()
    
})

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    console.log (inputId)

    switch (inputId) {

        case `matricula`:
            window[`nome`].setValue(selectedItem.A03_NOME)
            $(`#guerra`).val(selectedItem.A04_NOME_GUERRA)
            // $(`#datainicio`).val(selectedItem.A05_DT_ADMISSAO)
            $(`#sit528`).val(selectedItem.A06_SITUACAO_528)
            $(`#setor`).val(selectedItem.A18_SETOR)
            $(`#cargo`).val(selectedItem.A19_FUNCAO)
            $(`#profissao`).val(selectedItem.A20_PROFISSAO)
            $(`#motivo528`).val(selectedItem.A21_MOTIVO_528)
            deployAcessos()
            break
  
        case `nome`:
            window[`matricula`].setValue(selectedItem.A01_MATRICULA)
            $(`#guerra`).val(selectedItem.A04_NOME_GUERRA)
            // $(`#admissao`).val(selectedItem.A05_DT_ADMISSAO)
            $(`#sit528`).val(selectedItem.A06_SITUACAO_528)
            $(`#setor`).val(selectedItem.A18_SETOR)
            $(`#cargo`).val(selectedItem.A19_FUNCAO)
            $(`#profissao`).val(selectedItem.A20_PROFISSAO)
            $(`#motivo528`).val(selectedItem.A21_MOTIVO_528)
            deployAcessos()
            break

        }
}

function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {

        case `matricula`:
            window[`nome`].clear()
            $(`#guerra`).val("")
            // $(`#admissao`).val("")
            $(`#sit528`).val("")
            $(`#setor`).val("")
            $(`#cargo`).val("")
            $(`#profissao`).val("")
            $(`#motivo528`).val("")
            limparPaiFilho()
            break

        case `nome`:
            window[`matricula`].clear()
            $(`#guerra`).val("")
            // $(`#admissao`).val("")
            $(`#sit528`).val("")
            $(`#setor`).val("")
            $(`#cargo`).val("")
            $(`#profissao`).val("")
            $(`#motivo528`).val("")
            limparPaiFilho()
            break
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

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")

}

function validarInativo(){

    const MATRICULA = document.getElementById('matricula').value;
    console.log(MATRICULA)

    var c1 = DatasetFactory.createConstraint('A01_MATRICULA', MATRICULA, MATRICULA, ConstraintType.MUST);
    var constraints = new Array (c1)

    var datasetMatricula = DatasetFactory.getDataset("ds_desligamento_colaborador_winthor", null, constraints, null);
    var SITUACAO_528 = datasetMatricula.values[0]["A06_SITUACAO_528"];
    var MOTIVO_528 = datasetMatricula.values[0]["A21_MOTIVO_528"];
    var SITUACAO_517 = datasetMatricula.values[0]["A22_BLOQUEIO_RCA_517"];
    var MOTIVO_517 = datasetMatricula.values[0]["A25_MOTIVO_RCA_517"];
    
    $("#sit528").val(SITUACAO_528);
    $(`#motivo528`).val(MOTIVO_528);
    $(`#sit517`).val(SITUACAO_517);
    $(`#motivo517`).val(MOTIVO_517);

}

function limpaTabela(){
  // Obtém a referência para o corpo da tabela
  var tbody = $("#acessos tbody");

  // Obtém todas as linhas da tabela
  var rows = tbody.find("tr");

  // Loop pelas linhas da tabela em ordem reversa
  for (var i = rows.length - 1; i >= 0; i--) {
    var row = rows.eq(i);

    // Obtém o valor da coluna "destino"
    var destinoCell = row.find("[name='destino']");
    var destinoValue = destinoCell.val();

    // Verifica se o valor é "Selecione"
    if (destinoValue === "Selecione") {
      // Remove a linha da tabela
      row.remove();
    }
  }
}

function atualizaValores(){

    const MATRICULA = document.getElementById('matricula').value;

    var c2 = DatasetFactory.createConstraint('A01_MATRICULA', MATRICULA, MATRICULA, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_desligamento_colaborador_winthor", null, constraints, null);
    console.log(dataset)

    $("#nome").val(dataset.values[0].A03_NOME);
    $("#guerra").val(dataset.values[0].A04_NOME_GUERRA);
    $("#setor").val(dataset.values[0].A18_SETOR);
    $("#cargo").val(dataset.values[0].A19_FUNCAO);
    $("#profissao").val(dataset.values[0].A20_PROFISSAO);
   
}