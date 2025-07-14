import { Context } from "grammy";
import { db } from "../firebase";
import { Confession } from "../confession"; 

export const photoHandler = async (ctx: Context) => {

    // 1. Get the highest resolution photo from the message
    const photo = ctx.message?.photo?.pop();
    if (!photo) return; 

    // 2. Get your storage channel ID from .env

    const channelID = process.env.STORAGE_CHANNEL_ID!; 

    // 3. Re-send the user's photo to the storage channel
    // This ensures Telegram stores it permanently 

    const sentMsg = await ctx.api.sendPhoto(channelID, photo.file_id)

    // 4. Get the new file_id from the photo as saved in the channel 

    const storedPhoto = sentMsg.photo?.pop(); 
    if (!storedPhoto) {
        console.error("Failed to retrieve stored photo file_id from channel copy.")
        return ctx.reply("❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring")
    }

    // 5. Create the confession object with the new file_id

    const confession: Confession = {
        type: "photo", 
        content: {
            file_id: storedPhoto.file_id,
            file_unique_id: storedPhoto.file_unique_id,
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