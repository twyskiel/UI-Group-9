--enable foreign keys (disabled by default in sqlite)
PRAGMA foreign_keys = ON;


--Populate users with inital data
INSERT INTO users(username, password)
VALUES('user1', 'password');

INSERT INTO users(username, password)
VALUES('user2', 'password');


INSERT INTO users(username, password)
VALUES('user3', 'password');
