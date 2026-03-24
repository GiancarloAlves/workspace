// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const RETORNO_FOLLOW = 30
const RESPOSTA_VENDEDOR = 24
const TRATATIVA_COMPRADOR = 31
const RECEBIMENTO = 32
const FINALIZACAO_VENDEDOR = 33
const TABLE__GRID_ID = `#TabelaTitulos`

function taskHandler() {

    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()
    $(`#matricula`).val(MATRICULA_VENDEDOR)

    //FILTROS DE RCA DESATIVADOS
    // const FILTRO = 'A06_MATRICULA,' + document.getElementById('matricula').value;
    // reloadZoomFilterValues(`codfornec`, FILTRO)
    // reloadZoomFilterValues(`fornecedor`, FILTRO)
    // // reloadZoomFilterValues(`mainOC`, FILTRO)
    // // reloadZoomFilterValues(`pesqcod`, FILTRO)

    const TASK = Number(getWKNumState()) 

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
            esconderPaineis()
            $(`#retorno-cadastro`).show()
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#resposta-vendedor`).show()
            $(`#tratativa-comprador`).show()
            break

        case RETORNO_FOLLOW: 
            $(`#retorno-cadastro`).show()
            $(`#resposta-vendedor`).hide()
            $(`#tratativa-comprador`).hide()
            $(`#recebimento`).hide()
            $(`#fechamento`).hide()
            esconderBotoesPaiFilho()
            break

        case RESPOSTA_VENDEDOR: 
            $(`#abertura`).addClass("blocked")
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#tratativa-comprador`).show()
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#resposta-vendedor`).show()
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#recebimento`).hide()
            $(`#fechamento`).hide()
            break

        case TRATATIVA_COMPRADOR:
            $(`#abertura`).addClass("blocked")
            $(`#dados-mercadoria`).addClass("blocked")
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#resposta-vendedor`).addClass("blocked")
            $(`#resposta-vendedor`).show()
            $(`#tratativa-comprador`).show()
            $(`#recebimento`).hide()
            $(`#fechamento`).hide()
            break

        case RECEBIMENTO:
            $(`#abertura`).addClass("blocked")
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#resposta-vendedor`).addClass("blocked")
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#tratativa-comprador`).show()
            $(`#recebimento`).show()
            break

        case FINALIZACAO_VENDEDOR:
            mostrarTodasSecoes()
            $(`#abertura`).addClass("blocked")  
            $(`#dados-mercadoria`).addClass("blocked") 
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#resposta-vendedor`).addClass("blocked")  
            $(`#tratativa-comprador`).addClass("blocked")   
            $(`#recebimento`).addClass("blocked")               
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
        wdkAddChild(`TabelaTitulos`)
        filtrarZoomPaiFilho()
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
    // document.getElementById('matricula').value;

   
    Array.from($(`:input[id*=codprod___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A10_CODFORNEC,${CODFORNECEDOR}`)

    })
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    
    switch (inputId) {

        case `codfornec`:
            window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)
            $(`#comprador`).val(selectedItem.A19_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
            $('#additem').removeAttr('hidden');

            disableMainOC();
            disablePesqprod();
            break
            

        case `fornecedor`:
            window[`codfornec`].setValue(selectedItem.A10_CODFORNEC)
            $(`#comprador`).val(selectedItem.A19_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
            $('#additem').removeAttr('hidden');

            disableMainOC();
            disablePesqprod();
            break

        case `codprod___${row}`:
            $(`#descprod___${row}`).val(selectedItem.A09_DESCRICAO)
            $(`#oc___${row}`).val(selectedItem.A14_PEDIDO_COMPRA)
            $(`#qtdcomprada___${row}`).val(selectedItem.A15_QT_PEDIDA)
            $(`#comprador2___${row}`).val(selectedItem.A19_COMPRADOR)
            $('#listaoc').attr('hidden', true);
            $('#listaitem').attr('hidden', true);

        case `mainOC`:
            window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)

            $(`#comprador`).val(selectedItem.A19_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
            $('#additem').removeAttr('hidden');

            disablePesqprod();

        case `pesqcod`:
            window[`fornecedor`].setValue(selectedItem.A11_FORNECEDOR)
            window[`codfornec`].setValue(selectedItem.A10_CODFORNEC)
            $(`#comprador`).val(selectedItem.A19_COMPRADOR)
            $(`#matcomprador`).val(selectedItem.A18_CODCOMPRADOR)
            $('#additem').removeAttr('hidden');

            disableMainOC();

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
        case `codfornec`:
            limparPaiFilho()
            $('#additem').attr('hidden', true);

            break

   }
}

function deployFollow() {

    disableGeral()

    const MATRICULA = document.getElementById('matricula').value;
    const CODFORNEC = document.getElementById('codfornec').value;

    var c2 = DatasetFactory.createConstraint('A10_CODFORNEC', CODFORNEC, CODFORNEC, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_pedidos_follow_winthor", null, constraints, null);

    for (var i=0;i<dataset.values.length;i++){
        wdkAddChild('TabelaTitulos');

        window[`codprod___`+newId].setValue(dataset.values[i].A08_CODPROD)
        $("#descprod___"+newId).val(dataset.values[i].A09_DESCRICAO);
        $("#oc___"+newId).val(dataset.values[i].A14_PEDIDO_COMPRA);
        $("#qtdcomprada___"+newId).val(dataset.values[i].A15_QT_PEDIDA);
        $("#comprador2___"+newId).val(dataset.values[i].A19_COMPRADOR);

    }
}

function deployOC() {

    disableGeral()

    const MATRICULA = document.getElementById('matricula').value;
    const OC = document.getElementById('mainOC').value;

    var c2 = DatasetFactory.createConstraint('A14_PEDIDO_COMPRA', OC, OC, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_pedidos_follow_winthor", null, constraints, null);


    for (var i=0;i<dataset.values.length;i++){
        wdkAddChild('TabelaTitulos');

        window[`codprod___`+newId].setValue(dataset.values[i].A08_CODPROD)
        $("#descprod___"+newId).val(dataset.values[i].A09_DESCRICAO);
        $("#oc___"+newId).val(dataset.values[i].A14_PEDIDO_COMPRA);
        $("#qtdcomprada___"+newId).val(dataset.values[i].A15_QT_PEDIDA);
        $("#comprador2___"+newId).val(dataset.values[i].A19_COMPRADOR);

    }
}

  function deployItem() {

    disableGeral()

    const MATRICULA = document.getElementById('matricula').value;
    const ITEM = document.getElementById('pesqcod').value;

    var c2 = DatasetFactory.createConstraint('A08_CODPROD', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array (c2)

    var dataset = DatasetFactory.getDataset("ds_pedidos_follow_winthor", null, constraints, null);


    for (var i=0;i<dataset.values.length;i++){
        wdkAddChild('TabelaTitulos');

        window[`codprod___`+newId].setValue(dataset.values[i].A08_CODPROD)
        $("#descprod___"+newId).val(dataset.values[i].A09_DESCRICAO);
        $("#oc___"+newId).val(dataset.values[i].A14_PEDIDO_COMPRA);
        $("#qtdcomprada___"+newId).val(dataset.values[i].A15_QT_PEDIDA);
        $("#comprador2___"+newId).val(dataset.values[i].A19_COMPRADOR);

    }
}

  function disableListarProd() {
    var lista = document.getElementById("deploylista");
    lista.disabled = true;
  }

  function disableMainOC() {
    var mainOC = document.getElementById("mainOC");
    mainOC.disabled = true;
  }

  function disablePesqprod() {
    var pesqcod = document.getElementById("pesqcod");
    pesqcod.disabled = true;
  }

  function disableBotaoOC(){
   $('#listaitem').attr('hidden', true);
  }

  function disableBotaoItem(){
    $('#listaoc').attr('hidden', true);
   }

   function disableBotaoDeploy(){
    $('#deploylista').attr('hidden', true);
   } 

function disableGeral(){
    disableBotaoItem()
    disableBotaoOC()
    disableBotaoDeploy()
}


