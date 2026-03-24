// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const GERENTE = 30
const COMPRADOR = 31
const AGENDAMENTO = 32
const TABLE__GRID_ID = `#tabela`

function taskHandler() {

    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    $(`#matricula`).val(MATRICULA_VENDEDOR)

    var oc = $('#rowOC');
    var nf = $('#rowNF');

    const TASK = Number(getWKNumState()) 

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
            oc.hide();
            nf.hide();
            updateLED("led_abertura",true)
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#aprovacao-gerente`).addClass("blocked")
            $(`#recebimento`).addClass("blocked")
            break                       

        case GERENTE: 
            updateLED("led_gerente",true)
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#abertura`).addClass("blocked")
            $(`#recebimento`).addClass("blocked")
            break

        case COMPRADOR:
            updateLED("led_comprador",true)
            $(`#aprovacao-gerente`).addClass("blocked")
            $(`#abertura`).addClass("blocked")
            $(`#recebimento`).addClass("blocked")
            break

        case AGENDAMENTO:
            updateLED("led_final",true)
            $(`#abertura`).addClass("blocked")
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#aprovacao-gerente`).addClass("blocked")
            break         

    }
}

function esconderPaineis() {
    $(`.panel-primary:gt(1)`).hide()
}

function mostrarTodasSecoes() {
    $(`.panel-primary`).show()
}

function esconderBotoesPaiFilho() {
    $(`.remove-button`).hide()
    $(`.js-add`).hide()
}

$(document).ready(() => {
    moment.locale("pt-br")

    $(`.js-add`).on("click", e => {
        wdkAddChild(`tabela`)

    })
    mostrarTodasSecoes()
    taskHandler()

})

function bloquearCampos(SECTION_ID) {
    $(`.panel-primary:not([id="${SECTION_ID}"]) :input`).parent().addClass("blocked")
}

function filtrarZoomPaiFilho() {
    const CODFORNECEDOR = $(`#codfornec`).val()
    const MATRICULA =  $(`[name="matricula"]`).val()
    const OC = $(`#mainOC`).val()
   
    Array.from($(`:input[id*=codprod___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A08_OC,${OC}`)

    })
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    
    switch (inputId) {

        case `codfornec`:
            window[`fornecedor`].setValue(selectedItem.FORNECEDOR)
            // window[`fantasia`].setValue(selectedItem.FANTASIA)
            $(`#comprador`).val(selectedItem.NOME)      
            $(`#matcomprador`).val(selectedItem.CODCOMPRADOR)
            // $("#fantasia").hide();

            break

        case `fornecedor`:
            window[`codfornec`].setValue(selectedItem.CODFORNEC)
            // window[`fantasia`].setValue(selectedItem.FANTASIA)
            $(`#comprador`).val(selectedItem.NOME)
            $(`#matcomprador`).val(selectedItem.CODCOMPRADOR)
            // $("#fantasia").hide();
            break

        
        case `fantasia`:
            window[`codfornec`].setValue(selectedItem.CODFORNEC)
            window[`fornecedor`].setValue(selectedItem.FORNECEDOR)
            $(`#comprador`).val(selectedItem.NOME)      
            $(`#matcomprador`).val(selectedItem.CODCOMPRADOR)  
            break

        case `codprod___${row}`:
            $(`#descprod___${row}`).val(selectedItem.A02_PRODUTO)
            $(`#qtdOC___${row}`).val(selectedItem.A03_QT_PEDIDA)
            $(`#valorOC___${row}`).val(selectedItem.A04_VALOR_UNI)
            $(`#valorTOC___${row}`).val(selectedItem.A05_VALOR_TOTAL)          
            break

        case `mainOC`:
            $(`#comprador`).val(selectedItem.A13_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A12_MATRICULA)
            $(`#fornecString`).val(selectedItem.A08_FORNECEDOR)
            $(`#tipofrete`).val(selectedItem.A10_TIPO_FRETE)
            $(`#valortotal`).val(selectedItem.A07_VALOR_TOTAL)
            $('#additem').removeAttr('hidden');
            break

        case `pesqcod`:
            $(`#comprador`).val(selectedItem.A19_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
            $('#additem').removeAttr('hidden');
            break

    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")

}

// Função executada quando clicamos no x do zoom (prorrogação de títulos)
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {

        case `fornecedor`:
            break

        case `codfornec`:
            break

   }
}

function deployOC() {

    const MATRICULA = document.getElementById('matricula').value;
    const OC = document.getElementById('mainOC').value;

    var c2 = DatasetFactory.createConstraint('A08_OC', OC, OC, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_ocor_receb_tab_winthor", null, constraints, null);

    for (var i=0;i<dataset.values.length;i++){
        wdkAddChild('tabela');

        window[`codprod___`+newId].setValue(dataset.values[i].A01_COD_PROD)
        $("#descprod___"+newId).val(dataset.values[i].A02_PRODUTO);
        $("#qtdOC___"+newId).val(dataset.values[i].A03_QT_PEDIDA);
        $("#valorOC___"+newId).val(dataset.values[i].A04_VALOR_UNI);
        $("#valorTOC___"+newId).val(dataset.values[i].A05_VALOR_TOTAL);
     }
}

function definirTipo(){

    var oc = $('#rowOC');
    var nf = $('#rowNF');

        var motivo = document.getElementById('motivo').value
        console.log(motivo)

        switch(motivo){
        
        case "2":
            nf.show();
            oc.hide();           
        break
        
        case "3":
            nf.hide();
            oc.show();
        break

        case "5":
            nf.hide();
            oc.show();
        
        default:
            nf.hide();
            oc.show();
            filtrarZoomPaiFilho();
        break
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

