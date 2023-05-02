CREATE DATABASE simple;
use simple;

CREATE TABLE IF NOT EXISTS accounts (id int NOT NULL AUTO_INCREMENT, firstName varchar(255) NOT NULL, lastName varchar(255) NOT NULL, PRIMARY KEY (id));

INSERT INTO accounts (firstName, lastName) VALUES ('Mario', 'Magnotta');
INSERT INTO accounts (firstName, lastName) VALUES ('Carlo', 'Verdi');