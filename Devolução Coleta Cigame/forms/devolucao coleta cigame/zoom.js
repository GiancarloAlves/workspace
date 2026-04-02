function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputId
    const [, row] = selectedItem.inputId.split('___')

    switch (inputId) {

        case `cliente`:

            $(`#ieCliente`).val(selectedItem.IE)
            $(`#cnpjCliente`).val(formatarCNPJ(selectedItem.CGCCPF))
            window[`codCliente`].setValue(selectedItem.CODCLI)

            reloadZoomFilterValues(`endColeta`, `CODCLI,${selectedItem.CODCLI}`)
            reloadZoomFilterValues(`codCliente`, `CODCLI,${selectedItem.CODCLI}`)

            filtrarZoom()

            const FILTROA = 'CODCLI,' + document.getElementById('codCliente').value;

            reloadZoomFilterValues(`filtroNF`, FILTROA)
            fiscal()
            break

        case `motivoDevolucao`:
            contabilizaFrete()
            break

        case `endColeta`:
            formatarEndereco(selectedItem)
            break

        case `codCliente`:
            $(`#ieCliente`).val(selectedItem.IE)
            $(`#cnpjCliente`).val(formatarCNPJ(selectedItem.CGCCPF))
            window[`cliente`].setValue(selectedItem.CLIENTE)
            $(`#carteira`).val(selectedItem.RCA)

            reloadZoomFilterValues(`cliente`, `CODCLI,${selectedItem.CODCLI}`)
            reloadZoomFilterValues(`endColeta`, `CODCLI,${selectedItem.CODCLI}`)
            filtrarZoom()

            const FILTROB = 'CODCLI,' + document.getElementById('codCliente').value;

            reloadZoomFilterValues(`filtroNF`, FILTROB)
            fiscal()

            break

        case `codProduto___${row}`:
            $(`#valorUnitario___${row}`).val(selectedItem.PVENDA)
            $(`#pedidoEspecial___${row}`).val(converterProduto(selectedItem.DEVOLUCAO))
            $(`#foraPrazo___${row}`).val(selectedItem.DATA_DEVOL)
            console.log("pedidoEspecial:", converterProduto(selectedItem.DEVOLUCAO))
            console.log("foraPrazo:", selectedItem.DATA_DEVOL)
            $(`#qtde___${row}`).val(selectedItem.QT)
            window[`descProduto___${row}`].setValue(selectedItem.DESCRICAO)
            window[`numeroNF___${row}`].setValue(selectedItem.NUMNOTA)

            reloadZoomFilterValues(`numeroNF___${row}`, `NUMNOTA,${selectedItem.NUMNOTA}`)
            reloadZoomFilterValues(`descProduto___${row}`, `DESCRICAO,${selectedItem.DESCRICAO}`)
            validarProdutoEspecial()
            setMaxInput()
            break

        case `numeroNF___${row}`:
            reloadZoomFilterValues(`codProduto___${row}`, `NUMNOTA,${selectedItem.NUMNOTA}`)
            break

        case `descProduto___${row}`:
            window[`codProduto___${row}`].setValue(selectedItem.CODPROD)
            window[`numeroNF___${row}`].setValue(selectedItem.NUMNOTA)

            $(`#valorUnitario___${row}`).val(selectedItem.PVENDA)
            $(`#pedidoEspecial___${row}`).val(converterProduto(selectedItem.DEVOLUCAO))
            $(`#foraPrazo___${row}`).val(selectedItem.DATA_DEVOL)
            console.log("pedidoEspecial:", converterProduto(selectedItem.DEVOLUCAO))
            console.log("foraPrazo:", selectedItem.DATA_DEVOL)
            $(`#qtde___${row}`).val(selectedItem.QT)
            validarProdutoEspecial()
            setMaxInput()

            // reloadZoomFilterValues(`codProduto___${row}`, `CODPROD,${selectedItem.CODPROD},CODCLI,${selectedItem.CODCLI}`)
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
            $(`#ieCliente`).val("");
            $(`#cnpjCliente`).val("");
            limparPaiFilho();
            break;

        case `codCliente`:
            window[`cliente`].clear();
            $(`#ieCliente`).val("");
            $(`#cnpjCliente`).val("");
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
        if (QT_DEVOLVIDA > QUANTIDADE) {
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

function formatarCNPJ(CNPJ) {
    console.log(CNPJ)
    return CNPJ ? CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : ""
}