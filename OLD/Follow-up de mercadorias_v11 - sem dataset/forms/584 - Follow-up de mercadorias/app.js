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
    const FILTRO = 'A02_MATRICULA,' + document.getElementById('matricula').value;
    reloadZoomFilterValues(`comprador`, FILTRO)
    const TASK = Number(getWKNumState()) 
    console.log(document.getElementById('hidden_A04_CODCOMPRADOR').value)

    switch(TASK) {
        case 0:
        case EVENTO_INICIO:
            // esconderPaineis()
            mostrarTodasSecoes()
            $(`#dados-mercadoria`).show()
            $(`#retorno-cadastro`).show()
            $(`#retorno-cadastro`).addClass("blocked")
            break

        case RETORNO_FOLLOW: 
            $(`#abertura`).addClass("blocked")
            $(`#retorno-cadastro`).show()
            esconderBotoesPaiFilho()
            break

        case RESPOSTA_VENDEDOR: 
            $(`#abertura`).addClass("blocked")
            $(`#dados-mercadoria`).addClass("blocked")
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#tratativa-comprador`).show()
            $(`#tratativa-comprador`).addClass("blocked")
            $(`#resposta-vendedor`).show()
            break

        case TRATATIVA_COMPRADOR:
            $(`#abertura`).addClass("blocked")
            $(`#dados-mercadoria`).addClass("blocked")
            $(`#retorno-cadastro`).addClass("blocked")
            $(`#resposta-vendedor`).addClass("blocked")
            $(`#resposta-vendedor`).show()
            $(`#tratativa-comprador`).show()
            break

        case RECEBIMENTO:
            $(`#abertura`).addClass("blocked")
            $(`#dados-mercadoria`).addClass("blocked")
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
    const COMPRADOR = $(`#comprador`).val()
    const MATRICULA =  $(`[name="matricula"]`).val()
    // document.getElementById('matricula').value;

    Array.from($(`:input[id*=codprod___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A06_MATRICULA,${MATRICULA},A19_COMPRADOR,${COMPRADOR}`)

    })

    Array.from($(`:input[id*=descprod___]`)).map(el => {
        reloadZoomFilterValues(el.id, `A06_MATRICULA,${MATRICULA},A19_COMPRADOR,${COMPRADOR}`)
      
    })
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const [, row] = selectedItem.inputName.split('___')

    switch (inputId) {

        case `comprador`:
            $(`#matcomprador`).val(selectedItem.A04_CODCOMPRADOR)
            break

        case `codprod___${row}`:
            window[`descprod___${row}`].setValue(selectedItem.A09_DESCRICAO)
            $(`#oc___${row}`).val(selectedItem.A14_PEDIDO_COMPRA)
            $(`#qtdcomprada___${row}`).val(selectedItem.A15_QT_PEDIDA)
            break 

            case `descprod___${row}`:
                window[`codprod___${row}`].setValue(selectedItem.A08_CODPROD)
                $(`#oc___${row}`).val(selectedItem.A14_PEDIDO_COMPRA)
                $(`#qtdcomprada___${row}`).val(selectedItem.A15_QT_PEDIDA)
                break   

            
    }
}

function converterTimeStamp(timeStamp) {
    return new moment(timeStamp).format("L")
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")

}

function removeDuplicatas(){

    var tabelaTitulos = new Array();
    var titulosFilhos = DatasetFactory.getDataset('ds_followup_mercadorias', null, null, null).values;
    
    for (var i = 0; i < titulosFilhos.length; i++) {
      var titulo = titulosFilhos[i]['titulo']; //substitua 'titulo' pelo nome do campo da tabela que você quer filtrar
      if (!tabelaTitulos.includes(titulo)) {
        tabelaTitulos.push(titulo);
      }
    }
    
    console.log(tabelaTitulos);

}

// Função executada quando clicamos no x do zoom (prorrogação de títulos)
function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {
        case `comprador`:
            console.log(`${TABLE__GRID_ID}`)
            limparPaiFilho()
            break

   }
}