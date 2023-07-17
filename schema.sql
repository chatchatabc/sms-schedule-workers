DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, createdAt TEXT, updatedAt TEXT);
INSERT INTO users (id, username, password, createdAt, updatedAt) VALUES (2, 'admin', 'e4d2f949a401c04e9cd0bd410e31d6f81b413974151fc458c18d2d186c379219','2023-07-17T02:19:59.107Z','2023-07-17T02:19:59.107Z');

DROP TABLE IF EXISTS schedules;
CREATE TABLE IF NOT EXISTS schedules (id INTEGER PRIMARY KEY, date TEXT, text TEXT, user_id INTEGER, createdAt TEXT, updatedAt TEXT);
INSERT INTO schedules (id, date, text, user_id, createdAt, updatedAt) VALUES (1, '2023-07-17T02:19:59.107Z', 'test', 2, '2023-07-17T02:19:59.107Z', '2023-07-17T02:19:59.107Z');
