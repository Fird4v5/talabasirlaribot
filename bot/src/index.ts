import { Bot } from "grammy";
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
  console.error("❌ Error in bot:", err)
});

// 🚀 Express server setup

const server = express(); 
server.use(express.json()); 

// ✅ Health check route (needed for Fly.io)

server.get("/", (_req, res) => {
  res.send("Bot is healthy.")
})


// ✅ Regenerate media preview route

server.get("/regeneratePreview", async (req, res) => {
  // get the id from query string
  const id = req.query.id as string; 
  if (!id) {
    return res.status(400).json({ error: "Missing confession ID"});
  }

  // fetch the confession document from Firestore
  const docSnap = await db.collection("confessions").doc(id).get(); 
  if (!docSnap.exists) {
    return res.status(404).json({ error: "Confession not found"}); 
  }

  // get the file_id from the document 
  const content = docSnap.data()?.content; 
  if (!content || typeof content !== "object" || !("file_id" in content )) {
    return res.status(400).json({ error: "Invalid or missing file_id"})
  }
  const fileId = (content as any).file_id; 

  // use Grammy to get the actual file path from telegram
  const file = await bot.api.getFile(fileId); 
  
  // construct the full file URL
  const botToken = process.env.BOT_TOKEN!;
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`; 

  // Return the file URL to the dashboard
  res.json({ url: fileUrl })

})


// 🪝 Webhook route

server.post("/webhook", async (req, res) => {
  try {
    await bot.handleUpdate(req.body); 
    res.status(200); 
  } catch (err) {
    console.error("❌ Failed to handle update", err); 
    res.sendStatus(500); 
  }
}); 


// 🔌 Start server

const PORT = parseInt(process.env.PORT || "3000", 10); 
const HOST = "0.0.0.0"; 
const domain = process.env.FLY_APP_NAME || "localhost"; 
const webhookUrl = `https://${domain}.fly.dev/webhook`; 

async function main() {
  await bot.init(); 
  await bot.api.setWebhook(webhookUrl); 
  console.log(`✅ Webhook set to ${webhookUrl}`); 
  server.listen(PORT, HOST, () => {
    console.log(`🚀 Server listening at http://${HOST}:${PORT}`)
  }); 
}

main().catch((err) => {
  console.error("❌ Fatal error during bot startup", err); 
}); 