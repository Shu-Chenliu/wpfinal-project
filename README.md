# Run the project

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
