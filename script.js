const API_URL = "https://app07-o5vs.onrender.com/produtos/";

const lista = document.getElementById("lista-produtos");

// ---------------------------------------------------------------
// LISTAR ou PESQUISAR PRODUTOS
// ---------------------------------------------------------------
async function carregarProdutos(nome = "") {

    try {
        let url = API_URL;

        //Se houver um nome, utilizar a rota de pesquisa
        if (nome.trim() !== "") {
            url += "buscar?nome=" + encodeURIComponent(nome);
        }

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar produtos.");
        }

        const dados = await resposta.json();

        lista.innerHTML = "";

        if (dados.length === 0) {
            lista.innerHTML = "<tr><td colspan='3'>Nenhum produto encontrado</td></tr>";
            return;
        }

        dados.forEach((p) => {
            const li = document.createElement("tr");
            li.innerHTML = `
                <td style='width:60%'>${p.nome} </td> 
                <td style='width:30%'>
                    R$ ${p.preco.toFixed(2)}
                </td>
                <td style='width:10%'>
                <button onclick="removerProduto(${p.id})" class="btn-excluir">
                    Excluir 
                </button></td>`;
            lista.appendChild(li);
        });

    }catch(erro){
        alert(erro.message);
    }

}

//carregar produtos inicialmente
carregarProdutos();

// ---------------------------------------------------------------
// Adicionar Produto
// ---------------------------------------------------------------
const btnAdicionar = document.getElementById('btn-adicionar');
btnAdicionar.addEventListener('click', adicionarProduto);

async function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, preco }),
    });

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";

    alert("Produto adicionado com sucesso!");

    carregarProdutos();
}

// ---------------------------------------------------------------
// Remover Produto
// ---------------------------------------------------------------
async function removerProduto(id) {
    await fetch(API_URL + id, { method: "DELETE" });
    alert("Produto apagado com sucesso!");
    carregarProdutos();
}

// ---------------------------------------------------------------
// Pesquisar Produto
// ---------------------------------------------------------------
const btnPesquisar = document.getElementById('btn-pesquisar');
btnPesquisar.addEventListener('click', pesquisarProduto);

async function pesquisarProduto(){
    const nome = document.getElementById("pesquisa").value;
    if (nome.trim()===""){
        alert("Informe o nome do produto para pesquisar");
        return;
    }
    carregarProdutos();
}

// ---------------------------------------------------------------
// Limpar Pesquisa
// ---------------------------------------------------------------
const btnLimpar = document.getElementById('btn-limpar');
btnLimpar.addEventListener('click', limparPesquisa);

async function limparPesquisa(){
    document.getElementById("pesquisa").value = "";
    carregarProdutos();
}