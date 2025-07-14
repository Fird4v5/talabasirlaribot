import { Context } from "grammy"

export const startHandler = (ctx: Context) => {
   return ctx.reply(`
    👋 <b>Salom!</b>
    
Bu bot orqali siz <b>talabalik yillarida boshdan kechirgan voqealaringizni anonim tarzda yuborishingiz mumkin.</b>
    
📩 <b>Hikoyangiz istalgan formatda bo'lishi mumkin:</b>
- Matn
- Rasm, video, ovozli xabar

✨<b>Ixtiyoriy:</b>
👉 Oxirida <b>universitet nomini</b> yozsangiz, boshqalar uchun qiziqroq va haqiqatga yaqinroq bo'ladi.

📢 <b>Tanlangan hikoyalar @TalabaSirlari kanalida ulashiladi.</b>

🛡️<b>Maxfiylik siyosati</b> bilan ushbu link orqali tanishib chiqishingiz mumkin: <a href="https://talabasirlaribot.web.app/privacy">Maxfiylik siyosati</a>
`, 
    {parse_mode: "HTML",}
  );
}



