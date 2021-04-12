# Migration `20201020080723-bucket_central`

This migration has been generated by Shane Linden at 10/20/2020, 10:07:23 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Category" (
"id" SERIAL,
"name" text   NOT NULL ,
"description" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Command" (
"id" SERIAL,
"topicId" integer   NOT NULL ,
"command" text   NOT NULL ,
"description" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Topic" (
"id" SERIAL,
"name" text   NOT NULL ,
"description" text   NOT NULL ,
"categoryId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."CommandTopic" (
"cmdId" integer   NOT NULL ,
"topicid" integer   NOT NULL ,
PRIMARY KEY ("cmdId","topicid")
)

CREATE UNIQUE INDEX "Category.name_unique" ON "public"."Category"("name")

CREATE UNIQUE INDEX "Command.command_unique" ON "public"."Command"("command")

CREATE UNIQUE INDEX "Topic.name_unique" ON "public"."Topic"("name")

ALTER TABLE "public"."Topic" ADD FOREIGN KEY ("categoryId")REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CommandTopic" ADD FOREIGN KEY ("cmdId")REFERENCES "public"."Command"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CommandTopic" ADD FOREIGN KEY ("topicid")REFERENCES "public"."Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201020080723-bucket_central
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Category {
+  id          Int    @id @default(autoincrement())
+  name        String @unique
+  description String
+
+  topic Topic[]
+}
+
+model Command {
+  id           Int            @id @default(autoincrement())
+  topicId      Int
+  command      String         @unique
+  description  String
+  createdAt    DateTime       @default(now())
+  updatedAt    DateTime       @updatedAt
+  CommandTopic CommandTopic[]
+}
+
+model Topic {
+  id          Int    @id @default(autoincrement())
+  name        String @unique
+  description String
+  categoryId  Int
+
+  category     Category       @relation(fields: [categoryId], references: [id])
+  CommandTopic CommandTopic[]
+}
+
+model CommandTopic {
+  cmdId   Int
+  command Command @relation(fields: [cmdId], references: [id])
+  topicid Int
+  topic   Topic   @relation(fields: [topicid], references: [id])
+
+  @@id([cmdId, topicid])
+}
```

