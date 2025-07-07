import { Context } from "grammy"
import dotenv from "dotenv";
dotenv.config();

const channelURL = process.env.CHANNEL_KEY!;

export const startHandler = (ctx: Context) => {
   return ctx.reply(`
    👋 Salom! Bu yerga siz talabalik yillarizda sodir bo'lgan o'z hikoyalaringizni <b>anonim</b> tarzda yuborishingiz mumkin.
    
📩 <b>Hikoyangiz "istalgan formatda" bo'lishi mumkin:</b>
- Matn
- Rasm, video, stiker, ovozli xabar

✨<b>Ixtiyoriy:</b>
👉 Oxirida universitet nomini yozsangiz, boshqalar uchun qiziqroq va haqiqatga yaqinroq bo'ladi.

<b>📢Hikoyalar ushbu kanalda ulashiladi:</b> ${channelURL} 
    
<b>Anonimlik 💯 kafolatlanadi.</b>`, 
    {parse_mode: "HTML",}
  );
}



