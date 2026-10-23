# INDEX

CREATE TABLE phone (
    phone_code INT PRIMARY KEY,
    phone_name VARCHAR(100) NOT NULL,
    phone_price DECIMAL(10, 2) NOT NULL
);

INSERT INTO phone VALUES
(1, 'iphone', 2400000),
(2, 'Galaxy', 200000),
(3, 'Xiaomi', 1700000);

SELECT * FROM phone;

EXPLAIN SELECT * 
FROM phone
WHERE phone_name = 'iphone';

CREATE INDEX idx_phone_name
ON phone(phone_name);

SHOW INDEX FROM phone;

