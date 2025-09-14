DROP SCHEMA IF EXISTS orders CASCADE;

CREATE SCHEMA orders;

-- Create Product table
CREATE TABLE orders.orders (
    id SERIAL PRIMARY KEY,
    upload_date VARCHAR(255)
	
);



-- Create Category table
CREATE TABLE orders.products_orders (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
	product_id INT NOT NULL,
	amount INT CHECK(amount > 0),
	FOREIGN KEY (order_id) REFERENCES orders.orders(id) ON DELETE CASCADE

);

-- INSERT  INTO orders.orders(id,upload_date )
-- VALUES(1,'06/11/2025'),
-- (2,'05/01/2025'),
-- (3,'07/01/2024'),
-- (4,'07/01/2024');

-- INSERT INTO orders.products_order (id,product_id,order_id,amount)
-- VALUES(1,2,1,1000),
-- (2,6,1,1),
-- (3,1,2,1),
-- (4,1,3,99),
-- (5,1,4,99);
