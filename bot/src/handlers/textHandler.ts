import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "../../../shared/confession";

export const textHandler = async (ctx: Context) => {

const msg = ctx.message;
  
const confession: Confession = {
type: "text",
content: msg?.text || "",
status: "pending",
createdAt: new Date(),
telegramUserId: msg?.from?.id?.toString() || "unknown",
username: msg?.from?.username || null,
};

await db.collection("confessions").add(confession);

return ctx.reply(
    "✅ Xabaringiz qabul qilindi. Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi."); 
};