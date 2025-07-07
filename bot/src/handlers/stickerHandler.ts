import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "./types";

export const stickerHandler = async (ctx: Context) => {
    const sticker = ctx.message?.sticker; 
    if (!sticker) return;

    const confession: Confession = {
        type: "sticker",
        content: {
            file_id: sticker.file_id,
            file_unique_id: sticker.file_unique_id
        },
        status: "pending",
        createdAt: new Date(),
        telegramUserId: ctx.from?.id.toString() || "unknown",
        username: ctx.from?.username || null,
    };

    await db.collection("confessions").add(confession);
    return ctx.reply("🧸 Sticker qabul qilindi. Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi.");
}