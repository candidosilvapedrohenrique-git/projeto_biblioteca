const API = "http://localhost:3000/usuarios";

async function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email })
    });

    const dados = await res.json();

    if (res.ok) {
        alert("Usuário salvo com sucesso!");
        limparCamposUsuario();
        listarUsuarios();
    } else {
        alert(dados.erro || "Erro ao salvar usuário");
    }
}

async function listarUsuarios() {
    const res = await fetch(API);
    const usuarios = await res.json();

    let html = "";

    usuarios.forEach(usuario => {
        html += `
            <div class="usuario">
                <strong>ID:</strong> ${usuario.id}<br>
                <strong>Nome:</strong> ${usuario.nome}<br>
                <strong>Email:</strong> ${usuario.email}<br>
                <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}

async function atualizarUsuario() {
    const id = document.getElementById("id_usuario").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!id) {
        alert("Informe o ID do usuário para atualizar.");
        return;
    }

    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email })
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        limparCamposUsuario();
        listarUsuarios();
    } else {
        alert(dados.erro || "Erro ao atualizar usuário");
    }
}

async function excluirUsuario(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        listarUsuarios();
    } else {
        alert(dados.erro || "Erro ao excluir usuário");
    }
}

function limparCamposUsuario() {
    document.getElementById("id_usuario").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}



