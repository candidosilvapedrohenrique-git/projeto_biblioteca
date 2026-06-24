const API = "http://localhost:3000/categorias"


// Salvar categoria
async function salvarCategoria() {
    const nome_categoria =
        document.getElementById("nome_categoria").value;

    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome_categoria
        })
    });

    const dados = await res.json();

    if (res.ok) {
        alert("Categoria salva com sucesso!");
        listarCategorias();
    } else {
        alert(dados.erro);
    }
}

// Listar categorias
async function listarCategorias() {
    const res = await fetch(API);
    const categorias = await res.json();

    let html = "";

    categorias.forEach(categoria => {
        html += `
            <div class="categoria">
                <strong>ID:</strong> ${categoria.id_categoria}<br>
                <strong>Categoria:</strong> ${categoria.nome_categoria}
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}





