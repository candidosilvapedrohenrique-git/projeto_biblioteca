const API = "http://localhost:3000/livros"

// Salvar livro
async function salvarLivro() {
const titulo = document.getElementById("titulo").value;
const autor = document.getElementById("autor").value;
const id_categoria = document.getElementById("id_categoria").value;

const res = await fetch(API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        titulo,
        autor,
        id_categoria
    })
});

const dados = await res.json();

if (res.ok) {
    alert("Livro salvo com sucesso!");
    listarLivros();
} else {
    alert("Erro: " + dados.erro);
}


}

// Listar livros
async function listarLivros() {
const res = await fetch(API);
const livros = await res.json();


let html = "";

livros.forEach(livro => {
    html += `
        <p>
            ID: ${livro.id} |
            Título: ${livro.titulo} |
            Autor: ${livro.autor} |
            Categoria: ${livro.id_categoria}
        </p>
    `;
});

document.getElementById("resultado").innerHTML = html;


}

// Excluir livro
async function excluirLivro(id) {
const res = await fetch(`${API}/${id}`, {
method: "DELETE"
});


const dados = await res.json();

if (res.ok) {
    alert(dados.mensagem);
    listarLivros();
} else {
    alert(dados.erro);
}


}

