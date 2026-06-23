// Importações
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

// Cria aplicação
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com banco
const db = new sqlite3.Database(
    path.join(__dirname, "banco.db"),
    
);

// ======================
// GET - Listar livros
// ======================
app.get("/livros", (req, res) => {
    db.all("SELECT * FROM Livros", [], (err, rows) => {
        if (err) {
            console.log("Erro SELECT:", err.message);
            return res.status(500).json({
                erro: err.message
            });
        }

        res.status(200).json(rows);
    });
});

// ======================
// GET - Buscar livro por ID
// ======================
app.get("/livros/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT * FROM Livros WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                console.log("Erro SELECT:", err.message);
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Livro não encontrado"
                });
            }

            res.status(200).json(row);
        }
    );
});

// ======================
// POST - Criar livro
// ======================
app.post("/livros", (req, res) => {
    const { titulo, autor, id_categoria } = req.body;

    if (!titulo || !autor || !id_categoria) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    db.run(
        "INSERT INTO Livros (titulo, autor, id_categoria) VALUES (?, ?, ?)",
        [titulo, autor, id_categoria],
        function (err) {
            if (err) {
                console.log("Erro INSERT:", err.message);
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.status(201).json({
                mensagem: "Livro criado com sucesso",
                id: this.lastID
            });
        }
    );
});

// ======================
// PUT - Atualizar livro
// ======================
app.put("/livros/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, autor, id_categoria } = req.body;

    if (!titulo || !autor || !id_categoria) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    db.run(
        `UPDATE Livros
         SET titulo = ?, autor = ?, id_categoria = ?
         WHERE id = ?`,
        [titulo, autor, id_categoria, id],
        function (err) {
            if (err) {
                console.log("Erro UPDATE:", err.message);
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Livro não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Livro atualizado com sucesso"
            });
        }
    );
});


// DELETE - Excluir livro
app.delete("/livros/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM Livros WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                console.log("Erro DELETE:", err.message);
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Livro não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Livro removido com sucesso"
            });
        }
    );
});

// Inicia servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

// Mostra caminho do banco
console.log(
    "DB PATH:",
    path.join(__dirname, "banco.db")
);