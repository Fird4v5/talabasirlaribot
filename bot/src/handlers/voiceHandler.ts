import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "../confession";


export const voiceHandler = async (ctx: Context) => {

  // 1. Get the highest resolution voice from the message
  const voice = ctx.message?.voice;
  if (!voice) return;

  // 2. Get your storage channel ID from .env

  const channelID = process.env.STORAGE_CHANNEL_ID!; 

  // 3. Re-send the user's voice to the storage channel
    // This ensures Telegram stores it permanently 

    const sentMsg = await ctx.api.sendVoice(channelID, voice.file_id)

    // 4. Get the new file_id from the photo as saved in the channel 

    const storedVoice = sentMsg.voice; 
    if (!storedVoice) {
        console.error("Failed to retrieve stored voice file_id from channel copy.")
        return ctx.reply("❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring")
    }

    // 5. Create the confession object with the new file_id
  const confession: Confession = {
    type: "voice",
    content: {
            file_id: storedVoice.file_id,
            file_unique_id: storedVoice.file_unique_id,
        },
    status: "pending",
    createdAt: new Date(),
    telegramUserId: ctx.from?.id.toString() || "unknown",
    username: ctx.from?.username || null,
  };

  await db.collection("confessions").add(confession);
  return ctx.reply("🎙️ Ovozli xabaringiz qabul qilindi! Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi.");
};
