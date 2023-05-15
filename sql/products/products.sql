SELECT 'CREATE DATABASE products' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'products')\gexec

\c products


CREATE TABLE stock (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  priceincents INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url_one VARCHAR(300),
  image_url_two VARCHAR(300),
  description VARCHAR(200),
  PRIMARY KEY (id)
);

INSERT INTO stock (name, priceincents, category, image_url_one, image_url_two, description)
VALUES
('Zenith', 74500, 'smartphone', 'backendphotos/Zenith.png', 'backendphotos/Zenith2.png', 'Experience the pinnacle of technology with the Zenith smartphones. With a sleek design and advanced features, it''s the phone of the future.'),
('NovaTech', 98750, 'smartphone', 'backendphotos/NovaTech.png', 'backendphotos/NovaTech2.png', 'Unleash the power of technology with the NovaTech smartphone. With a fast processor and stunning display, it''s the perfect device for tech enthusiasts.'),
('Hyperion', 61400, 'smartphone', 'backendphotos/Hyperion.png', 'backendphotos/Hyperion2.png', 'Get ready to be impressed with the Hyperion smartphone. With a high-quality camera and impressive performance, it''s perfect for content creators.'),
('Phoenix', 81600, 'smartphone', 'backendphotos/Phoenix.png', 'backendphotos/Phoenix2.png', 'Rise from the ashes with the Phoenix smartphone. With a long-lasting battery and advanced features, it''s the perfect device for on-the-go lifestyles.'),
('Vortex', 59100, 'smartphone', 'backendphotos/Vortex.png', 'backendphotos/Vortex2.png', 'Get swept away by the Vortex smartphone. With a powerful processor and cutting-edge features, it''s the perfect device for multitaskers.'),
('Aurora', 70400, 'smartphone', 'backendphotos/Aurora.png', 'backendphotos/Aurora2.png', 'Illuminate your life with the Aurora smartphone. With a stunning display and advanced camera, it''s perfect for capturing and sharing life''s moments.'),
('ApexTech', 90500, 'smartphone', 'backendphotos/ApexTech.png', 'backendphotos/ApexTech2.png', 'Reach the peak of performance with the ApexTech smartphone. With a lightning-fast processor and impressive features, it''s perfect for power users.'),
('Nebula', 62300, 'smartphone', 'backendphotos/Nebula.png', 'backendphotos/Nebula2.png', 'Enter a world of possibilities with the Nebula smartphone. With a sleek design and advanced features, it''s perfect for people on the go.'),
('Velocity', 75000, 'laptop', 'backendphotos/Velocity.png', 'backendphotos/Velocity2.png', 'Take your work to new heights with the Velocity laptop. With lightning-fast performance and a sleek design, it''s the perfect device for professionals.'),
( 'Quantum', 82000, 'laptop', 'backendphotos/Quantum.png', 'backendphotos/Quantum2.png', 'Experience the power of the Quantum laptop. With advanced features and a stunning display, it''s the perfect device for gamers and creatives.'),
( 'Hypernova', 96000, 'laptop', 'backendphotos/Hypernova.png', 'backendphotos/Hypernova2.png', 'Unleash your creativity with the Hypernova laptop. With a high-quality display and advanced features, it''s perfect for artists and designers.'),
( 'Thunderbolt', 52000, 'laptop', 'backendphotos/Thunderbolt.png', 'backendphotos/Thunderbolt2.png', 'Experience lightning-fast performance with the Thunderbolt laptop. With a sleek design and advanced features, it''s the perfect device for multitaskers.'),
( 'Fusion', 64000, 'laptop', 'backendphotos/Fusion.png', 'backendphotos/Fusion2.png', 'Experience the perfect fusion of performance and style with the Fusion laptop. With advanced features and a stunning design, it''s perfect for anyone.'),
( 'Infinity', 78000, 'laptop', 'backendphotos/Infinity.png', 'backendphotos/Infinity2.png', 'Expand your horizons with the Infinity laptop. With a sleek design and advanced features, it''s the perfect device for people on the go.'),
( 'TitanTech', 88000, 'laptop', 'backendphotos/TitanTech.png', 'backendphotos/TitanTech2.png', 'Conquer any task with the TitanTech laptop. With a powerful processor and advanced features, it''s the perfect device for power users.'),
( 'Blaze', 59000, 'laptop', 'backendphotos/Blaze.png', 'backendphotos/Blaze2.png', 'Ignite your productivity with the Blaze laptop. With lightning-fast performance and a sleek design, it''s perfect for professionals on the go.'),
( 'PixelPad', 60000, 'tablet', 'backendphotos/PixelPad.png', 'backendphotos/PixelPad2.png', 'Discover a new world of possibilities with the PixelPad tablet. With a high-quality display and advanced features, it''s perfect for creative professionals.'),
( 'MatrixTab', 70000, 'tablet', 'backendphotos/MatrixTab.png', 'backendphotos/MatrixTab2.png', 'Experience the power of the MatrixTab tablet. With advanced features and a sleek design, it''s perfect for anyone on the go.'),
( 'Neoteric', 80000, 'tablet', 'backendphotos/Neoteric.png', 'backendphotos/Neoteric2.png', 'Explore new horizons with the Neoteric tablet. With a stunning display and advanced features, it''s perfect for people on the go.'),
( 'VelocityTab', 90000, 'tablet', 'backendphotos/VelocityTab.png', 'backendphotos/VelocityTab2.png', 'Take your productivity to new heights with the VelocityTab tablet. With advanced features and lightning-fast performance, it''s perfect for professionals.'),
( 'Nexus', 65000, 'tablet', 'backendphotos/Nexus.png', 'backendphotos/Nexus2.png', 'Enter a new dimension with the Nexus tablet. With a sleek design and advanced features, it''s perfect for anyone who wants to stay connected.'),
( 'SkyPad', 75000, 'tablet', 'backendphotos/SkyPad.png', 'backendphotos/SkyPad2.png', 'Reach for the sky with the SkyPad tablet. With a high-quality display and advanced features, it''s perfect for creative professionals on the go.'),
( 'PhoenixTab', 55000, 'tablet', 'backendphotos/PhoenixTab.png', 'backendphotos/PhoenixTab2.png', 'Rise from the ashes with the PhoenixTab tablet. With a long-lasting battery and advanced features, it''s perfect for anyone on the go.'),
( 'Stellar', 85000, 'tablet', 'backendphotos/Stellar.png', 'backendphotos/Stellar2.png', 'Experience stellar performance and style with the Stellar tablet. With advanced features and a stunning design, it''s perfect for anyone.'),
( 'TimeShift', 20000, 'smartwatch', 'backendphotos/TimeShift.png', 'backendphotos/TimeShift2.png', 'Keep up with your busy life with TimeShift. Stylish and convenient features.'),
( 'HyperionWatch', 25000, 'smartwatch', 'backendphotos/HyperionWatch.png', 'backendphotos/HyperionWatch2.png', 'Experience next-level smartwatch technology with HyperionWatch.'),
( 'ZenithTime', 15000, 'smartwatch', 'backendphotos/ZenithTime.png', 'backendphotos/ZenithTime2.png', 'Elevate your style with ZenithTime. Sleek and functional design.'),
( 'NovaWatch', 30000, 'smartwatch', 'backendphotos/NovaWatch.png', 'backendphotos/NovaWatch2.png', 'Your perfect workout partner. NovaWatch tracks your fitness goals and more.'),
( 'SkyTime', 12000, 'smartwatch', 'backendphotos/SkyTime.png', 'backendphotos/SkyTime2.png', 'The perfect mix of style and functionality. Stay on top of your schedule with SkyTime.'),
( 'FusionWatch', 18000, 'smartwatch', 'backendphotos/FusionWatch.png', 'backendphotos/FusionWatch2.png', 'Stay connected and stylish with FusionWatch. A must-have for modern living.'),
( 'ApexTime', 22000, 'smartwatch', 'backendphotos/ApexTime.png', 'backendphotos/ApexTime2.png', 'Your personal assistant on your wrist. ApexTime helps you stay organized.'),
( 'VortexWatch', 28000, 'smartwatch', 'backendphotos/VortexWatch.png', 'backendphotos/VortexWatch2.png', 'Take control of your life with VortexWatch. A smartwatch for power users.'),
( 'Ascendia', 28000, 'keyboards', 'backendphotos/Ascendia.png', 'backendphotos/Ascendia2.png', 'Your perfect typing companion. Ascendia delivers comfort and speed.'),
( 'Veritas', 22500, 'keyboards', 'backendphotos/Veritas.png', 'backendphotos/Veritas2.png', 'The ultimate keyboard for productivity. Experience the power of Veritas.'),
( 'Luminate', 17000, 'keyboards', 'backendphotos/Luminate.png', 'backendphotos/Luminate2.png', 'Illuminate your workspace with Luminate. A keyboard that delivers style and performance.'),
( 'Elysium', 15000, 'keyboards', 'backendphotos/Elysium.png', 'backendphotos/Elysium2.png', 'Unlock your productivity potential with Elysium. Designed for peak performance.'),
( 'Aetherius', 26500, 'keyboards', 'backendphotos/Aetherius.png', 'backendphotos/Aetherius2.png', 'A keyboard that adapts to your style. Aetherius is as unique as you are.'),
( 'Valtara', 24000, 'keyboards', 'backendphotos/Valtara.png', 'backendphotos/Valtara2.png', 'Elevate your typing experience with Valtara. The keyboard for professionals.'),
( 'Celestia', 22000, 'keyboards', 'backendphotos/Celestia.png', 'backendphotos/Celestia2.png', 'The ultimate keyboard for gamers. Celestia delivers speed and precision.'),
('Solace', 11000, 'keyboards', 'backendphotos/Solace.png', 'backendphotos/Solace2.png', 'The perfect keyboard for a quiet workspace. Solace delivers comfort and silence.');
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
WHERE o.id = '15e4d7b397';

-- Retrives all the sales 

SELECT o.*, i.*
FROM orders o
JOIN order_items i ON o.id = i.order_id;

-- Data from 1 week

SELECT *
FROM orders
WHERE purchase_date BETWEEN CURRENT_DATE - INTERVAL '7 days' AND CURRENT_DATE;


-- Table to track visitors 

CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT NOW()
);


-- Create users table 
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  account_type VARCHAR(250) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

INSERT INTO users(username, password)
VALUES('jhon', '1234')

SELECT * FROM users WHERE username = "username";

-- psql -U postgres -f ./sql/setup.sql

CREATE TABLE users (
  id INT PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT, 
  username VARCHAR(50),
  password TEXT
);

INSERT INTO users( id, email , first_name , last_name ,  username , password)
VALUES (1, 'henry123@gmail.com', 'Henry', 'Martinez', 'henry', '1234');
INSERT INTO users( id, email , first_name , last_name ,  username , password)
VALUES (2, 'henry3@gmail.com', 'nry', 'Martinez', 'henry', '1234');


CREATE TABLE favorites (
  user_id INT,
  product_id INT,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES stock(id)
);


INSERT INTO favorites (user_id, product_id)
VALUES (1, 23);
INSERT INTO favorites (user_id, product_id)
VALUES (1, 34);
INSERT INTO favorites (user_id, product_id)
VALUES (1, 12);

SELECT * FROM users; 
SELECT * FROM favorites WHERE user_id = 1;
SELECT * FROM favorites WHERE user_id = 2;

-- psql -U postgres -f ./sql/setup.sql
