const API = "http://localhost:3000/usuario"



// Salvar usuário
async function salvarUsuario() {
const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;


const res = await fetch(API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome,
        email
    })
});

const dados = await res.json();

if (res.ok) {
    alert("Usuário salvo com sucesso!");
    listarUsuarios();
} else {
    alert(dados.erro);
}


}

// Listar usuários
async function listarUsuarios() {
const res = await fetch(API);
const usuarios = await res.json();


let html = "";

usuarios.forEach(usuario => {
    html += `
        <div class="usuario">
            <strong>ID:</strong> ${usuario.id}<br>
            <strong>Nome:</strong> ${usuario.nome}<br>
            <strong>Email:</strong> ${usuario.email}
        </div>
    `;
});

document.getElementById("resultado").innerHTML = html;

}



