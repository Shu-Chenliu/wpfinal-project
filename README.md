# [112-1] Web Programming Final
Group 4 shopEE

## Run the project

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials
   Please refer to the [Pusher Setup](#pusher-setup) section for more details.

3. Get Github OAuth credentials
   Please refer to the [NextAuth Setup](#nextauth-setup) section for more details.

4. Create `.env.local` file in the project root and add the following content:

   ```text
   PUSHER_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   AUTH_SECRET=<this can be any random string>
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   ```

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser

## Pusher Setup

1.  Install pusher

    ```bash
    yarn add pusher pusher-js
    ```

2.  Create a pusher account at https://pusher.com/
3.  Create a new app

    - Click `Get Started` or `Manage/Create app`on the `Channel` tab
    - Enter the app name
    - Select a cluster. Pick the one closest to you, i.e. `ap3(Asia Pacific (Tokyo))`
    - Click `Create app`

4.  Go to `App Keys` tab, you will see the following keys:
    - `app_id`
    - `key`
    - `secret`
    - `cluster`
5.  Copy these keys to your `.env.local` file:

    ```text
    PUSHER_ID=<app_id>
    NEXT_PUBLIC_PUSHER_KEY=<key>
    PUSHER_SECRET=<secret>
    NEXT_PUBLIC_PUSHER_CLUSTER=<cluster>
    ```

6.  Go to `App Settings` tab, scroll down to `Enable authorized connections` and enable it.
    Note: If you enable the `Enable client events` option, every connection will last only 30 seconds if not authorized. So if you just want to do some experiments, you might need to disable this option.

## NextAuth Setup

1. Install next-auth

   ```bash
   yarn add next-auth@beta
   ```

2. Get Github OAuth credentials

   - Go to `Settings` tab of your Github account
   - Click `Developer settings` on the left sidebar
   - Click `OAuth Apps` on the left sidebar
   - Click `New OAuth App` or `Registr a new application`
   - Enter the following information:
     - `Application name`: `shopEE` (or any name you like)
     - `Homepage URL`: `http://localhost:3000`
     - `Authorization callback URL`: `http://localhost:3000/api/auth/callback/github`
   - Click `Register application`
   - Copy the `Client ID` and `Client Secret` to your `.env.local` file:

     ```text
     AUTH_GITHUB_ID=<Client ID>
     AUTH_GITHUB_SECRET=<Client Secret>
     ```

     Before copying the Clinet Secret, you may need to click on `Generate a new client secret` first.

3. Add `AUTH_SECRET` to `.env.local`:

   ```text
   AUTH_SECRET=any-random-string
   ```

## 簡介

1. Demo 影片連結：
2. 系統描述：我們的期末專題是一個完整的購物網站。操作者能夠以買家、賣家的身分，執行所有購物網站的基本功能，包括買賣東西、評論商品以及與商家聊聊等。
3. Deployed 連結：
4. 系統使用方式：進入網址後，要先註冊並登入。在首頁中，使用者可以瀏覽所有商品。並在點擊 “Show more” 進到瀏覽商品的個別頁面。也可在 “My Market” 頁面的 “Add Product” 上傳自己要出售的商品；您亦可檢視自己的商場，包含商店的地址等資訊，以及所有自己已經上傳的上品。對商品有任何疑問也可以跟賣家聊聊。

更多資訊可參考:

https://hackmd.io/@chtzhsn/ry_ul_3v6

5. 使用與參考之框架/模組/原始碼：無
6. 使用之第三方套件、框架

前端：typescript/next.js/react/radix-ui/tailwindcss/shadcn UI/MUI

後端：drizzle orm/postgresql/next-auth/pusher

7. 專題製作心得

劉書辰：
因為我們星期一才考完電磁學 所以我們只有5天可以做 但我覺得我們做的很完整 而且我做的很開心 我跟我組員產生了革命情感 我很慶幸我有修網服 學到了好多

邱梓瑄：

陳冠孜：

## 組內分工
劉書辰:

邱梓瑄:

陳冠孜:
