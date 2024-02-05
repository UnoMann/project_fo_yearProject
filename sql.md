CREATE TABLE "users" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	"login"	TEXT,
	"password"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE "tasks" (
	"id_task"	INTEGER NOT NULL,
	"header"	TEXT,
	"description"	TEXT,
	"date_of_creation"	TEXT,
	"owner"	INTEGER,
	"completed"	INTEGER,
	PRIMARY KEY("id_task"),
	Foreign key ("owner") REFERENCES users("id")
);
