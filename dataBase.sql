CREATE DATABASE IF NOT EXISTS agenda_db;

USE agenda_db;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    telefone_celular VARCHAR(9) NOT NULL,
    telefone_recado VARCHAR(9),
    email VARCHAR(50) UNIQUE NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES users(id)
);
