import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
//使用者可以是買家兼賣家
export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
//posts=賣家po的prodects
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  authorId: integer('author_id'),
});
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments)
}));
//對商品的評論
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text'),
  authorId: integer('author_id'),
  postId: integer('post_id'),
});
export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));