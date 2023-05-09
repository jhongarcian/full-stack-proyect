SELECT 'CREATE DATABASE products' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'products')\gexec

\c products

CREATE TABLE stock (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  priceincents INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url_one VARCHAR(300),
  image_url_two VARCHAR(300),
  image_url_three VARCHAR(300),
  PRIMARY KEY (id)
);

INSERT INTO stock (id, name, priceincents, category, image_url_one, image_url_two, image_url_three)
VALUES
  (1, 'Samsung Galaxy S21', 79900, 'Smartphones', 'url_1', 'url_2', 'url_3'),
  (2, 'iPhone 13', 79900, 'Smartphones', 'url_1', 'url_2', 'url_3'),
  (3, 'Google Pixel 6', 69900, 'Smartphones', 'url_1', 'url_2', 'url_3'),
  (4, 'OnePlus 9 Pro', 69900, 'Smartphones', 'url_1', 'url_2', 'url_3'),
  (5, 'iPad Air', 64900, 'Tablets', 'url_1', 'url_2', 'url_3'),
  (6, 'Samsung Galaxy Tab S7', 64900, 'Tablets', 'url_1', 'url_2', 'url_3'),
  (7, 'Microsoft Surface Pro 8', 109900, 'Tablets', 'url_1', 'url_2', 'url_3'),
  (8, 'iPad Pro', 79900, 'Tablets', 'url_1', 'url_2', 'url_3'),
  (9, 'Dell XPS 13', 109900, 'Laptops', 'url_1', 'url_2', 'url_3'),
  (10, 'MacBook Air', 99900, 'Laptops', 'url_1', 'url_2', 'url_3'),
  (11, 'Lenovo ThinkPad X1 Carbon', 119900, 'Laptops', 'url_1', 'url_2', 'url_3'),
  (12, 'ASUS ZenBook UX425', 89900, 'Laptops', 'url_1', 'url_2', 'url_3'),
  (13, 'Logitech K810', 4999, 'Keyboards', 'url_1', 'url_2', 'url_3'),
  (14, 'Microsoft Sculpt Ergonomic', 7999, 'Keyboards', 'url_1', 'url_2', 'url_3'),
  (15, 'Corsair K70', 9999, 'Keyboards', 'url_1', 'url_2', 'url_3'),
  (16, 'Razer Blackwidow Elite', 14999, 'Keyboards', 'url_1', 'url_2', 'url_3');

-- Get the entire list of products 

SELECT * FROM stock;

-- Create Orders and order_item tables

CREATE TABLE orders (
  id VARCHAR(300) PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  subtotal_amount INTEGER,
  total_amount INTEGER,
  item_count INTEGER,
  purchase_date timestamp
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(300) REFERENCES orders(id),
  item_name VARCHAR(255),
  item_price INTEGER,
  quantity INTEGER,
  amount INTEGER,
  purchase_date timestamp
);

-- Next retrives all the paired orders between orders and orders_items 

SELECT o.*, i.*
FROM orders o
JOIN order_items i ON o.id = i.order_id
WHERE o.id = 1;

-- Table to track visitors 

CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- psql -U postgres -f ./sql/setup.sql

