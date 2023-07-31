-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

-- Create 'users' table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default data into 'users' table
INSERT INTO users (id, name, email)
VALUES
  (1, 'user1', 'user1@gmail.com'),
  (2, 'user2', 'user2@gmail.com');

-- Create 'products' table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default data into 'products' table
INSERT INTO products (id, name, price)
VALUES
  (1, 'dotCard', 10),
  (2, 'dorCard-pro', 20);
