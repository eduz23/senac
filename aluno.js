const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('tbodyAluno');
const modalNomeAluno = document.getElementById('nomeAluno');
const modalMatriculaAluno = document.getElementById('matriculaAluno');
const modalIdAluno = document.getElementById('idAluno');

const botaoExcluir = document.getElementById('btnExcluir')
botaoExcluir.addEventListener('click', excluirAluno)


async function excluirAluno() {
    let id = modalIdAluno.value
    console.log('Vou deletar o id', id)
    let retorno = await window.senacAPI.deletarAluno(id)
}

async function carregarAlunos() {

    let listaAlunos = await window.senacAPI.buscarAlunos();

    listaAlunos.forEach(criarLinhaAluno);

    lucide.createIcons()
}

function criarLinhaAluno(aluno){
   // paragrafo.textContent = paragrafo.textContent + aluno.nome
    
    let linha = document.createElement('tr')
    
    let celulaNome = document.createElement('td')
    celulaNome.textContent = aluno.nome
    linha.appendChild(celulaNome)

    let celulaMatricula = document.createElement('td')
    celulaMatricula.textContent = aluno.matricula
    linha.appendChild(celulaMatricula)

    let celulaBotao = document.createElement('td')
    let botao = document.createElement('button')
    botao.addEventListener('click',
         function () {mostrarDetalhes(aluno.nome, aluno.matricula, aluno.id) }

    )


    celulaBotao.appendChild(botao)
    linha.appendChild(celulaBotao)

    let icone = document.createElement('i')
    icone.setAttribute('data-lucide', 'edit')
    botao.appendChild(icone)

    tabelaAluno.appendChild(linha)

}

function mostrarDetalhes(nome, matricula, id){
    console.log('nome:', nome, 'matricula:', matricula, 'id:', id)
    modalIdAluno.value = id
    modalNomeAluno.value = nome
    modalMatriculaAluno.value = matricula
}

carregarAlunos()