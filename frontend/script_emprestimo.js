const API = "http://localhost:3000/emprestimos";

async function salvarEmprestimo() {
    const id_livro = document.getElementById("id_livro").value;
    const id_usuario = document.getElementById("id_usuario").value;
    const data_saida = document.getElementById("data_saida").value;
    const data_prevista_devolucao = document.getElementById("data_prevista_devolucao").value;
    const data_real_devolucao = document.getElementById("data_real_devolucao").value;

    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_livro,
            id_usuario,
            data_saida,
            data_prevista_devolucao,
            data_real_devolucao
        })
    });

    const dados = await res.json();

    if (res.ok) {
        alert("Empréstimo salvo com sucesso!");
        limparCamposEmprestimo();
        listarEmprestimos();
    } else {
        alert(dados.erro || "Erro ao salvar empréstimo");
    }
}

async function listarEmprestimos() {
    const res = await fetch(API);
    const emprestimos = await res.json();

    let html = "";

    emprestimos.forEach(emprestimo => {
        html += `
            <div class="emprestimo">
                <strong>ID:</strong> ${emprestimo.id}<br>
                <strong>ID Livro:</strong> ${emprestimo.id_livro}<br>
                <strong>ID Usuário:</strong> ${emprestimo.id_usuario}<br>
                <strong>Data Saída:</strong> ${emprestimo.data_saida}<br>
                <strong>Data Prevista:</strong> ${emprestimo.data_prevista_devolucao}<br>
                <strong>Data Devolução:</strong> ${emprestimo.data_real_devolucao || "Não devolvido"}<br>
                <button onclick="excluirEmprestimo(${emprestimo.id})">Excluir</button>
            </div>
        `;
    });

    document.getElementById("resultado").innerHTML = html;
}

async function atualizarEmprestimo() {
    const id = document.getElementById("id_emprestimo").value;
    const id_livro = document.getElementById("id_livro").value;
    const id_usuario = document.getElementById("id_usuario").value;
    const data_saida = document.getElementById("data_saida").value;
    const data_prevista_devolucao = document.getElementById("data_prevista_devolucao").value;
    const data_real_devolucao = document.getElementById("data_real_devolucao").value;

    if (!id) {
        alert("Informe o ID do empréstimo para atualizar.");
        return;
    }

    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_livro,
            id_usuario,
            data_saida,
            data_prevista_devolucao,
            data_real_devolucao
        })
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        limparCamposEmprestimo();
        listarEmprestimos();
    } else {
        alert(dados.erro || "Erro ao atualizar empréstimo");
    }
}

async function excluirEmprestimo(id) {
    if (!confirm("Deseja realmente excluir este empréstimo?")) return;

    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    const dados = await res.json();

    if (res.ok) {
        alert(dados.mensagem);
        listarEmprestimos();
    } else {
        alert(dados.erro || "Erro ao excluir empréstimo");
    }
}

function limparCamposEmprestimo() {
    document.getElementById("id_emprestimo").value = "";
    document.getElementById("id_livro").value = "";
    document.getElementById("id_usuario").value = "";
    document.getElementById("data_saida").value = "";
    document.getElementById("data_prevista_devolucao").value = "";
    document.getElementById("data_real_devolucao").value = "";
}
