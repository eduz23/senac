const db = require('./db');
const { ipcMain } = require('electron')


async function buscarProfessor() {

    const resultado = await db.query('SELECT * FROM professores order by id')

    return resultado.rows;

}

async function deletarProfessor(event,pId){   
    console.log(event);
    const resultado = await db.query('DELETE FROM professores WHERE ID = $1',[pId]);
    return resultado.rows;

}

async function alterarProfessor(event, idUpdate, nome, cpf) {
    console.log(event)
    const result = await db.query( 'UPDATE public.professores SET nome = $2, cpf = $3 WHERE id = $1', [idUpdate, nome, cpf] )
    return result.rows;
}

async function criarProfessor(event, nome, cpf) {
    console.log(event)
    const result = await db.query('insert into professores (nome, cpf) values ($1, $2)', [nome, cpf])
}


function registrarProfessorHandler() {
    ipcMain.handle('buscar-professores', buscarProfessor);
    ipcMain.handle('deletar-professores', deletarProfessor);
    ipcMain.handle('atualizar-professores', alterarProfessor)
    ipcMain.handle('criar-professores', criarProfessor)
}

module.exports = {
    registrarProfessorHandler
}