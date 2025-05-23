const tabelaProfessor = document.getElementById('professoresTableDados');
const modalNomeProfessor = document.getElementById('professor-nome');
const modalCpfProfessor = document.getElementById('professor-cpf');
const modalIDProfessor = document.getElementById('professor-id');

const botaoExcluir = document.getElementById('btn-excluir');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoLimpar = document.getElementById('btn-limpar');

botaoExcluir.addEventListener("click", excluirProfessor)
botaoSalvar.addEventListener("click", verificarCampos)
botaoLimpar.addEventListener("click", limparCampos)


function mostrarDetalhes(id, cpf, nome){    
    modalIDProfessor.value = id;
    modalCpfProfessor.value = cpf;
    modalNomeProfessor.value = nome ;
}

async function criarLinhaProfessor(professor){

    let linha = document.createElement('tr')

    let celulaNome = document.createElement('td')
    celulaNome.textContent = professor.nome
    linha.appendChild(celulaNome)

    let celulaCPF = document.createElement('td')
    celulaCPF.textContent = professor.cpf
    linha.appendChild(celulaCPF)

    let celulaBotao = document.createElement('td')
    let botao = document.createElement('button')
    botao.addEventListener("click", function () {mostrarDetalhes(professor.id, professor.cpf, professor.nome)})

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao)

    linha.appendChild(celulaBotao)

    tabelaProfessor.appendChild(linha)

}

async function carregarProfessor(){

    
    const listaProfessores = await window.senacAPI.buscarProfessor();
    tabelaProfessor.innerHTML = "";

    listaProfessores.forEach(criarLinhaProfessor)

    if (! listaProfessores.length > 0 ){

        tabelaProfessor.textContent ="sem dados"
    }
    
    lucide.createIcons();

}

async function excluirProfessor(){
    const pID = modalIDProfessor.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.excluirProfessor(pID);
    
    modalIDProfessor.value = ''
    modalCpfProfessor.value = ''
    modalNomeProfessor.value = ''

    carregarProfessor();
}

async function atualizarProfessor(){
    const idUpdate = modalIDProfessor.value
    const nomeUpdate = modalNomeProfessor.value
    const cpfUpdate = modalCpfProfessor.value

    const atualizar = await window.senacAPI.alterarAluno(idUpdate, nomeUpdate, cpfUpdate)

    carregarProfessor()
}

async function criarProfessor() {
    const nome = modalNomeProfessor.value
    const cpf = modalCpfProfessor.value

    await window.senacAPI.criarProfessor(nome, cpf)

    carregarProfessor()
}

async function verificarCampos(){
    let cpf = modalCpfProfessor.value
    let nome = modalNomeProfessor.value

    if(!cpf || !nome){
        console.log('Preencha todos os campos')
    }
    else{
        atualizarEAlterar()
    }

}

async function atualizarEAlterar(){
    let id = modalIDProfessor.value

    if(id){
        await atualizarProfessor()
    }

    else{
        await criarProfessor()
    }
}

async function limparCampos(){
    modalIDProfessor.value = ''
    modalCpfProfessor.value = ''
    modalNomeProfessor.value = ''
}

carregarProfessor()