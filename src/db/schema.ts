import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";
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
  doublePrecision,
  boolean,
  primaryKey,
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
  usersToCart: many(usersToCart),
}));
//posts=賣家po的products
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
  buyerNumber: integer('buyerNumber').notNull().default(0),
  likes: doublePrecision('likes').notNull().default(0.00),
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
  usersToCart: many(usersToCart),
  comments: many(comments),
  notifications: many(notifications),
}));
export const usersToCart = pgTable('users_to_cart', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => usersTable.displayId),
  postId: uuid('group_id').notNull().references(() => posts.displayId),
}, (t) => ({
  
}),
);
export const usersToCartRelations = relations(usersToCart, ({ one }) => ({
  posts: one(posts, {
    fields: [usersToCart.postId],
    references: [posts.displayId],
  }),
  user: one(usersTable, {
    fields: [usersToCart.userId],
    references: [usersTable.displayId],
  }),
}));
//對商品的評論
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text'),
  author: varchar('author_Id')
    .references(() => usersTable.username,{
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
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  buyer: varchar('buyer')
    .references(() => usersTable.username,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .notNull(),
  seller: varchar('seller')
    .references(()=>usersTable.username,{
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
  number:integer('number').notNull(),
  money:integer('money').notNull(),
  address:varchar('address').notNull(),
  shipped:boolean('shipped').notNull().default(false),
  received:boolean('received').notNull().default(false),
  readBySeller:boolean('readBySeller').notNull().default(false),
  readByBuyer:boolean('readByBuyer').notNull().default(false),
  },(table)=>({
    
}));
export const notificationsRelations = relations(notifications, ({ one }) => ({
  post: one(posts, {
    fields: [notifications.postId],
    references: [posts.displayId],
  }),
}));