CREATE DATABASE web-shop;

CREATE TABLE users (
 id serial PRIMARY KEY,
 email VARCHAR(100) UNIQUE,
 password VARCHAR(100)
 );

CREATE TABLE smartphone (
 id serial PRIMARY KEY,
 public_id VARCHAR(200),
 url VARCHAR(300),
 name VARCHAR(200),
 price VARCHAR(200),
 description VARCHAR(1500)
);