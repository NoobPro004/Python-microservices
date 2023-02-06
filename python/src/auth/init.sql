-- Active: 1675697528003@@127.0.0.1@3306@auth
CREATE USER 'auth_user'@'localhost' IDENTIFIED BY '9812651308Hg@';
CREATE DATABASE auth;
GRANT all PRIVILEGES on auth.* TO 'auth_user'@'localhost';

USE auth;

CREATE Table user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO user (email,password) values ('hgarg437@gmail.com','123456');

