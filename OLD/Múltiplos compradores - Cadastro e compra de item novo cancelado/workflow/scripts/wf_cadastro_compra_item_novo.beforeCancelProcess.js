function beforeCancelProcess(colleagueId, processId) {
    // Verifique se o usuário atual (colleagueId) é igual a 209
    if (colleagueId == 209) {
        // Permite que o processo seja cancelado
        return true;
    } else {
        // Impede que o processo seja cancelado
        throw "Apenas o usuário Maicon Conceição pode cancelar este processo.";
    }
}
