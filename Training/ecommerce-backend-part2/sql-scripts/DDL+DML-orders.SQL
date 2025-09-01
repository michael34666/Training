DROP SCHEMA IF EXISTS orders CASCADE;

CREATE SCHEMA orders;

-- Create order table
CREATE TABLE orders.order (
    id INT NOT NULL,
    upload_date VARCHAR(255),
	PRIMARY KEY (id)
);



-- Create products_order table
CREATE TABLE orders.products_order (
    id INT NOT NULL,
	product_id INT NOT NULL,
    order_id INT NOT NULL,
	amount INT CHECK(amount > 0),
	FOREIGN KEY (order_id) REFERENCES orders.order(id),
	PRIMARY KEY (id)
);

INSERT  INTO orders.order(id,upload_date )
VALUES(1,'06/11/2025'),
(2,'05/01/2025'),
(3,'07/01/2024');

INSERT INTO orders.products_order (id,product_id,order_id,amount)
VALUES(1,2,1,1000),
(2,6,1,1),
(3,1,2,1),
(4,1,3,99);
