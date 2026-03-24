function beforeCancelProcess(colleagueId, processId) {
    // ID do usuário que pode cancelar o processo
    var allowedUserId = "Administrador"; // Substitua pelo ID correto
    
    // Verifica o ID do usuário atual
    if (colleagueId !== allowedUserId) {
        throw("Você não tem permissão para cancelar este processo.");
    }
}