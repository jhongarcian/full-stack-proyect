SELECT 'CREATE DATABASE products' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'products')\gexec

\c products

CREATE TABLE stock (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  priceincents INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO stock (id, name, priceincents, category)
VALUES
  (1, 'Smartphone', 100000, 'Electronics'),
  (2, 'Laptop', 800000, 'Electronics'),
  (3, 'Tablet', 50000, 'Electronics'),
  (4, 'Smartwatch', 30000, 'Electronics'),
  (5, 'Headphones', 20000, 'Electronics'),
  (6, 'Bluetooth Speaker', 50000, 'Electronics'),
  (7, 'Wireless Mouse', 20000, 'Electronics'),
  (8, 'Smart TV', 1000000, 'Electronics'),
  (9, 'Fitness Tracker', 40000, 'Electronics'),
  (10, 'Digital Camera', 150000, 'Electronics'),
  (11, 'Gaming Console', 300000, 'Electronics'),
  (12, 'E-book Reader', 80000, 'Electronics'),
  (13, 'External Hard Drive', 120000, 'Electronics'),
  (14, 'Wireless Earbuds', 50000, 'Electronics'),
  (15, 'Smart Home Hub', 70000, 'Electronics');

-- Get the entire list of products 

SELECT * FROM stock;

