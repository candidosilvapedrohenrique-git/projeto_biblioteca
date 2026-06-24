-- =====================================================
-- BANCO DE DADOS: BIBLIOTECA

-- TABELA DE CATEGORIAS
-- Armazena os gêneros ou categorias dos livros.
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL UNIQUE
);

-- TABELA DE LIVROS
-- Cada livro pertence a uma categoria.
CREATE TABLE Livros (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    id_categoria INT NOT NULL,

    FOREIGN KEY (id_categoria)
        REFERENCES Categorias(id_categoria)
);

-- TABELA DE USUÁRIOS
-- Armazena os dados dos usuários da biblioteca.
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- TABELA DE EMPRÉSTIMOS
-- Registra quais livros foram emprestados para quais usuários.
CREATE TABLE Emprestimos (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,

    id_livro INT NOT NULL,
    id_usuario INT NOT NULL,

    data_saida DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_real_devolucao DATE,

    FOREIGN KEY (id_livro)
        REFERENCES Livros(id_livro),

    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
);

-- =====================================================
-- REGRAS DE NEGÓCIO
-- =====================================================
--
-- 1. Cada livro deve pertencer a uma categoria.
-- 2. Um usuário pode realizar vários empréstimos.
-- 3. Um usuário pode emprestar o mesmo livro novamente
--    após devolvê-lo.
-- 4. O e-mail de cada usuário deve ser único.
-- 5. Não podem existir categorias com nomes repetidos.
-- 6. Um livro não deve estar emprestado para duas pessoas
--    ao mesmo tempo (essa regra deve ser validada pela
--    aplicação ou por consultas antes de registrar
--    um novo empréstimo).
--
-- Exemplo de verificação:
--
-- SELECT *
-- FROM Emprestimos
-- WHERE id_livro = 1
--   AND data_real_devolucao IS NULL;
--
-- Se a consulta retornar um registro, o livro ainda
-- está emprestado e não pode ser emprestado novamente.
--
-- =====================================================
