SELECT 'CREATE DATABASE products' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'products')\gexec

\c products


CREATE TABLE stock (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  priceincents INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url_one VARCHAR(300),
  image_url_two VARCHAR(300),
  description VARCHAR(200),
  PRIMARY KEY (id)
);


INSERT INTO stock (id, name, priceincents, category, image_url_one, image_url_two, description)
VALUES
(1, 'Zenith', 74500, 'smartphone', 'backendphotos/Zenith.png', 'backendphotos/Zenith2.png', 'Experience the pinnacle of technology with the Zenith smartphones. With a sleek design and advanced features, it''s the phone of the future.'),
(2, 'NovaTech', 98750, 'smartphone', 'backendphotos/NovaTech.png', 'backendphotos/NovaTech2.png', 'Unleash the power of technology with the NovaTech smartphone. With a fast processor and stunning display, it''s the perfect device for tech enthusiasts.'),
(3, 'Hyperion', 61400, 'smartphone', 'backendphotos/Hyperion.png', 'backendphotos/Hyperion2.png', 'Get ready to be impressed with the Hyperion smartphone. With a high-quality camera and impressive performance, it''s perfect for content creators.'),
(4, 'Phoenix', 81600, 'smartphone', 'backendphotos/Phoenix.png', 'backendphotos/Phoenix2.png', 'Rise from the ashes with the Phoenix smartphone. With a long-lasting battery and advanced features, it''s the perfect device for on-the-go lifestyles.'),
(5, 'Vortex', 59100, 'smartphone', 'backendphotos/Vortex.png', 'backendphotos/Vortex2.png', 'Get swept away by the Vortex smartphone. With a powerful processor and cutting-edge features, it''s the perfect device for multitaskers.'),
(6, 'Aurora', 70400, 'smartphone', 'backendphotos/Aurora.png', 'backendphotos/Aurora2.png', 'Illuminate your life with the Aurora smartphone. With a stunning display and advanced camera, it''s perfect for capturing and sharing life''s moments.'),
(7, 'ApexTech', 90500, 'smartphone', 'backendphotos/ApexTech.png', 'backendphotos/ApexTech2.png', 'Reach the peak of performance with the ApexTech smartphone. With a lightning-fast processor and impressive features, it''s perfect for power users.'),
(8, 'Nebula', 62300, 'smartphone', 'backendphotos/Nebula.png', 'backendphotos/Nebula2.png', 'Enter a world of possibilities with the Nebula smartphone. With a sleek design and advanced features, it''s perfect for people on the go.'),
(9, 'Velocity', 75000, 'laptop', 'backendphotos/Velocity.png', 'backendphotos/Velocity2.png', 'Take your work to new heights with the Velocity laptop. With lightning-fast performance and a sleek design, it''s the perfect device for professionals.'),
(10, 'Quantum', 82000, 'laptop', 'backendphotos/Quantum.png', 'backendphotos/Quantum2.png', 'Experience the power of the Quantum laptop. With advanced features and a stunning display, it''s the perfect device for gamers and creatives.'),
(11, 'Hypernova', 96000, 'laptop', 'backendphotos/Hypernova.png', 'backendphotos/Hypernova2.png', 'Unleash your creativity with the Hypernova laptop. With a high-quality display and advanced features, it''s perfect for artists and designers.'),
(12, 'Thunderbolt', 52000, 'laptop', 'backendphotos/Thunderbolt.png', 'backendphotos/Thunderbolt2.png', 'Experience lightning-fast performance with the Thunderbolt laptop. With a sleek design and advanced features, it''s the perfect device for multitaskers.'),
(13, 'Fusion', 64000, 'laptop', 'backendphotos/Fusion.png', 'backendphotos/Fusion2.png', 'Experience the perfect fusion of performance and style with the Fusion laptop. With advanced features and a stunning design, it''s perfect for anyone.'),
(14, 'Infinity', 78000, 'laptop', 'backendphotos/Infinity.png', 'backendphotos/Infinity2.png', 'Expand your horizons with the Infinity laptop. With a sleek design and advanced features, it''s the perfect device for people on the go.'),
(15, 'TitanTech', 88000, 'laptop', 'backendphotos/TitanTech.png', 'backendphotos/TitanTech2.png', 'Conquer any task with the TitanTech laptop. With a powerful processor and advanced features, it''s the perfect device for power users.'),
(16, 'Blaze', 59000, 'laptop', 'backendphotos/Blaze.png', 'backendphotos/Blaze2.png', 'Ignite your productivity with the Blaze laptop. With lightning-fast performance and a sleek design, it''s perfect for professionals on the go.'),
(17, 'PixelPad', 60000, 'tablet', 'backendphotos/PixelPad.png', 'backendphotos/PixelPad2.png', 'Discover a new world of possibilities with the PixelPad tablet. With a high-quality display and advanced features, it''s perfect for creative professionals.'),
(18, 'MatrixTab', 70000, 'tablet', 'backendphotos/MatrixTab.png', 'backendphotos/MatrixTab2.png', 'Experience the power of the MatrixTab tablet. With advanced features and a sleek design, it''s perfect for anyone on the go.'),
(19, 'Neoteric', 80000, 'tablet', 'backendphotos/Neoteric.png', 'backendphotos/Neoteric2.png', 'Explore new horizons with the Neoteric tablet. With a stunning display and advanced features, it''s perfect for people on the go.'),
(20, 'VelocityTab', 90000, 'tablet', 'backendphotos/VelocityTab.png', 'backendphotos/VelocityTab2.png', 'Take your productivity to new heights with the VelocityTab tablet. With advanced features and lightning-fast performance, it''s perfect for professionals.'),
(21, 'Nexus', 65000, 'tablet', 'backendphotos/Nexus.png', 'backendphotos/Nexus2.png', 'Enter a new dimension with the Nexus tablet. With a sleek design and advanced features, it''s perfect for anyone who wants to stay connected.'),
(22, 'SkyPad', 75000, 'tablet', 'backendphotos/SkyPad.png', 'backendphotos/SkyPad2.png', 'Reach for the sky with the SkyPad tablet. With a high-quality display and advanced features, it''s perfect for creative professionals on the go.'),
(23, 'PhoenixTab', 55000, 'tablet', 'backendphotos/PhoenixTab.png', 'backendphotos/PhoenixTab2.png', 'Rise from the ashes with the PhoenixTab tablet. With a long-lasting battery and advanced features, it''s perfect for anyone on the go.'),
(24, 'Stellar', 85000, 'tablet', 'backendphotos/Stellar.png', 'backendphotos/Stellar2.png', 'Experience stellar performance and style with the Stellar tablet. With advanced features and a stunning design, it''s perfect for anyone.'),
(25, 'TimeShift', 20000, 'smartwatch', 'backendphotos/TimeShift.png', 'backendphotos/TimeShift2.png', 'Keep up with your busy life with TimeShift. Stylish and convenient features.'),
(26, 'HyperionWatch', 25000, 'smartwatch', 'backendphotos/HyperionWatch.png', 'backendphotos/HyperionWatch2.png', 'Experience next-level smartwatch technology with HyperionWatch.'),
(27, 'ZenithTime', 15000, 'smartwatch', 'backendphotos/ZenithTime.png', 'backendphotos/ZenithTime2.png', 'Elevate your style with ZenithTime. Sleek and functional design.'),
(28, 'NovaWatch', 30000, 'smartwatch', 'backendphotos/NovaWatch.png', 'backendphotos/NovaWatch2.png', 'Your perfect workout partner. NovaWatch tracks your fitness goals and more.'),
(29, 'SkyTime', 12000, 'smartwatch', 'backendphotos/SkyTime.png', 'backendphotos/SkyTime2.png', 'The perfect mix of style and functionality. Stay on top of your schedule with SkyTime.'),
(30, 'FusionWatch', 18000, 'smartwatch', 'backendphotos/FusionWatch.png', 'backendphotos/FusionWatch2.png', 'Stay connected and stylish with FusionWatch. A must-have for modern living.'),
(31, 'ApexTime', 22000, 'smartwatch', 'backendphotos/ApexTime.png', 'backendphotos/ApexTime2.png', 'Your personal assistant on your wrist. ApexTime helps you stay organized.'),
(32, 'VortexWatch', 28000, 'smartwatch', 'backendphotos/VortexWatch.png', 'backendphotos/VortexWatch2.png', 'Take control of your life with VortexWatch. A smartwatch for power users.'),
(33, 'Ascendia', 28000, 'keyboards', 'backendphotos/Ascendia.png', 'backendphotos/Ascendia2.png', 'Your perfect typing companion. Ascendia delivers comfort and speed.'),
(34, 'Veritas', 22500, 'keyboards', 'backendphotos/Veritas.png', 'backendphotos/Veritas2.png', 'The ultimate keyboard for productivity. Experience the power of Veritas.'),
(35, 'Luminate', 17000, 'keyboards', 'backendphotos/Luminate.png', 'backendphotos/Luminate2.png', 'Illuminate your workspace with Luminate. A keyboard that delivers style and performance.'),
(36, 'Elysium', 15000, 'keyboards', 'backendphotos/Elysium.png', 'backendphotos/Elysium2.png', 'Unlock your productivity potential with Elysium. Designed for peak performance.'),
(37, 'Aetherius', 26500, 'keyboards', 'backendphotos/Aetherius.png', 'backendphotos/Aetherius2.png', 'A keyboard that adapts to your style. Aetherius is as unique as you are.'),
(38, 'Valtara', 24000, 'keyboards', 'backendphotos/Valtara.png', 'backendphotos/Valtara2.png', 'Elevate your typing experience with Valtara. The keyboard for professionals.'),
(39, 'Celestia', 22000, 'keyboards', 'backendphotos/Celestia.png', 'backendphotos/Celestia2.png', 'The ultimate keyboard for gamers. Celestia delivers speed and precision.'),
(40, 'Solace', 11000, 'keyboards', 'backendphotos/Solace.png', 'backendphotos/Solace2.png', 'The perfect keyboard for a quiet workspace. Solace delivers comfort and silence.');
-- (33, 'SonicBloom', 10000, 'headphones'),
-- (34, 'EchoSound', 7000, 'headphones'),
-- (35, 'AcousticSoul', 9000, 'headphones'),
-- (36, 'Harmonic', 15000, 'headphones'),
-- (37, 'AudioZen', 5000, 'headphones'),
-- (38, 'Rhythmic', 12000, 'headphones'),
-- (39, 'BassBoost', 8000, 'headphones'),
-- (40, 'GrooveAudio', 18000, 'headphones'),
-- (41, 'SoundWave', 12000, 'bluetooth speakers'),
-- (42, 'SonicBoom', 15000, 'bluetooth speakers'),
-- (43, 'AudioZen', 8000, 'bluetooth speakers'),
-- (44, 'FusionSound', 17000, 'bluetooth speakers'),
-- (45, 'AcousticBloom', 9000, 'bluetooth speakers'),
-- (46, 'AmpliTech', 19000, 'bluetooth speakers'),
-- (47, 'SonicSphere', 6000, 'bluetooth speakers'),
-- (48, 'SkySpeaker', 13000, 'bluetooth speakers'),
-- (49, 'VelocityMouse', 15000, 'wireless mouse'),
-- (50, 'QuantumClick', 8000, 'wireless mouse'),
-- (51, 'HypernovaPad', 12000, 'wireless mouse'),
-- (52, 'ThunderboltMouse', 10000, 'wireless mouse'),
-- (53, 'FusionClick', 7000, 'wireless mouse'),
-- (54, 'InfinityTouch', 9000, 'wireless mouse'),
-- (55, 'TitanMouse', 11000, 'wireless mouse'),
-- (56, 'BlazeClick', 6000, 'wireless mouse'),
-- (57, 'HyperionVision', 50000, 'smart tv'),
-- (58, 'QuantumView', 70000, 'smart tv'),
-- (59, 'ApexVision', 80000, 'smart tv'),
-- (60, 'NovaTechTV', 60000, 'smart tv'),
-- (61, 'SkyScreen', 30000, 'smart tv'),
-- (62, 'FusionTV', 40000, 'smart tv'),
-- (63, 'InfinityVision', 90000, 'smart tv'),
-- (64, 'TitanTechTV', 100000, 'smart tv'),
-- (65, 'ZenithFit', 15000, 'fitness tracker'),
-- (66, 'NovaTrack', 20000, 'fitness tracker'),
-- (67, 'HyperionFit', 25000, 'fitness tracker'),
-- (68, 'SkyFitness', 30000, 'fitness tracker'),
-- (69, 'ApexTrack', 35000, 'fitness tracker'),
-- (70, 'VortexFit', 20000, 'fitness tracker'),
-- (71, 'AuroraFit', 25000, 'fitness tracker'),
-- (72, 'FusionTracker', 40000, 'fitness tracker'),
-- (73, 'PixelSnap', 150000, 'digital camera'),
-- (74, 'MatrixCapture', 220000, 'digital camera'),
-- (75, 'NeotericCam', 120000, 'digital camera'),
-- (76, 'VelocitySnap', 250000, 'digital camera'),
-- (77, 'NexusCapture', 95000, 'digital camera'),
-- (78, 'SkyShot', 65000, 'digital camera'),
-- (79, 'PhoenixCapture', 180000, 'digital camera'),
-- (80, 'StellarCam', 350000, 'digital camera'),
-- (81, 'HyperionPlay', 45000, 'gaming console'),
-- (82, 'QuantumBox', 55000, 'gaming console'),
-- (83, 'ApexGamer', 32000, 'gaming console'),
-- (84, 'NovaTechPlay', 38000, 'gaming console'),
-- (85, 'SkyStation', 55000, 'gaming console'),
-- (86, 'FusionConsole', 45000, 'gaming console'),
-- (87, 'InfinityPlay', 35000, 'gaming console'),
-- (88, 'TitanTechBox', 50000, 'gaming console'),
-- (89, 'ZenithRead', 15000, 'e-book reader'),
-- (90, 'NovaTechBook', 20000, 'e-book reader'),
-- (91, 'HyperionRead', 12000, 'e-book reader'),
-- (92, 'SkyReader', 17000, 'e-book reader'),
-- (93, 'ApexBook', 25000, 'e-book reader'),
-- (94, 'VortexRead', 10000, 'e-book reader'),
-- (95, 'AuroraReader', 22000, 'e-book reader'),
-- (96, 'FusionTechBook', 29000, 'e-book reader'),
-- (97, 'VelocityDrive', 15000, 'external hard drive'),
-- (98, 'QuantumStorage', 25000, 'external hard drive'),
-- (99, 'HypernovaDisk', 30000, 'external hard drive'),
-- (100, 'ThunderDrive', 12000, 'external hard drive'),
-- (101, 'FusionStorage', 20000, 'external hard drive'),
-- (102, 'InfinityDrive', 35000, 'external hard drive'),
-- (103, 'TitanTechDisk', 18000, 'external hard drive'),
-- (104, 'BlazeDrive', 28000, 'external hard drive'),
-- (105, 'SonicBuds', 15000, 'wireless earbuds'),
-- (106, 'EchoTunes', 20000, 'wireless earbuds'),
-- (107, 'AcousticBuds', 12000, 'wireless earbuds'),
-- (108, 'HarmonicEar', 25000, 'wireless earbuds'),
-- (109, 'AudioZenBuds', 17000, 'wireless earbuds'),
-- (110, 'RhythmicBuds', 13000, 'wireless earbuds'),
-- (111, 'BassBoostBuds', 18000, 'wireless earbuds'),
-- (112, 'GrooveEar', 14000, 'wireless earbuds'),
-- (113, 'HyperionHome', 15000, 'smarthub'),
-- (114, 'QuantumHub', 25000, 'smarthub'),
-- (115, 'ApexHome', 18000, 'smarthub'),
-- (116, 'NovaTechHub', 22000, 'smarthub'),
-- (117, 'SkyStationHome', 17000, 'smarthub'),
-- (118, 'FusionHome', 12000, 'smarthub'),
-- (119, 'InfinityHub', 21000, 'smarthub'),
-- (120, 'TitanTechHome', 30000, 'smarthub');
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
