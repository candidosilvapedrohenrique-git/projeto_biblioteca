const API = "http://localhost:3000/livros";

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
        limparCamposLivro();
        listarLivros();
    } else {
        alert(dados.erro || "Erro ao salvar livro");
    }
}

async function listarLivros() {
    const res = await fetch(API);
    const livros = await res.json();

    let html = "";

    livros.forEach(livro => {
        html += `
            <div class="livro">
                <strong>ID:</strong> ${livro.id}<br>
                <strong>Título:</strong> ${livro.titulo}<br>
                <strong>Autor:</strong> ${livro.autor}<br>
                <strong>Categoria:</strong> ${livro.id_categoria}<br>
                <button onclick="excluirLivro(${livro.id})">Excluir</button>
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}

async function atualizarLivro() {
    const id = document.getElementById("id_livro").value;
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const id_categoria = document.getElementById("id_categoria").value;

    if (!id) {
        alert("Informe o ID do livro para atualizar.");
        return;
    }

    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ titulo, autor, id_categoria })
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        limparCamposLivro();
        listarLivros();
    } else {
        alert(dados.erro || "Erro ao atualizar livro");
    }
}

async function excluirLivro(id) {
    if (!confirm("Deseja realmente excluir este livro?")) return;

    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        listarLivros();
    } else {
        alert(dados.erro || "Erro ao excluir livro");
    }
}

function limparCamposLivro() {
    document.getElementById("id_livro").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("id_categoria").value = "";
}

