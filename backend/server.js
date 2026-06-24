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


app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

//get listar livros
app.get("/livros", (req, res) => {
    db.all("SELECT id_livro AS id, titulo, autor, id_categoria FROM Livros", [], (err, rows) => {
        if (err) {
            console.log("Erro SELECT:", err.message);
            return res.status(500).json({
                erro: err.message
            });
        }

        res.status(200).json(rows);
    });
});


//get buscar livro por id
app.get("/livros/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT id_livro AS id, titulo, autor, id_categoria FROM Livros WHERE id_livro = ?",
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


//post criar livro
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



//put atualizar livro
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
         WHERE id_livro = ?`,
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


//delete excluir livro
app.delete("/livros/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM Livros WHERE id_livro = ?",
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




//get listar categorias
app.get("/categorias", (req, res) => {
    db.all("SELECT id_categoria, nome_categoria FROM Categorias", [], (err, rows) => {
        if (err) {
            console.log("Erro SELECT:", err.message);
            return res.status(500).json({
                erro: err.message
            });
        }

        res.status(200).json(rows);
    });
});


//get buscar categoria por id
app.get("/categorias/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT id_categoria, nome_categoria FROM Categorias WHERE id_categoria = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }

            res.status(200).json(row);
        }
    );
});


//post criar categoria
app.post("/categorias", (req, res) => {
    const { nome_categoria } = req.body;

    if (!nome_categoria) {
        return res.status(400).json({
            erro: "Nome da categoria é obrigatório"
        });
    }

    db.run(
        "INSERT INTO Categorias (nome_categoria) VALUES (?)",
        [nome_categoria],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.status(201).json({
                mensagem: "Categoria criada com sucesso",
                id_categoria: this.lastID
            });
        }
    );
});


//put atualizar categoria
app.put("/categorias/:id", (req, res) => {
    const { id } = req.params;
    const { nome_categoria } = req.body;

    if (!nome_categoria) {
        return res.status(400).json({
            erro: "Nome da categoria é obrigatório"
        });
    }

    db.run(
        `UPDATE Categorias
         SET nome_categoria = ?
         WHERE id_categoria = ?`,
        [nome_categoria, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }

            res.status(200).json({
                mensagem: "Categoria atualizada com sucesso"
            });
        }
    );
});


//delete excluir categoria
app.delete("/categorias/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM Categorias WHERE id_categoria = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }

            res.status(200).json({
                mensagem: "Categoria removida com sucesso"
            });
        }
    );
});



//get listar usuários
app.get("/usuarios", (req, res) => {
    db.all("SELECT id_usuario AS id, nome, email FROM Usuarios", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        res.status(200).json(rows);
    });
});


//get  busca usuário por id
app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT id_usuario AS id, nome, email FROM Usuarios WHERE id_usuario = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            res.status(200).json(row);
        }
    );
});

//post criar usuário
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios"
        });
    }


    db.get(
        "SELECT * FROM Usuarios WHERE email = ?",
        [email],
        (err, row) => {
            if (row) {
                return res.status(400).json({
                    erro: "Este email já está cadastrado"
                });
            }

            db.run(
                "INSERT INTO Usuarios (nome, email) VALUES (?, ?)",
                [nome, email],
                function (err) {
                    if (err) {
                        return res.status(500).json({ erro: err.message });
                    }

                    res.status(201).json({
                        mensagem: "Usuário criado com sucesso",
                        id: this.lastID
                    });
                }
            );
        }
    );
});


//put atualizar usuário
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios"
        });
    }

    db.run(
        `UPDATE Usuarios
     SET nome = ?, email = ?
     WHERE id_usuario = ?`,
        [nome, email, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Usuário atualizado com sucesso"
            });
        }
    );
});


//delete remove usuário
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM Usuarios WHERE id_usuario = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Usuário removido com sucesso"
            });
        }
    );
});




//get listar empréstimos
app.get("/emprestimos", (req, res) => {
    db.all("SELECT id_emprestimo AS id, id_livro, id_usuario, data_saida, data_prevista_devolucao, data_real_devolucao FROM Emprestimos", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }

        res.status(200).json(rows);
    });
});


//get lista empréstimo por id
app.get("/emprestimos/:id", (req, res) => {
    const { id } = req.params;

    db.get(
        "SELECT id_emprestimo AS id, id_livro, id_usuario, data_saida, data_prevista_devolucao, data_real_devolucao FROM Emprestimos WHERE id_emprestimo = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Empréstimo não encontrado"
                });
            }

            res.status(200).json(row);
        }
    );
});


//post cria emprestimo
app.post("/emprestimos", (req, res) => {
    const {
        id_livro,
        id_usuario,
        data_saida,
        data_prevista_devolucao,
        data_real_devolucao
    } = req.body;

    if (
        !id_livro ||
        !id_usuario ||
        !data_saida ||
        !data_prevista_devolucao
    ) {
        return res.status(400).json({
            erro: "Preencha todos os campos obrigatórios"
        });
    }

    db.run(
        `INSERT INTO Emprestimos
    (
        id_livro,
        id_usuario,
        data_saida,
        data_prevista_devolucao,
        data_real_devolucao
    )
    VALUES (?, ?, ?, ?, ?)`,
        [
            id_livro,
            id_usuario,
            data_saida,
            data_prevista_devolucao,
            data_real_devolucao
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            res.status(201).json({
                mensagem: "Empréstimo cadastrado com sucesso",
                id: this.lastID
            });
        }
    );
});


//put atualizar empréstimo
app.put("/emprestimos/:id", (req, res) => {
    const { id } = req.params;

    const {
        id_livro,
        id_usuario,
        data_saida,
        data_prevista_devolucao,
        data_real_devolucao
    } = req.body;

    if (
        !id_livro ||
        !id_usuario ||
        !data_saida ||
        !data_prevista_devolucao
    ) {
        return res.status(400).json({
            erro: "Preencha todos os campos obrigatórios"
        });
    }

    db.run(
        `UPDATE Emprestimos
     SET
        id_livro = ?,
        id_usuario = ?,
        data_saida = ?,
        data_prevista_devolucao = ?,
        data_real_devolucao = ?
     WHERE id_emprestimo = ?`,
        [
            id_livro,
            id_usuario,
            data_saida,
            data_prevista_devolucao,
            data_real_devolucao,
            id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Empréstimo não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Empréstimo atualizado com sucesso"
            });
        }
    );
});


// delete remove empréstimo
app.delete("/emprestimos/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM Emprestimos WHERE id_emprestimo = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Empréstimo não encontrado"
                });
            }

            res.status(200).json({
                mensagem: "Empréstimo removido com sucesso"
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