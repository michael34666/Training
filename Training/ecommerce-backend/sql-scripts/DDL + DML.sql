-- DDL
DROP SCHEMA IF EXISTS products CASCADE;

CREATE SCHEMA products;

CREATE TYPE products.status AS ENUM ('ACTIVE' , 'DISABLED' );

-- Create Product table
CREATE TABLE products.products (
    id INT NOT NULL,
    product_name VARCHAR(255),
    upload_date VARCHAR(255),
    product_description VARCHAR(255),
    price INT CHECK(price > 0),
    seller_name VARCHAR(255),
    image_url  VARCHAR(255),
    product_status products.status, 
	PRIMARY KEY (id)
);



-- Create Category table
CREATE TABLE products.categories (
    id INT NOT NULL,
    category_name VARCHAR(255),
	PRIMARY KEY (id)
);

-- Create Product-Category table
CREATE TABLE products.products_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products.products(id),
	FOREIGN KEY (category_id) REFERENCES products.categories(id)
);


-- DML
INSERT INTO products.products(id,product_name,upload_date,product_description,price,seller_name,image_url,product_status)
VALUES (1 ,'iPhone 13 Pro Max','05/10/2023', 'The iPhone 13 Pro Max is the ultimate device for power users.',1099,'yossi','iPhone-13-pro-max-5.jpg', 'ACTIVE'),
    (2,'iPhone 12 Mini','01/15/2025','Perfect for those who love smaller devices.',699,'ali','iphone-12-mini.webp', 'DISABLED'),
    (3,'iPhone SE (2020)', '07/15/2025', 'A great choice for those who want power without breaking the bank.', 399,'roi', 'iphone-se-2020.jpg','ACTIVE'),
    (4,'iPhone 14 Pro', '01/11/2024','The ultimate phone for creators and professionals.', 1099, 'Apple Store','iphone-14.webp','ACTIVE'), 
    (5,'Quality Chef Apron','9/14/2024','Durable apron to keep clothes clean while cooking.',19.99,'Cass','iphone-14.webp','ACTIVE'),
    (6,'Granulated Sugar','9/24/2024','Fine granulated sugar for all your baking needs',2.49,'Thoma','iphone-14.webp','ACTIVE'),
    (7,'Customizable Photo Calendar','1/8/2025','Personalized calendar with your favorite photos.',19.99,'Janina','iphone-14.webp','ACTIVE'),
    (8,'Compressed Towel Tablets','4/14/2025','Compact towels that expand when wet, ideal for travel.',12.99,'Maren','iphone-14.webp','ACTIVE'),
    (9,'Whole Grain Mustard','2/21/2025','Tangy whole grain mustard for sandwiches and dressings.',3.49,'Steven','iphone-14.webp','ACTIVE');



INSERT INTO products.categories(id, category_name)
VALUES(1, 'Electronics'),
    (2, 'Kitchen products'),
    (3, 'Food'),
    (4, 'Calendar'),
    (5, 'Towel'),
    (6,'Computers'),
    (7,'New iphone');


 
INSERT INTO products.products_categories(product_id, category_id)
VALUES( 1,1),
    (1,7),
    (2,1),
    (3,1),
    (4,1),
    (4,7),
    (5,2),
    (6,3),
    (7,4),
    (8,5),
    (9,3);
