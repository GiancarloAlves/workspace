let urlAPI = 'https://fluig.cigame.com.br/api/public/ecm/dataset/availableDatasets'
const select = document.querySelector('#optionDataSet')

async function listarDatasets() {
    try {
        const response = await fetch(urlAPI)
        const datasets = await response.json()
        const option = document.querySelector('#teste1').val('teste')

        select.value = datasets.content[0]
        window.prompt(option)

    } catch (error) {
        throw new Exception(err)
    }
}

$(document).ready(function () {
    listarDatasets()
})
