
CREATE DATABASE IF NOT EXISTS product_management_system;
USE product_management_system;

-- Users Table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data: Users (password: 'admin123')
INSERT INTO users (username, password) VALUES 
('admin', '$2b$10$.aBUt.C.0cSteSN/kZEK7.KLfTCpdUqQWiIPFjDuX2xnHB2kmyYw6'); 

-- Sample Data: Products
INSERT INTO products (name, price, quantity) VALUES 
('Laptop', 999.99, 10),
('Mouse', 19.99, 50),
('Keyboard', 49.99, 20),
('Monitor', 199.99, 15);
