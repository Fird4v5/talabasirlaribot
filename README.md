# 🎓 TalabaSirlariBot

A Telegram bot and dashboard system that lets Uzbek students share anonymous confessions. Built with Firebase, Grammy, and a React admin dashboard — this project creates a viral, moderated student experience where only the best stories reach the public.

---

## 🚀 Features

### Telegram Bot
- 🧑‍🎓 Anonymous confession submission
- 🧠 Manual moderation (admin picks the top 3 confessions)
- 💬 Posts with comments enabled on Telegram
- ⚡ Fast and lightweight (Grammy + TypeScript)
- 📡 Hosted 24/7 on Fly.io

### Admin Dashboard
- ✅ Secure login with Firebase Auth (admin only)
- 🧾 Approve/disapprove confessions with one click
- 📺 View submitted media (image, video, etc.)
- 🌐 Hosted on Firebase Hosting
- 🧠 Fetches Telegram files in real-time via Telegram File API

---

## 🛠️ Tech Stack

| Layer          | Tech                                  |
|----------------|---------------------------------------|
| Bot Framework  | [Grammy](https://grammy.dev)          |
| Backend        | Firebase (Firestore, Admin SDK)       |
| Frontend       | React + TypeScript + Tailwind CSS     |
| Auth           | Firebase Authentication               |
| Hosting (Bot)  | Fly.io                                |
| Hosting (UI)   | Firebase Hosting                      |
| Environment    | `.env` + `serviceAccount.json`        |

---

## 📦 Setup & Installation

### 1. Clone the Repo
```bash
git clone https://github.com/Fird4v5/talabasirlaribot.git
cd talabasirlaribot

2. Install Dependencies
npm install

3. Create a .env File
At the project root:

BOT_TOKEN=your_telegram_bot_token
CHANNEL_ID=@your_channel_username
FLY_APP_NAME=your-fly-app-name

⚠️ Do NOT include Firebase keys here. Use serviceAccount.json instead.

4. Add serviceAccount.json
Download your Firebase service account key:
Rename to serviceAccount.json
Place it in the root folder

5. Run the Bot Locally
npm run start

Or build & run:
npm run build
node dist/index.js

🌐 Deployments
🔹 Bot on Fly.io

npm install -g flyctl

flyctl auth login
flyctl launch --name your-fly-app-name

flyctl secrets set BOT_TOKEN=... CHANNEL_ID=... FLY_APP_NAME=...

flyctl deploy
flyctl logs

🔹 Dashboard on Firebase Hosting

cd dashboard  # the React dashboard project
npm install
npm run build

firebase login
firebase init hosting
firebase deploy

The dashboard is protected using Firebase Authentication. Only logged-in admins can view or moderate content.

🧠 Firebase Setup
Go to Firebase Console

Create a project

Enable:

Firestore (test mode)

Firebase Auth (Email/Password or Google Sign-In)

Generate Service Account Key → download → rename → serviceAccount.json

🗂️ Project Structure
/talabasirlaribot
├── bot/                    # Telegram bot logic
│   ├── src/
│   │   ├── handlers/       # Command & message handlers
│   │   ├── scripts/        # Utility scripts (moderation tools)
│   │   ├── firebase.ts     # Firebase admin setup
│   │   └── index.ts        # Bot entry point
│   ├── serviceAccount.json
│   ├── .env
│   ├── fly.toml
│   ├── Dockerfile
│   └── ...
├── dashboard/              # React admin panel
│   ├── src/
│   ├── public/
│   ├── firebase.json       # Firebase hosting config
│   └── ...
├── README.md

💡 Inspiration
TalabaSirlariBot was born to give Uzbek students a voice — a space to share honest, raw experiences anonymously. With real human moderation and light automation, this creates a meaningful social hub for student stories.

🔐 Admin Security
Admin dashboard is secured with Firebase Auth

Telegram bot moderation commands can only be run by pre-authorized users

No confession is posted without explicit review

🙌 Contributing
Pull requests welcome! If you’d like to help with moderation UI, UX, or performance — open an issue or fork the repo.

📄 License
MIT © Fird4v5






