import express from "express";
import { Bot } from "grammy";
import dotenv from "dotenv";
dotenv.config();

import { startHandler } from "./handlers/startHandler";
import { textHandler } from "./handlers/textHandler";
import { photoHandler } from "./handlers/photoHandler";
import { voiceHandler } from "./handlers/voiceHandler";
import { videoHandler } from "./handlers/videoHandler";
import { stickerHandler } from "./handlers/stickerHandler";

const bot = new Bot(process.env.BOT_TOKEN!);

// Register handlers
bot.command("start", startHandler);
bot.on("message:text", textHandler);
bot.on("message:photo", photoHandler);
bot.on("message:voice", voiceHandler);
bot.on("message:video", videoHandler);
bot.on("message:sticker", stickerHandler);

// Catch all errors
bot.catch((err) => {
  console.error("❌ Error in bot:", err);
});

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = "0.0.0.0";
const domain = process.env.FLY_APP_NAME || "localhost";
const webhookUrl = `https://${domain}.fly.dev/webhook`;

async function main() {
  // ✅ Initialize bot before using webhooks
  await bot.init();

  // ✅ Register webhook with Telegram
  await bot.api.setWebhook(webhookUrl);
  console.log(`✅ Webhook set to ${webhookUrl}`);

  // ✅ Add webhook route AFTER init
  app.post("/webhook", async (req, res) => {
    try {
      await bot.handleUpdate(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.error("❌ Failed to handle update", err);
      res.sendStatus(500);
    }
  });

  // ✅ Start server
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
  });
}

main().catch((err) => {
  console.error("❌ Fatal error during bot startup:", err);
});
