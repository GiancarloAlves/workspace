// CONSTANTES GLOBAIS
const EVENTO_INICIO = 1
const TASK_VALUES =
    [
        3, 5, 7, 12, 17, 19, 21, 23, 25, 27, 29, 31,
        33, 35, 37, 39, 41, 43, 47, 50, 52, 54, 56, 58,
        62, 64, 67, 69, 73, 76, 80, 83, 85, 87, 89,
        91, 93, 95, 99, 102, 104, 106, 108, 110, 112, 114,
        116, 118, 120
    ]

const CHECKS = {}
TASK_VALUES.forEach((value, index) => {
    CHECKS[`CHECK${index + 1}`] = value
})

function taskHandler() {
    const TASK = Number(getWKNumState())

    switch (TASK) {
        case 0:
        case EVENTO_INICIO:
            break

        case TASK:
            $(`#check${TASK}`).removeClass("blocked")
            break
    }
}

$(document).ready(() => {
    taskHandler()
})
