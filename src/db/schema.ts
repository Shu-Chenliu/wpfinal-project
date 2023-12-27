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
    address:varchar('address', { length: 280 }),
    sellername: varchar("sellername", { length: 100 }).notNull().unique(),
    selleraddress:varchar('selleraddress', { length: 280 }),
    imageURL: varchar('imageURL'),
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
  coupons: many(coupons),
  chatRoomsOfSeller: many(usersToChatofSeller),
  chatRoomOfBuyer: many(usersToChatofBuyer),
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
export const coupons = pgTable('coupons', {
  id: serial('id').primaryKey(),
  owner: uuid('owner')
  .references(() => usersTable.displayId,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  })
  .notNull(),
  percent:integer('percent').notNull(),
  },(table)=>({
    
}));
export const couponsRelations = relations(coupons, ({ one }) => ({
  owner: one(usersTable, {
    fields: [coupons.owner],
    references: [usersTable.displayId],
  }),
}));
export const chatRoom = pgTable('chatRoom', {
  id: serial('id').primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  sellerName:varchar('seller_name').notNull()
    .references(() => usersTable.username,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  buyerName:varchar('buyer_name').notNull()
    .references(() => usersTable.username,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),  
}, (t) => ({
  
}));
export const chatroomRelations = relations(chatRoom, ({ many }) => ({
  sellerId:many(usersToChatofSeller),
  buyerId:many(usersToChatofBuyer),
}));
export const usersToChatofSeller = pgTable('users_to_chat_of_seller', {
  id: serial('id').primaryKey(),
  sellerId: uuid('seller_id').notNull().references(() => usersTable.displayId,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  chatRoomId:uuid('chat_room_id').notNull().references(()=>chatRoom.displayId,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
}, (table) => ({
  userAndsellerIndex: index("user_and_chatroom_of_seller_index").on(
    table.sellerId,
    table.chatRoomId,
  ),
  uniqCombination: unique().on(table.chatRoomId, table.sellerId),
}),
);
export const usersToChatofSellerRelations = relations(usersToChatofSeller, ({ one }) => ({
  seller: one(usersTable, {
    fields: [usersToChatofSeller.sellerId],
    references: [usersTable.displayId],
  }),
  chatRoomId: one(chatRoom, {
    fields: [usersToChatofSeller.chatRoomId],
    references: [chatRoom.displayId],
  }),
}));
export const usersToChatofBuyer = pgTable('users_to_chat_of_buyer', {
  id: serial('id').primaryKey(),
  buyerId: uuid('buyer_id').notNull().references(() => usersTable.displayId,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  chatRoomId:uuid('chat_room_id').notNull().references(()=>chatRoom.displayId,{
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
}, (table) => ({
  userAndbuyerIndex: index("user_and_chatroom_of_buyer_index").on(
    table.buyerId,
    table.chatRoomId,
  ),
  uniqCombination: unique().on(table.chatRoomId, table.buyerId),
}),
);
export const usersToChatofBuyerRelations = relations(usersToChatofBuyer, ({ one }) => ({
  buyer: one(usersTable, {
    fields: [usersToChatofBuyer.buyerId],
    references: [usersTable.displayId],
  }),
  chatRoomId: one(chatRoom, {
    fields: [usersToChatofBuyer.chatRoomId],
    references: [chatRoom.displayId],
  }),
}));
export const messagesTable = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    text: varchar("text", { length: 100 }).notNull(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sendAt: timestamp("sendAt").default(sql`now()`).notNull(),
    chatRoomId: uuid("chatroom_id")
      .notNull()
      .references(() => chatRoom.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    authorIndex: index("author_index").on(table.authorId),
    chatRoomIndex: index("chatroom_id_index").on(table.chatRoomId),
    sendAtIndex: index("sendAt_index").on(table.sendAt),
  }),
);
export const messagesReletions=relations(messagesTable,({one})=>({
  chatRoom: one(chatRoom, {
    fields: [messagesTable.chatRoomId],
    references: [chatRoom.displayId],
  }),
}));