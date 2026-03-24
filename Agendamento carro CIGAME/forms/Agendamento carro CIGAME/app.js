const EVENTO_INICIO = 4
const RETIRADA_CHAVE = 14
const CHECKLIST = 31
const DADOS_KM = 18
const ENTREGA = 34

async function starter() {

    const VENDEDOR = parent.WCMAPI.getUser()

    $(`#vendedor`).val(VENDEDOR)
    console.log(VENDEDOR)

}

function taskHandler() {
    const TASK = Number(getWKNumState())
    console.log(TASK)

    switch (TASK) {

        case 0:
        case EVENTO_INICIO:
            starter()
            deployLastItem()
            tratarPainel("abertura")
            break

        case RETIRADA_CHAVE:
            tratarPainel("entrega")
            break

        case CHECKLIST:
            deployAcessos()
            tratarPainel("entrega")
            break

        case DADOS_KM:
            tratarPainel("devolucao")
            deployAcessos2()
            break

        case DADOS_KM:
            tratarPainel("devolucao")
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
    $(`.js-add`).on("click", e => {
        wdkAddChild(`checklist`)
    })

})

function DatasetFatores() {
    var dataset = [];

    // Adicionar os registros fixos ao dataset
    dataset.push({ Item: "1", Fatores: "Extintor" });
    dataset.push({ Item: "2", Fatores: "Macaco" });
    dataset.push({ Item: "3", Fatores: "Step" });
    dataset.push({ Item: "4", Fatores: "Pneus" });
    dataset.push({ Item: "5", Fatores: "Rádio" });
    dataset.push({ Item: "6", Fatores: "Dano" });
    dataset.push({ Item: "7", Fatores: "Chave de roda" });

    return dataset;
}

function deployAcessos() {

    var nomeDataset = "checklist";
    var dataset = DatasetFatores();

    for (var i = 0; i < dataset.length; i++) {
        wdkAddChild(nomeDataset);

        $("#item___" + newId).val(dataset[i].Item);
        $("#fator___" + newId).val(dataset[i].Fatores);
    }
}

function deployLastItem() {
    var dataset = DatasetFactory.getDataset("ds_agendamento_carro", null, null, null);

    if (dataset && dataset.values.length > 0) {
        // Ordena o dataset pelo campo "kmfinal" em ordem decrescente
        dataset.values.sort(function (a, b) {
            return parseFloat(b.kmfinal) - parseFloat(a.kmfinal);
        });

        // O último registro após a ordenação será o mais recente
        var lastItem = dataset.values[dataset.values.length - 1];
        console.log(lastItem);

        $('#kminicial').val(lastItem.kmfinal);

        // Agora você pode fazer o "deploy" do lastItem
        // Implemente aqui a lógica para realizar o deploy do lastItem
    } else {
        // Caso o dataset esteja vazio
        console.log("Nenhum registro encontrado no dataset.");
    }
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


function deployAcessos2() {

    var nomeDataset = "checklist2";
    var dataset = DatasetFatores();

    for (var i = 0; i < dataset.length; i++) {
        wdkAddChild(nomeDataset);

        $("#item2___" + newId).val(dataset[i].Item);
        $("#fator2___" + newId).val(dataset[i].Fatores);
    }
}