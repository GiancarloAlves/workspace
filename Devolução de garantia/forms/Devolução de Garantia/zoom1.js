function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputId
    const [, row] = selectedItem.inputId.split('___')

    switch (inputId) {

        case `cliente`:
            window[`codCliente`].setValue(selectedItem.A03_COD_CLI)

            reloadZoomFilterValues(`endColeta`, `A03_COD_CLI,${selectedItem.A03_COD_CLI}`)
            reloadZoomFilterValues(`codCliente`, `A03_COD_CLI,${selectedItem.A03_COD_CLI}`)

            filtrarZoom()

            const FILTROA = 'A03_COD_CLI,' + document.getElementById('codCliente').value;

            reloadZoomFilterValues(`filtroNF`, FILTROA)

            break

        case `endColeta`:
            $(`#enderecoCompletoB`).val(selectedItem.A20_ENTREGA)
            $(`#enderecoCompleto`).val(selectedItem.A20_ENTREGA)
            break

        case `codCliente`:
            window[`cliente`].setValue(selectedItem.A04_CLIENTE)

            reloadZoomFilterValues(`cliente`, `A03_COD_CLI,${selectedItem.A03_COD_CLI}`)
            reloadZoomFilterValues(`endColeta`, `A03_COD_CLI,${selectedItem.A03_COD_CLI}`)
            filtrarZoom()

            const FILTROB = 'A03_COD_CLI,' + document.getElementById('codCliente').value;

            reloadZoomFilterValues(`filtroNF`, FILTROB)

            break

        case `codProduto___${row}`:
            $(`#valorUnitario___${row}`).val(selectedItem.A06_VL_VENDA_UNIT)
            // $(`#pedidoEspecial___${row}`).val(converterProduto(selectedItem.DEVOLUCAO))
            $(`#foraPrazo___${row}`).val(selectedItem.DATA_DEVOL)
            $(`#qtde___${row}`).val(selectedItem.A05_QT_UNIT)
            window[`descProduto___${row}`].setValue(selectedItem.A04_PRODUTO)
            window[`numeroNF___${row}`].setValue(selectedItem.A01_NOTA)

            reloadZoomFilterValues(`numeroNF___${row}`, `A01_NOTA,${selectedItem.A01_NOTA}`)
            reloadZoomFilterValues(`descProduto___${row}`, `A04_PRODUTO,${selectedItem.A04_PRODUTO}`)
            validarProdutoEspecial()
            setMaxInput()
            break

        case `numeroNF___${row}`:
            reloadZoomFilterValues(`codProduto___${row}`, `A01_NOTA,${selectedItem.A01_NOTA}`)
            break

        case `descProduto___${row}`:
            window[`codProduto___${row}`].setValue(selectedItem.A03_COD_PROD)
            window[`numeroNF___${row}`].setValue(selectedItem.A01_NOTA)

            $(`#valorUnitario___${row}`).val(selectedItem.A06_VL_VENDA_UNIT)
            $(`#qtde___${row}`).val(selectedItem.A05_QT_UNIT)
            validarProdutoEspecial()
            setMaxInput()

            // reloadZoomFilterValues(`codProduto___${row}`, `A03_COD_PROD,${selectedItem.A03_COD_PROD},A03_COD_CLI,${selectedItem.A03_COD_CLI}`)
            break

        case `filtroNF`:
            $(`#tipoCred`).val(selectedItem.A17_PLANO)
            break
    }
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")
}

function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId;
    const [, row] = removedItem.inputId.split('___');

    switch (inputId) {
        case `cliente`:
            window[`codCliente`].clear();
            limparPaiFilho();
            break;

        case `codCliente`:
            window[`cliente`].clear();
            limparPaiFilho();
            break;

        case `descProduto___${row}`:
            window[`numeroNF___${row}`].clear();
            window[`codProduto___${row}`].clear();
            $(`#valorUnitario___${row}`).val("");
            $(`#pedidoEspecial___${row}`).val("");
            $(`#foraPrazo___${row}`).val("");
            $(`#qtde___${row}`).val("");
            break;


        case `codProduto___${row}`:
            window[`numeroNF___${row}`].clear();
            window[`codProduto___${row}`].clear();
            $(`#valorUnitario___${row}`).val("");
            $(`#pedidoEspecial___${row}`).val("");
            $(`#foraPrazo___${row}`).val("");
            $(`#qtde___${row}`).val("");

        case `filtroNF`:
            limparPaiFilho();
            $(`#tipoCred`).val("")
            $(`#responsCred`).val("")
            $(`#matCred`).val("")
            $('.adicionarItem').addClass('blocked')
            break;
    }
}

function setMaxInput() {
    const SELECTOR = $(`:input[id*=qtde___]`)

    if (SELECTOR.length) {
        Array.from(SELECTOR).map(el => {
            const [, ROW] = el.id.split("___")
            const MAX_VALUE = el.value

            $(`#qtdeDevolvida___${ROW}`).attr("max", MAX_VALUE)
        })
    }
}

function validarQtDevolvida(QT_DEVOLVIDA, QUANTIDADE, ROW) {
    if (QT_DEVOLVIDA && QUANTIDADE) {
        if (QT_DEVOLVIDA > QUANTIDADE || QT_DEVOLVIDA.toString().length > QUANTIDADE.toString().length) {
            dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: `O valor digitado excedeu a quantidade máxima permitida de ${QUANTIDADE}` })
            $(`#qtdeDevolvida___${ROW}`).val("")

            return
        }
    }
}

function converterProduto(TIPO_PRODUTO) {
    return TIPO_PRODUTO == "Produto Normal" ? "Não" : "Sim"
}

function formatarEndereco(END) {
    const ENDERECO = END.ENDERCOM ? END.ENDERCOM : "N/A"
    const NUMERO = END.NUMEROCOM ? END.NUMEROCOM : "N/A"
    const BAIRRO = END.BAIRROCOM ? END.BAIRROCOM : "N/A"
    const CIDADE = END.MUNICCOM ? END.MUNICCOM : "N/A"
    const UF = END.ESTCOM ? END.ESTCOM : "N/A"
    const CEP = END.CEPCOM ? END.CEPCOM : "N/A"

    const ENDERECO_COMPLETO = `${ENDERECO}, ${NUMERO} - ${BAIRRO} ${CIDADE} - ${UF}, ${CEP}`
    $(`#enderecoCompleto`).val(ENDERECO_COMPLETO.trim())
    $(`#enderecoCompletoB`).val(ENDERECO_COMPLETO.trim())
}

// function formatarCNPJ(CNPJ) {
//     console.log(CNPJ)
//     return CNPJ ? CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ""
// }