/*
    CREATE DATABASE dbadminschool WITH ENCODING 'UTF8';
*/
CREATE TABLE IF NOT EXISTS aluno(
    aluno_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS professor(
    professor_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS curso (
    curso_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao TEXT NOT NULL,
    professor_id INT,
    CONSTRAINT nome UNIQUE (nome),
    FOREIGN KEY (professor_id)
        REFERENCES professor
);

CREATE TABLE IF NOT EXISTS aula (
    aula_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao VARCHAR (255) NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (curso_id)
        REFERENCES curso
);

CREATE TABLE IF NOT EXISTS curso_aluno (
    curso_id INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (curso_id)
        REFERENCES curso,
    FOREIGN KEY (aluno_id)
        REFERENCES aluno
);

CREATE TABLE IF NOT EXISTS nota (
    nota_id serial PRIMARY KEY,
    valor FLOAT NOT NULL,
    aprovado BOOLEAN NOT NULL,
    curso_id INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (curso_id)
        REFERENCES curso,
    FOREIGN KEY (aluno_id)
        REFERENCES aluno
);



