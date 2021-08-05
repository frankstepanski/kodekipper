CREATE TABLE "Snippets" (
  "id"  serial  UNIQUE,
  "code"  varchar  NOT NULL,
  "name"  varchar  NOT NULL,
  "user_id"  serial,
  "folder_id"  serial,
  CONSTRAINT Snippets_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Folder" (
  "id"  serial  UNIQUE,
  "name"  varchar,
  "user_id"  serial,
  "language_id"  integer,
  CONSTRAINT Folder_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "User" (
  "id"  serial  UNIQUE,
  "user_name"  varchar,
  "password"  varchar,
  CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Languages" (
  "id"  serial  UNIQUE,
  "name"  varchar,
  CONSTRAINT Languages_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Snippets" ADD CONSTRAINT "Snippets_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("id");

ALTER TABLE "Snippets" ADD CONSTRAINT "Snippets_fk1" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id");

ALTER TABLE "Folder" ADD CONSTRAINT "Folder_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("id");

ALTER TABLE "Folder" ADD CONSTRAINT "Folder_fk1" FOREIGN KEY ("language_id") REFERENCES "Languages"("id");
