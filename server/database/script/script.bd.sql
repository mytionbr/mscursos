/*
    CREATE DATABASE dbadminschool WITH ENCODING 'UTF8';
*/
CREATE TABLE IF NOT EXISTS aluno(
    aluno_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    CONSTRAINT email_unique_aluno UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS professor(
    professor_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    CONSTRAINT email_unique_professor UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS categoria (
    categoria_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS curso (
    curso_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao TEXT NOT NULL,
    professor_id INT,
    categoria_id INT,
    CONSTRAINT nome_curso UNIQUE (nome)
);

CREATE TABLE IF NOT EXISTS aula (
    aula_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao VARCHAR (255) NOT NULL,
    curso_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS curso_aluno (
    curso_id INT NOT NULL,
    aluno_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS nota (
    nota_id serial PRIMARY KEY,
    valor FLOAT NOT NULL,
    aprovado BOOLEAN NOT NULL,
    curso_id INT NOT NULL,
    aluno_id INT NOT NULL
);

ALTER TABLE curso_aluno ADD CONSTRAINT curso_aluno_aluno_id_fkey
	FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE curso_aluno ADD CONSTRAINT curso_aluno_curso_id_fkey
	FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE curso ADD CONSTRAINT curso_professor_id_fkey 
    FOREIGN KEY (professor_id) REFERENCES professor (professor_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE curso ADD CONSTRAINT curso_categoria_id_fkey 
    FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE nota ADD CONSTRAINT nota_curso_id_fkey 
    FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE nota ADD CONSTRAINT nota_aluno_id_fkey 
    FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE aula ADD CONSTRAINT aula_curso_id_fkey 
    FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE CASCADE;