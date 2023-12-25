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
//使用者需要
export const usersTable = pgTable("users",{
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
    displayIdIndexOfUsers: index("display_id_index_of_users").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);
export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(posts),
}));
//posts=賣家po的prodects
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  title: varchar('title').notNull(),
  description: text('description'),
  authorId: uuid('author_Id::uuid')
    .references(() => usersTable.displayId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .notNull(),
  category: varchar('category').notNull(),
  price: integer('price').notNull(),
  left: integer('left').notNull(),
  sold: integer('sold').notNull().default(0),
  likes: integer('likes').notNull().default(0),
  },
  (table)=>({
    displayIdIndexOfPosts: index("display_id_index_of_posts").on(table.displayId),
  })
);
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [posts.authorId],
    references: [usersTable.displayId],
  }),
  comments: many(comments)
}));
//對商品的評論
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text'),
  authorId: uuid('author_Id::uuid')
    .references(() => usersTable.displayId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .notNull(),
  postId: uuid('post_Id::uuid')
    .references(()=>posts.displayId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .notNull(),
  stars:integer('stars').notNull(),
  },(table)=>({
    
}));
export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.displayId],
  }),
}));