const {contextBridge, ipcRenderer} = require('electron');

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function deletarAluno(id) {
    return ipcRenderer.invoke('deletar-aluno', id);
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        deletarAluno: deletarAluno,
        buscarAlunos: buscarAlunos
    }

)