import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "../confession";

export const photoHandler = async (ctx: Context) => {
    const photo = ctx.message?.photo?.pop();
    if (!photo) return; 

    const confession: Confession = {
        type: "photo", 
        content: {
            file_id: photo.file_id,
            file_unique_id: photo.file_unique_id,
        },
        status: "pending",
        createdAt: new Date(),
        telegramUserId: ctx.from?.id?.toString() || "unknown",
        username: ctx.from?.username || null,
    };

    await db.collection("confessions").add(confession);

    return ctx.reply(
        "📸 Rasmingiz qabul qilindi. Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi."
    );

}