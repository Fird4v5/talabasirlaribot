import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";
dotenv.config();

import { startHandler } from "./handlers/startHandler";
import { textHandler } from "./handlers/textHandler";
import { photoHandler } from "./handlers/photoHandler";
import { videoHandler } from "./handlers/videoHandler";
import { voiceHandler } from "./handlers/voiceHandler";

import { db } from "./firebase";
import express from "express";

// 🎯 Initialize bot
const bot = new Bot(process.env.BOT_TOKEN!);

// ✅ Register bot handlers
bot.command("start", startHandler);
bot.on("message:text", textHandler);
bot.on("message:photo", photoHandler);
bot.on("message:voice", voiceHandler);
bot.on("message:video", videoHandler);


// 🧯 Global bot error catcher
bot.catch((err) => {
  console.error("❌ Error in bot:", err);
});

// 🚀 Express server setup
const server = express();
server.use(express.json());

// ✅ Health check route (needed for Fly.io)
server.get("/", (_req, res) => {
  res.send("Bot is healthy.");
});

// ✅ Regenerate media preview route
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

// 🪝 Webhook route (Grammy-native, stable & fast)
server.use("/webhook", webhookCallback(bot, "express"));

// 🔌 Start server
const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening at http://${HOST}:${PORT}`);
});
