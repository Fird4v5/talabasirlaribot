import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "../confession";

export const voiceHandler = async (ctx: Context) => {
  const voice = ctx.message?.voice;
  if (!voice) return;

  const confession: Confession = {
    type: "voice",
    content: {
            file_id: voice.file_id,
            file_unique_id: voice.file_unique_id,
        },
    status: "pending",
    createdAt: new Date(),
    telegramUserId: ctx.from?.id.toString() || "unknown",
    username: ctx.from?.username || null,
  };

  await db.collection("confessions").add(confession);
  return ctx.reply("🎙️ Ovozli xabaringiz qabul qilindi! Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi.");
};
