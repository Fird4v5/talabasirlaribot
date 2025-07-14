process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Rejection:", reason);
});

// ✅ ENV Check
if (!process.env.BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing. Did you set it with `fly secrets set BOT_TOKEN=...`?");
  process.exit(1);
}

// If you use FIREBASE_SERVICE_ACCOUNT_BASE64, validate it too
if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT_BASE64 is missing.");
  process.exit(1);
}

// ✅ Firebase service account decoding (you can move this to ./firebase if already handled there)
import admin from "firebase-admin";
import express from "express";
import { Bot, webhookCallback } from "grammy";

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
let serviceAccount: admin.ServiceAccount;
try {
  const decoded = Buffer.from(raw!, "base64").toString("utf-8");
  serviceAccount = JSON.parse(decoded);
} catch (err) {
  console.error("❌ Failed to decode Firebase credentials:", err);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
import { db } from "./firebase";

// 🎯 Initialize bot
const bot = new Bot(process.env.BOT_TOKEN);

// ✅ Register bot handlers
import { startHandler } from "./handlers/startHandler";
import { textHandler } from "./handlers/textHandler";
import { photoHandler } from "./handlers/photoHandler";
import { videoHandler } from "./handlers/videoHandler";
import { voiceHandler } from "./handlers/voiceHandler";

bot.command("start", startHandler);
bot.on("message:text", textHandler);
bot.on("message:photo", photoHandler);
bot.on("message:voice", voiceHandler);
bot.on("message:video", videoHandler);

// 🧯 Global error catcher
bot.catch((err) => {
  console.error("❌ Error in bot:", err);
});

// 🚀 Express setup
const server = express();
server.use(express.json());

server.get("/", (_req, res) => {
  res.send("Bot is healthy.");
});

server.get("/regeneratePreview", async (req, res) => {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: "Missing confession ID" });
  }

  try {
    const docSnap = await db.collection("confessions").doc(id).get();
    if (!docSnap.exists) {
      return res.status(404).json({ error: "Confession not found" });
    }

    const content = docSnap.data()?.content;
    if (!content || typeof content !== "object" || !("file_id" in content)) {
      return res.status(400).json({ error: "Invalid or missing file_id" });
    }

    const fileId = (content as any).file_id;
    const file = await bot.api.getFile(fileId);
    const botToken = process.env.BOT_TOKEN!;
    const fileUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;
    res.json({ url: fileUrl });
  } catch (err) {
    console.error("❌ Error fetching file preview", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.use("/webhook", webhookCallback(bot, "express"));

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening at http://${HOST}:${PORT}`);
});
