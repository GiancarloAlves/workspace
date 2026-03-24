const EVENTO_INICIO = 4
const APROVACAO_SUPERVISOR = 22
const APROVACAO_GERENTE = 33
const DEVOLUCAO = 5
const LIBERACAO = 60
const FATURAMENTO = 62
const ANEXAR_CANHOTO = 7
const FINANCEIRO = 8
const CORRECAO = 45

const TABLE__GRID_ID = `#pedido`
const TABLE__GRID_ID2 = `#listaitens`

async function starter() {

    // Busca o supervisor do vendedor
    $(`#gerente`).val("Não")
    getSupervisorVendedor()

    const TIPO_SOLICITANTE = await userSupervisorVendas()
    const VENDEDOR = parent.WCMAPI.getUser()
    const MATRICULA_VENDEDOR = parent.WCMAPI.getUserCode()

    $(`#tipoSolicitante`).val(TIPO_SOLICITANTE)
    $(`#vendedor`).val(VENDEDOR)
    $(`#matSolicitante`).val(MATRICULA_VENDEDOR)
}

async function userSupervisorVendas() {
    const DADOS_ADICIONAIS = await getDadosAdicionaisUser(parent.WCMAPI.getUserCode())
    const PAPEIS_USUARIO = DADOS_ADICIONAIS.content.roles
    const ID_PAPEL = "SUPERVISOR_DE_VENDAS"

    // return PAPEIS_USUARIO
    return PAPEIS_USUARIO.includes(ID_PAPEL) ? "Supervisor" : "Vendedor"
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
        headers: { "Content-type": "application/json;charset=UTF-8" }
    })

    const DATA = await RESPONSE.json()
    return DATA
}

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK + 'teste')

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
        case CORRECAO:
            starter()
            updateLED("led_abertura")
            ligarLED("led_tabela")
            $(`#divnumped`).addClass("blocked")
            tratarPainel("abertura")
            $(`#tabela`).addClass("in")
            $(`#supervisor`).addClass("blocked")
            $(`#gerente`).addClass("blocked")
            $(`#tabela`).removeClass("blocked")

            break

        case APROVACAO_SUPERVISOR:
            updateLED("led_supervisor")
            tratarPainel("supervisor")
            const DIVERGENCIA = document.getElementById("divergItem").value

            if (DIVERGENCIA == "Sim") {
                dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: "Há divergência entre os itens da NF e do pedido. Confira se realmente é possível aprovar a solicitação e deixe orientação para liberação do crédito." });
            }

            break

        case APROVACAO_GERENTE:
            updateLED("led_gerente")
            tratarPainel("painelgerente")

            break

        case DEVOLUCAO:
            updateLED("led_logistica")
            tratarPainel("logistica")

            break

        case LIBERACAO:
            atualizaStatus()
            updateLED("led_liberacao")
            tratarPainel("liberacao")

            const status_lib = document.getElementById("status").value
            console.log(status_lib)
            if (status_lib !== "L") {
                dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: `Pedido está com status diferente de Liberado. Pedido precisa estar liberado para o processo continuar` })
            }

            break

        case FATURAMENTO:
            updateLED("led_faturamento")
            tratarPainel("faturamento")

            break

        case ANEXAR_CANHOTO:
            updateLED("led_canhoto")
            tratarPainel("canhoto")

            break

        case FINANCEIRO:
            updateLED("led_financeiro")
            tratarPainel("financeiro")
            $(`#destinoSolic`).addClass("blocked")

            $(`[data-conferencia]`).on("change", e => {
                const EL = $(`#destinoSolic`)
                e.target.value == "Não" ? EL.removeClass("blocked") : EL.addClass("blocked")
                console.log(EL)
            })

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
    revalidarCamposDivergentes()

    $(`.js-add`).on("click", e => {
        wdkAddChild(`pedido`)
    })
})

// Função executada quando selecionamos um item no zoom
function setSelectedZoomItem(selectedItem) {
    const inputId = selectedItem.inputName
    const COD_MATRICULA = $(`#matSolicitante`).val()

    switch (inputId) {
        case `numped`:
            $(`#posicaoPed`).val(selectedItem.A07_POSICAO)
            $(`#transportadora`).val(selectedItem.A15_TRANSPORTADORA)
            $(`#codtransp`).val(selectedItem.A14_COD_TRANSP)

            deploy()
            liberacaoCredito()

            break

        case `numNF`:
            // reloadZoomFilterValues(`numNF`, `A19_MATRICULA_RCA,` + COD_MATRICULA)
            // reloadZoomFilterValues(`numped`, `A19_MATRICULA_RCA,` + COD_MATRICULA)
            $(`#dataNF`).val(selectedItem.A05_EMISSAO_PED)
            $(`#tipoCred`).val(selectedItem.A13_PLANO)
            $(`#divnumped`).removeClass("blocked")

            break
    }
}

function removedZoomItem(removedItem) {
    const inputId = removedItem.inputId

    switch (inputId) {
        case `numNF`:
        case `numped`:
            limparPaiFilho();

            $(`#posicaoPed`).clear()
            $(`#transportadora`).clear()
            $(`#codtransp`).clear()
            $(`#dataNF`).clear()
            $(`#tipoCred`).clear()
            break
    }
}

function DatasetFatores() {
    var dataset = [];

    // Adicionar os registros fixos ao dataset
    dataset.push({ num: "1", Item: "Cod.cli", Campo: "A01_COD_CLI" });
    dataset.push({ num: "2", Item: "CNPJ", Campo: "A02_CGC" });
    dataset.push({ num: "3", Item: "Cliente", Campo: "A03_CLIENTE" });
    dataset.push({ num: "4", Item: "Num.itens", Campo: "A06_NUM_ITENS" });
    dataset.push({ num: "5", Item: "Valor", Campo: "A08_VALOR" });
    dataset.push({ num: "6", Item: "Cond.venda", Campo: "A09_COND_VENDA" });
    dataset.push({ num: "7", Item: "Cod.cobrança", Campo: "A10_COD_COB" });
    dataset.push({ num: "8", Item: "Cobrança", Campo: "A11_COBRANCA" });
    dataset.push({ num: "9", Item: "Cod.PL", Campo: "A12_COD_PL" });
    dataset.push({ num: "10", Item: "Plano", Campo: "A13_PLANO" });
    dataset.push({ num: "11", Item: "Vendedor", Campo: "A20_VENDEDOR" });
    dataset.push({ num: "12", Item: "Supervisor", Campo: "A23_SUPERVISOR" });

    return dataset;
}

function deploy() {
    const PEDIDO = document.getElementById('numped').value;
    const NF = document.getElementById('numNF').value;

    var cPed = DatasetFactory.createConstraint('A04_PEDIDO', PEDIDO, PEDIDO, ConstraintType.MUST);
    var constraintsPed = new Array(cPed);

    var cNF = DatasetFactory.createConstraint('A24_NOTA', NF, NF, ConstraintType.MUST);
    var constraintsNF = new Array(cNF);

    var datasetN = DatasetFactory.getDataset("ds_troca_nf_cab_winthor", null, constraintsNF, null);
    var datasetP = DatasetFactory.getDataset("ds_troca_nf_ped_cab_winthor", null, constraintsPed, null);

    var datasetAcessos = DatasetFatores();

    for (var i = 0; i < datasetAcessos.length; i++) {
        var num = datasetAcessos[i].num;
        var descricao = datasetAcessos[i].Item;
        var fieldName = datasetAcessos[i].Campo
        var fieldValueA = datasetN.values[0][fieldName];
        var fieldValueB = datasetP.values[0][fieldName];

        wdkAddChild('pedido');

        $("#num___" + newId).val(num);
        $("#item___" + newId).val(descricao);
        $("#dadoNF___" + newId).val(fieldValueA);
        $("#dadoPed___" + newId).val(fieldValueB);

        if (fieldValueA !== fieldValueB) {
            // Valores são diferentes, ative o checkbox
            $("#conf___" + newId).prop("checked", true);
            $("#conf___" + newId).closest("tr").find("td").addClass("divergencia");
        }

        if (num == "1") {
            console.log("entrei no 1")
            if (fieldValueA == fieldValueB) {
                $(`#gerente`).val("Sim")
            }
        }
    }

    var cPed = DatasetFactory.createConstraint('A01_PEDIDO', PEDIDO, PEDIDO, ConstraintType.MUST);
    var constraintsPed = new Array(cPed);

    var cNF = DatasetFactory.createConstraint('A02_NOTA', NF, NF, ConstraintType.MUST);
    var constraintsNF = new Array(cNF);

    var datasetN = DatasetFactory.getDataset("ds_troca_nf_nf_winthor", null, constraintsNF, null);
    var datasetP = DatasetFactory.getDataset("ds_troca_nf_ped_winthor", null, constraintsPed, null);

    const SIZENF = datasetN.values.length
    const SIZEPED = datasetP.values.length

    if (SIZENF > SIZEPED) {
        const MAIOR = datasetN.values.length
        const MENOR = datasetP.values.length

        for (var i = 0; i < MAIOR; i++) {

            wdkAddChild('listaitens');

            const A = $("#codNF___" + newId).val(datasetN.values[i].A04_COD_PROD);
            $("#itemNF___" + newId).val(datasetN.values[i].A05_PRODUTO);

            const B = "0"

            if (i < MENOR) {
                const B = $("#codPed___" + newId).val(datasetP.values[i].A03_COD_PROD);
                $("#itemPed___" + newId).val(datasetP.values[i].A04_PRODUTO);
            }

            if (A != B) {
                // Valores são diferentes, ative o checkbox
                $("#conf2___" + newId).prop("checked", true);
                $("#conf2___" + newId).closest("tr").find("td").addClass("divergencia");
            }
        }
    }

    if (SIZENF == SIZEPED) {
        for (var i = 0; i < datasetP.values.length; i++) {

            wdkAddChild('listaitens');

            const A = $("#codPed___" + newId).val(datasetP.values[i].A03_COD_PROD);
            $("#itemPed___" + newId).val(datasetP.values[i].A04_PRODUTO);
            const B = $("#codNF___" + newId).val(datasetN.values[i].A04_COD_PROD);
            $("#itemNF___" + newId).val(datasetN.values[i].A05_PRODUTO);
        }

    } if (SIZENF < SIZEPED) {
        const MENOR = datasetN.values.length
        const MAIOR = datasetP.values.length

        for (var i = 0; i < MAIOR; i++) {

            wdkAddChild('listaitens');

            const A = $("#codPed___" + newId).val(datasetP.values[i].A03_COD_PROD);
            $("#itemPed___" + newId).val(datasetP.values[i].A04_PRODUTO);

            const B = "0"

            if (i < MENOR) {
                const B = $("#codNF___" + newId).val(datasetN.values[i].A04_COD_PROD);
                $("#itemNF___" + newId).val(datasetN.values[i].A05_PRODUTO);

                // if(i>MENOR){
                //     $("#conf2___" + newId).prop("checked", true);
                //     $("#conf2___" + newId).closest("tr").find("td").addClass("divergencia");
                // }
            }

            if (A != B) {
                // Valores são diferentes, ative o checkbox
                $("#conf2___" + newId).prop("checked", true);
                $("#conf2___" + newId).closest("tr").find("td").addClass("divergencia");
            }
        }
    }

    validarDivergencia()
}

function validarDivergencia() {
    const SELECTOR = `:input[id*=conf___]`
    console.log(SELECTOR)

    const STATUS = $(`${SELECTOR}:checked`).length

    if (STATUS) {
        $("#divergencia").val("Sim");
    } else {
        $("#divergencia").val("Não");
        dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: "Não há divergência entre as informações da NF e do pedido. Solicitação será encaminhada para o gerente de vendas para avaliação." });
        $(`#gerente`).val("Sim")
    }

    const SELECTORB = `:input[id*=conf2___]`

    const STATUSB = $(`${SELECTORB}:checked`).length

    if (STATUSB) {
        $("#divergItem").val("Sim");
        dispararAlerta({ icone: "warning", titulo: "Atenção!", mensagem: "Há divergência entre os itens da NF e do pedido. Solicitação será encaminhada para o supervisor para justificativa." });
    } else {
        $("#divergItem").val("Não");
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

function revalidarCamposDivergentes() {
    const SELECTOR = `:input[id*=conf___]`;
    const SELECTOR2 = `:input[id*=conf2___]`;

    $(SELECTOR).each(function () {
        const el = this;
        const DIVERGENCIA = el.checked; // Verifica se o checkbox está marcado

        if (DIVERGENCIA) {
            // Encontre o elemento pai (por exemplo, o <td> que contém o checkbox) e adicione a classe à linha (ou ao elemento que você deseja)
            $(el).closest("tr").addClass("divergencia");
        }
    });

    $(SELECTOR2).each(function () {
        const el = this;
        const DIVERGENCIA = el.checked; // Verifica se o checkbox está marcado

        if (DIVERGENCIA) {
            // Encontre o elemento pai (por exemplo, o <td> que contém o checkbox) e adicione a classe à linha (ou ao elemento que você deseja)
            $(el).closest("tr").addClass("divergencia");
        }
    });
}

function tratarPainel(painel) {
    $('.panel-collapse').not(`#${painel}`).removeClass("in");
    $('.panel-collapse').not(`#${painel}`).addClass("blocked");
}

function updateLED(ledID) {
    $('.led').not(`#${ledID}`).removeClass('ativo').addClass('inativo');
    $(`#${ledID}`).removeClass('inativo').addClass('ativo');
}

function ligarLED(ledID) {
    $('#' + ledID).removeClass('inativo').addClass('ativo');
}

function limparPaiFilho() {
    $(`${TABLE__GRID_ID} .remove-button:gt(0)`).trigger("click")
    $(`${TABLE__GRID_ID2} .remove-button:gt(0)`).trigger("click")
}

function liberacaoCredito() {
    const CREDITO = $(`#tipoCred`).val()

    switch (CREDITO) {
        case "A VISTA":
        case "CARTAO CREDITO":
        case "CARTAO CREDITO 1X":
        case "CARTAO CREDITO 10X":
        case "CARTAO CREDITO 11X":
        case "CARTAO CREDITO 12X":
        case "CARTAO CREDITO 2X":
        case "CARTAO CREDITO 3X":
        case "CARTAO CREDITO 4X":
        case "CARTAO CREDITO 5X":
        case "CARTAO CREDITO 6X":
        case "CARTAO CREDITO 7X":
        case "CARTAO CREDITO 8X":
        case "CARTAO CREDITO 9X":
        case "CARTAO DE DEBITO":
            $(`#responsCred`).val("Melissa Silva")
            $(`#matCred`).val("483")
            break

        default:
            $(`#responsCred`).val("Maisa Rodrigues")
            $(`#matCred`).val("535")
    }
}


function atualizaStatus() {
    $(`#divnumped`).removeClass("blocked")

    const ITEM = document.getElementById('numped').value;
    console.log(ITEM)

    var c2 = DatasetFactory.createConstraint('A04_PEDIDO', ITEM, ITEM, ConstraintType.MUST);
    var constraints = new Array(c2)

    var dataset = DatasetFactory.getDataset("ds_troca_nf_ped_cab_winthor", null, constraints, null);
    console.log(dataset)

    $("#status").val(dataset.values[0].A07_POSICAO);
}