// CONSTANTES GLOBAIS
const EVENTO_INICIO = 4
const APROVACAO_CADASTRO = 5
const CADASTRO_PRODUTO = 17

function taskHandler() {
    const TASK = Number(getWKNumState()) 

    switch(TASK) {
        case 0:
        case EVENTO_INICIO: 
            console.log("teste")
            break

        case APROVACAO_CADASTRO:
    }
}

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName

    switch (inputId) {
        case `cod_cliente`:
            window["DSClient"].setValue(selectedItem.CLIENTE)

            reloadZoomFilterValues(`cliente`, `CODCLI,${selectedItem.CODCLI}`)
            break

    }
}