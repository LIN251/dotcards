-- schema.sql
-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

-- Create 'users' table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Insert default data into 'users' table
INSERT INTO users (id, name, email)
VALUES
  (1, 'LinZhang', 'lzhang2510@gmail.com'),
  (2, 'user2', 'user2@gmail.com');

-- Create 'products' table
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Insert default data into 'products' table
INSERT INTO products (id, name, price)
VALUES
  (1, 'dotCard1', 10),
  (2, 'dorCard2-pro', 20);