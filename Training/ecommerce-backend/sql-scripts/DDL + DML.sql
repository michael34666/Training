-- DDL
DROP SCHEMA IF EXISTS products CASCADE;

CREATE SCHEMA products;

CREATE TYPE products.status AS ENUM ('ACTIVE' , 'DISABLED' );

-- Create Product table
CREATE TABLE products.products (
    id int,
    product_name varchar(255),
    upload_date varchar(255),
    product_description varchar(255),
    price int,
    seller_name varchar(255),
    image_url  varchar(255),
    prodct_status products.status, 
	PRIMARY KEY (id)
);

-- TODO: all sql types should be upper case (INT, VARCHAR)
-- TODO: Add basic constraints (For example: price > 0)

-- Create Category table
CREATE TABLE products.categories (
    id int,
    catgory_name varchar(255),
	PRIMARY KEY (id)
);

-- Create Product-Category table
CREATE TABLE products.products_categories (
    product_id int,
    catgory_id int,
	FOREIGN KEY (product_id) REFERENCES products.products(id),
	FOREIGN KEY (catgory_id) REFERENCES products.categories(id)
);


-- DML
INSERT INTO products.products(id,product_name,upload_date,product_description,price,seller_name,image_url,prodct_status)
VALUES (1 ,'iPhone 13 Pro Max','05/10/2023', 'The iPhone 13 Pro Max is the ultimate device for power users.',1099,'yossi','iPhone-13-pro-max-5.jpg', 'ACTIVE'),
    (2,'iPhone 12 Mini','01/15/2025','Perfect for those who love smaller devices.',699,'ali','iphone-12-mini.webp', 'DISABLED'),
    (3,'iPhone SE (2020)', '07/15/2025', 'A great choice for those who want power without breaking the bank.', 399,'roi', 'iphone-se-2020.jpg','ACTIVE'),
    (4,'iPhone 14 Pro', '01/11/2024','The ultimate phone for creators and professionals.', 1099, 'Apple Store','iphone-14.webp','ACTIVE'), 
    (5,'Quality Chef Apron','9/14/2024','Durable apron to keep clothes clean while cooking.',19.99,'Cass','iphone-14.webp','ACTIVE'),
    (6,'Granulated Sugar','9/24/2024','Fine granulated sugar for all your baking needs',2.49,'Thoma','iphone-14.webp','ACTIVE'),
    (7,'Customizable Photo Calendar','1/8/2025','Personalized calendar with your favorite photos.',19.99,'Janina','iphone-14.webp','ACTIVE'),
    (8,'Compressed Towel Tablets','4/14/2025','Compact towels that expand when wet, ideal for travel.',12.99,'Maren','iphone-14.webp','ACTIVE'),
    (9,'Whole Grain Mustard','2/21/2025','Tangy whole grain mustard for sandwiches and dressings.',3.49,'Steven','iphone-14.webp','ACTIVE');



INSERT INTO products.categories(id, catgory_name)
VALUES(1, 'Electronics'),
    (2, 'Kitchen products'),
    (3, 'Food'),
    (4, 'Calendar'),
    (5, 'Towel');

-- TODO: Add more categories
 
INSERT INTO products.products_categories(product_id, catgory_id)
VALUES( 1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,2),
    (6,3),
    (7,4),
    (8,5),
    (9,3);
 
-- TODO: Add to some products multiple categories
