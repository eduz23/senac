const db = require('./DB.js');
const { ipcMain } = require('electron');

async function buscarAlunos() {
  const res = await db.query('SELECT * FROM alunos ORDER BY id')
  return res.rows;
}

async function deletarAluno(event, id){
  console.log(event)
  let resultado = await db.query('delete from alunos where id = $1', [id])
  return resultado.rowCount > 0;
}

function registrarAlunoHandler() {
  ipcMain.handle('buscar-alunos', buscarAlunos)
  ipcMain.handle('deletar-aluno', deletarAluno)
}

module.exports = {
  registrarAlunoHandler
}