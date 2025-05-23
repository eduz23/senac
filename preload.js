const { contextBridge, ipcRenderer } = require('electron')

//Funções para alunos

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
}

function alterarAluno(idUpdate, matricula, nome){
    console.log('passei aqui')
    return ipcRenderer.invoke('atualizar-alunos', idUpdate, matricula, nome)
}

function criarAluno(nome, matricula){
    return ipcRenderer.invoke('criar-alunos', nome, matricula)
}

// Funções para professores

function buscarProfessor() {
    return ipcRenderer.invoke('buscar-professores');
}

function excluirProfessor(pID){
    return ipcRenderer.invoke('deletar-professores',pID);
}

function alterarProfessor(idUpdate, cpf, nome){
    return ipcRenderer.invoke('atualizar-professores', idUpdate, cpf, nome)
}

function criarProfessor(nome, cpf){
    return ipcRenderer.invoke('criar-professores', nome, cpf)
}

contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        alterarAluno: alterarAluno,
        criarAluno: criarAluno,
        buscarProfessor: buscarProfessor,
        excluirProfessor: excluirProfessor,
        alterarProfessor: alterarProfessor,
        criarProfessor: criarProfessor
    }


)
