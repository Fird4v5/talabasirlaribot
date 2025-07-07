🎓 TalabaSirlariBot

A Telegram bot that lets Uzbek students share anonymous confessions, powered by Firebase and Grammy. Curated messages are posted to a public channel, creating a viral student experience.

🚀 Features

🧑‍🎓 Anonymous confession submission

🧠 Manual moderation (admin posts the best 3 messages)

💬 Comment-enabled posts in Telegram

🔐 Firebase-based secure backend

⚡ Fast and lightweight with the Grammy framework

🛠️ Tech Stack

Telegram Bot: Grammy

Backend: Firebase (Firestore, Admin SDK)

Language: TypeScript

Hosting: Fly.io

Environment: .env based configuration

📦 Setup & Installation

1. Clone the Repo
git clone https://github.com/Fird4v5/talabasirlaribot.git
cd talabasirlaribot

2. Install Dependencies
npm install

3. Create a .env File
Create a .env file in the root directory with the following values:

BOT_TOKEN=your_telegram_bot_token
CHANNEL_ID=@your_channel_username
FLY_APP_NAME=your-fly-app-name

Note: Do not include Firebase keys here. Those are stored in serviceAccount.json.

4. Add serviceAccount.json
Download the Firebase service account JSON file and place it in the root directory with the name:
serviceAccount.json

5. Run the Bot Locally
npm run start

Or build & run:
node dist/index.js

⚙️ Firebase Setup

Go to Firebase Console

Create a project

Enable Firestore in test mode

Generate a Service Account Key and download the JSON

Rename it to serviceAccount.json and place in the root directory

No need to manually copy .env Firebase keys — the bot reads from this file directly.

🌐 Deploy on Fly.io

1. Install Fly CLI
npm install -g flyctl

2. Login & Create App
flyctl auth login
flyctl launch --name your-fly-app-name

3. Set Environment Variables
flyctl secrets set BOT_TOKEN=your_telegram_bot_token 
                   CHANNEL_ID=@your_channel_username 
                   FLY_APP_NAME=your-fly-app-name

4. Deploy
flyctl deploy

Fly will handle the rest. You can view logs with:
flyctl logs

📁 Project Structure

📁 root
├── .env                     # Environment variables (excluding Firebase keys)
├── Dockerfile               # Fly.io deploy config
├── fly.toml                 # Fly.io app settings
├── package.json             # Node.js dependencies and scripts
├── tsconfig.json            # TypeScript config
├── serviceAccount.json      # Firebase credentials
├── README.md                # Project documentation
├── node_modules             # Installed packages
├── src                      # Source code
│   ├── handlers/            # Bot command/message handlers
│   ├── scripts/             # Utility scripts
│   ├── firebase.ts          # Firebase admin setup
│   └── index.ts             # Bot entry point


💡 Inspiration

This bot was created to give students in Uzbekistan a voice to share their experiences — anonymously but authentically — building a student community around real, raw stories.

🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License

MIT © Fird4v5