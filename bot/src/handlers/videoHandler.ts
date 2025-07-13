import { Context } from "grammy"; 
import { db } from "../firebase";
import { Confession } from "../confession";
import dotenv from 'dotenv'; 
dotenv.config(); 

export const videoHandler = async (ctx: Context) => {

    // 1. Get the highest resolution video from the message
    const video = ctx.message?.video; 
    if (!video) return; 

    // 2. Get your storage channel ID from .env
    const channelID = process.env.STORAGE_CHANNEL_ID!; 

    // 3. Re-send the user's video to the storage channel
    // This ensures Telegram stores it permanently 

    const sentMsg = await ctx.api.sendVideo(channelID, video.file_id);

    // 4. Get the new file_id from the video as saved in the channel 

    const storedVideo = sentMsg.video;

    if (!storedVideo) {
        console.error("Failed to retrieve stored video file_id from channel copy.")
        return ctx.reply("❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring")
    }

    // 5. Create the confession object with the new file_id
    const confession: Confession = {
        type: "video",
        content: {
            file_id: storedVideo.file_id,
            file_unique_id: storedVideo.file_unique_id,
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

