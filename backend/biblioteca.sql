CREATE DATABASE biblioteca;
USE biblioteca;

create table if not exists Categorias (
    id_categoria int auto_increment primary key,
    nome_categoria varchar(100)
);

create table if not exists Livros (
    id_livro int auto_increment primary key,
    titulo varchar(100),
    autor varchar(100),
    id_categoria int,
    foreign key (id_categoria) references Categorias(id_categoria)
);

create table if not exists Usuarios (
    id_usuario int auto_increment primary key,
    nome varchar(100),
    email varchar(100)
);

create table if not exists Emprestimos (
    id_emprestimos int auto_increment primary key,
    id_livro int,
    id_usuario int,
    data_saida date,
    data_prevista_devolucao date,
    data_real_devolucao date,
    foreign key (id_livro) references Livros(id_livro),
    foreign key (id_usuario) references Usuarios(id_usuario)
);