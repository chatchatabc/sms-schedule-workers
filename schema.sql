DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO users (userId, username, password) VALUES (1, 'admin', 'e4d2f949a401c04e9cd0bd410e31d6f81b413974151fc458c18d2d186c379219');
