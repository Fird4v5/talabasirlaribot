import { Context } from "grammy"

export const startHandler = (ctx: Context) => {
   return ctx.reply(`
    👋 <b>Salom!</b>
    
Bu bot orqali siz <b>talabalik yillarida boshdan kechirgan voqealaringizni anonim tarzda yuborishingiz mumkin.</b>
    
📩 <b>Sirlaringiz istalgan formatda bo'lishi mumkin:</b>
- Matn
- Rasm, video, ovozli xabar

✨<b>Ixtiyoriy:</b>
👉 Oxirida <b>universitet nomini</b> yozsangiz, boshqalar uchun qiziqroq va haqiqatga yaqinroq bo'ladi.

📢 <b>Tanlangan sirlar @TalabaSirlari kanalida ulashiladi.</b>

<b>Anonimlik 💯 kafolatlanadi.</b>
`, 
    {parse_mode: "HTML",}
  );
}



