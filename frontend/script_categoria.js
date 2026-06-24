const API = "http://localhost:3000/categorias";

async function salvarCategoria() {
    const nome_categoria = document.getElementById("nome_categoria").value;

    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome_categoria })
    });

    const dados = await res.json();

    if (res.ok) {
        alert("Categoria salva com sucesso!");
        limparCamposCategoria();
        listarCategorias();
    } else {
        alert(dados.erro || "Erro ao salvar categoria");
    }
}

async function listarCategorias() {
    const res = await fetch(API);
    const categorias = await res.json();

    let html = "";

    categorias.forEach(categoria => {
        html += `
            <div class="categoria">
                <strong>ID:</strong> ${categoria.id_categoria}<br>
                <strong>Categoria:</strong> ${categoria.nome_categoria}<br>
                <button onclick="excluirCategoria(${categoria.id_categoria})">Excluir</button>
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}

async function atualizarCategoria() {
    const id = document.getElementById("id_categoria").value;
    const nome_categoria = document.getElementById("nome_categoria").value;

    if (!id) {
        alert("Informe o ID da categoria para atualizar.");
        return;
    }

    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome_categoria })
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        limparCamposCategoria();
        listarCategorias();
    } else {
        alert(dados.erro || "Erro ao atualizar categoria");
    }
}

async function excluirCategoria(id) {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;

    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        listarCategorias();
    } else {
        alert(dados.erro || "Erro ao excluir categoria");
    }
}

function limparCamposCategoria() {
    document.getElementById("id_categoria").value = "";
    document.getElementById("nome_categoria").value = "";
}





