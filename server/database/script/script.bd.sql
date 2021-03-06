/*
    CREATE DATABASE dbmscursos WITH ENCODING 'UTF8';
*/
CREATE TABLE IF NOT EXISTS aluno(
    aluno_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    data_criacao DATE NOT NULL,
    data_update DATE NOT NULL,
    CONSTRAINT email_unique_aluno UNIQUE (email),
    CONSTRAINT cpf_unique_aluno UNIQUE (cpf)
);

CREATE TABLE IF NOT EXISTS professor(
    professor_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    data_nascimento date NOT NULL,
    senha VARCHAR (255) NOT NULL,
    descricao TEXT,
    CONSTRAINT email_unique_professor UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS plano(
    plano_id serial PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria (
    categoria_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    plano_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS curso (
    curso_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao TEXT NOT NULL,
    professor_id INT,
    categoria_id INT,
    data_atualizacao DATE NOT NULL,
    data_criacao DATE NOT NULL,
    resumo TEXT,
    slug VARCHAR(255) not null,
    CONSTRAINT nome_curso UNIQUE (nome),
    CONSTRAINT slug_curso UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS aula (
    aula_id serial PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    descricao VARCHAR (255) NOT NULL,
    curso_id INT NOT NULL,
    duracao INT NOT NULL,
    slug VARCHAR (255) NOT NULL,
    video VARCHAR(255),
    CONTEUDO TEXT
);

CREATE TABLE IF NOT EXISTS matricula  (
	matricula_id SERIAL PRIMARY KEY,
	aluno_id INT NOT NULL,
	curso_id INT NOT NULL,
	data_criacao timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS nota (
    nota_id serial PRIMARY KEY,
    valor FLOAT NOT NULL,
    aprovado BOOLEAN NOT NULL,
    curso_id INT NOT NULL,
    aluno_id INT NOT NULL
);



CREATE TABLE IF NOT EXISTS pagamento(
	pagamento_id serial PRIMARY KEY,
	status VARCHAR(255) NOT NULL,
	update_time date not NULL,
	email VARCHAR(255) NOT NULL,
    payment_response_id VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS assinatura(
	assinatura_id serial PRIMARY KEY,
	pago BOOLEAN NOT NULL,
	data_criacao DATE,
	preco FLOAT NOT NULL,
	plano_id INT NOT NULL,
	aluno_id INT NOT NULL,
    pagamento_id INT
);

CREATE TABLE IF NOT EXISTS avaliacao(
	avaliacao_id serial PRIMARY KEY,
	valor INT NOT NULL,
	comentario TEXT NOT NULL,
	data_criacao DATE NOT NULL,
	aluno_id INT NOT NULL,
	curso_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS visualizacao(
	visualizacao_id serial PRIMARY KEY,
	aluno_id INT NOT NULL,
	aula_id INT NOT NULL,
	data_criacao DATE NOT NULL,
    CURSO_ID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
    post_id serial PRIMARY KEY,
    titulo VARCHAR (255) NOT NULL,
    conteudo TEXT,
    solucionado BOOLEAN NOT NULL,
    slug VARCHAR (255) NOT NULL,
	categoria_id int NOT NULL,
	curso_id int, 
	aluno_id int NOT NULL,
	data_criacao TIMESTAMP NOT NULL,
	data_atualizacao TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS resposta (
    resposta_id serial PRIMARY KEY,
	conteudo TEXT NOT NULL,
	data_criacao TIMESTAMP NOT NULL,
	data_atualizacao TIMESTAMP NOT NULL,
	solucao BOOLEAN NOT NULL,
	post_id int not null,
	aluno_id int,
	professor_id int
);

ALTER TABLE assinatura ADD CONSTRAINT assinatura_plano_id_fkey
	FOREIGN KEY (plano_id) REFERENCES plano (plano_id);
	
ALTER TABLE assinatura ADD CONSTRAINT assinatura_aluno_id_fkey
	FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id);

ALTER TABLE assinatura ADD CONSTRAINT assinatura_pagamento_id_fkey
	FOREIGN KEY (pagamento_id) REFERENCES pagamento (pagamento_id);

ALTER TABLE matricula ADD CONSTRAINT matricula_aluno_id_fkey
	FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE matricula ADD CONSTRAINT matricula_curso_id_fkey
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

ALTER TABLE avaliacao ADD CONSTRAINT avaliacao_aluno_id_fkey
	FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE avaliacao ADD CONSTRAINT avaliacao_curso_id_fkey
	FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE visualizacao ADD CONSTRAINT visualizacao_aluno_id_fkey
	FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE visualizacao ADD CONSTRAINT visualizacao_aula_id_fkey
	FOREIGN KEY (aula_id) REFERENCES aula (aula_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE visualizacao ADD CONSTRAINT visualizacao_curso_id_fkey
	FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE categoria ADD CONSTRAINT categoria_plano_id_fkey 
    FOREIGN KEY (plano_id) REFERENCES plano (plano_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE post ADD CONSTRAINT post_categoria_id_fkey 
    FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id) ON UPDATE CASCADE;

ALTER TABLE post ADD CONSTRAINT post_curso_id_fkey 
    FOREIGN KEY (curso_id) REFERENCES curso (curso_id) ON UPDATE CASCADE ON DELETE SET NULL;
	
ALTER TABLE post ADD CONSTRAINT post_aluno_id_fkey 
    FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE resposta ADD CONSTRAINT resposta_post_id_fkey 
    FOREIGN KEY (post_id) REFERENCES post (post_id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE resposta ADD CONSTRAINT resposta_aluno_id_fkey 
    FOREIGN KEY (aluno_id) REFERENCES aluno (aluno_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE resposta ADD CONSTRAINT resposta_professor_id_fkey 
    FOREIGN KEY (professor_id) REFERENCES professor (professor_id) ON UPDATE CASCADE ON DELETE SET NULL;

INSERT INTO professor(nome, email, data_nascimento, senha) 
	VALUES ('Joao', 'joao@example.com', '2000-01-01', '$2b$08$dNZfELgSics8HdTuZfpqfefsUiDJLhFQvMBZmIFQZ7Gggqbn2D5Yu');

INSERT INTO professor(nome, email, data_nascimento, senha) 
	VALUES ('Pedro', 'pedro@example.com', '1990-01-01', '$2b$08$dNZfELgSics8HdTuZfpqfefsUiDJLhFQvMBZmIFQZ7Gggqbn2D5Yu');

INSERT INTO professor(nome, email, data_nascimento, senha) 
	VALUES ('Rogerio', 'rogerio@example.com', '1990-01-01', '$2b$08$dNZfELgSics8HdTuZfpqfefsUiDJLhFQvMBZmIFQZ7Gggqbn2D5Yu');

INSERT INTO professor(nome, email, data_nascimento, senha) 
	VALUES ('Bruna', 'bruna@example.com', '1990-01-01', '$2b$08$dNZfELgSics8HdTuZfpqfefsUiDJLhFQvMBZmIFQZ7Gggqbn2D5Yu');


INSERT INTO plano (plano_id,nome)
	values (1,'B??sico'),
		   (2,'Intermedi??rio'),
		   (3, 'Avan??ado');

INSERT INTO categoria(categoria_id, nome, plano_id) 
	VALUES (1,'Programa????o',1),
		   (2,'Frontend',1),
		   (3,'Ux e desing',2),
		   (4,'Gest??o',2),
		   (5,'Linguas',3),
		   (6,'Data Science',3);

