import { Context } from "grammy"; 
import { db } from "../firebase";
import { Confession } from "./types";

export const videoHandler = async (ctx: Context) => {
    const video = ctx.message?.video; 
    if (!video) return; 

    const confession: Confession = {
        type: "video",
        content: {
            file_id: video.file_id,
            file_unique_id: video.file_unique_id,
        },
        status: "pending",
        createdAt: new Date(),
        telegramUserId: ctx.from?.id.toString() || "unknown",
        username: ctx.from?.username || null,
    };

    await db.collection("confessions").add(confession);
    return ctx.reply(
        "🎥 Videongiz qabul qilindi. Agar u random hikoyalar orasida bo'lsa, kanalda ulashiladi."
    );

    }; 

