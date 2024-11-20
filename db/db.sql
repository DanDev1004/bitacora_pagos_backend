CREATE DATABASE BITACORA_PAGOS;
USE BITACORA_PAGOS;


CREATE TABLE USUARIO (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    EMAIL VARCHAR(180) NOT NULL UNIQUE,
    NOMBRES VARCHAR(90) NOT NULL,
    APELLIDOS VARCHAR(90) NOT NULL,
    TELEFONO VARCHAR(90) NOT NULL UNIQUE,
    IMAGEN VARCHAR(255) NULL,
    PASSWORD_USER VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);
