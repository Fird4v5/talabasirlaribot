
export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">🛡️ Maxfiylik Siyosati</h1>
      <p className="text-sm text-gray-500 mb-6">
        <strong>So‘nggi yangilanish:</strong> 13-iyul, 2025-yil<br />
        <strong>TalabaSirlariBot (Telegram bot)</strong>
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">1. Kirish</h2>
      <p>
        Sizning maxfiyligingiz biz uchun muhim. Ushbu siyosat orqali biz foydalanuvchilarimizdan qanday
        ma’lumotlar yig‘ilishini, ularning qanday saqlanishini, qanday foydalanilishini va uchinchi tomon
        bilan baham ko‘rilmasligini aniq tushuntiramiz.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">2. Yig‘ilayotgan ma’lumotlar</h2>
      <p>
        <strong>TalabaSirlariBot</strong> foydalanuvchilardan quyidagi ma’lumotlarni avtomatik tarzda qabul qiladi:
      </p>
      <ul className="list-disc pl-6 mt-2 mb-4 space-y-1">
        <li>Yuborilgan anonim xabarlar (matn, rasm, ovozli xabar, video)</li>
        <li>Foydalanuvchining Telegram <code>username</code>i (agar mavjud bo‘lsa)</li>
        <li>Telegram foydalanuvchi ID raqami (faqat ichki maqsadlarda)</li>
        <li>Xabar yuborilgan vaqti (timestamp)</li>
      </ul>
      <blockquote className="text-gray-600 italic border-l-4 pl-4 border-yellow-400 mb-6">
        ❗ Ismingiz, telefon raqamingiz yoki boshqa shaxsiy ma’lumotlaringiz hech qachon ommaga oshkor
        qilinmaydi va e’lon qilinmaydi.
      </blockquote>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">3. Ma’lumotlar qanday saqlanadi</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Matnli xabarlar va metama’lumotlar</strong> Firebase Firestore bazasida saqlanadi.</li>
        <li>
          <strong>Rasmlar, videolar, ovozli xabarlar</strong> Telegram’ning yopiq (private) kanali orqali saqlanadi —
          bu usul orqali fayllar doimiy bo‘ladi va hech qachon o‘chmaydi.
        </li>
        <li>Biz <strong>Firebase Storage</strong> yoki boshqa tashqi serverlarda media fayllarni saqlamaymiz.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">4. Ma’lumotlardan foydalanish maqsadi</h2>
      <p>Yig‘ilgan ma’lumotlar quyidagi maqsadlarda ishlatiladi:</p>
      <ul className="list-disc pl-6 mt-2 mb-4 space-y-1">
        <li>Yuborilgan xabarlarni moderatsiya qilish (tasdiqlash yoki rad etish)</li>
        <li>Tasdiqlangan xabarlarni ommaviy Telegram kanalimizda e’lon qilish</li>
        <li>Barcha jarayonni xavfsiz va foydalanuvchi uchun anonim saqlash</li>
        <li>Statistika va botni yaxshilash uchun ichki tahlillar</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">5. Maxfiylik va xavfsizlik kafolati</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Siz yuborgan xabarlar maxfiy tarzda ko‘rib chiqiladi.</li>
        <li>Hech qanday ma’lumot uchinchi tomon bilan baham ko‘rilmaydi.</li>
        <li>Biz barcha ma’lumotlarni xavfsiz va ishonchli saqlashni ta’minlaymiz.</li>
      </ul>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">6. O‘chirish talablari</h2>
      <p>
        Agar siz yuborgan xabaringizni o‘chirishni xohlasangiz, <strong>bot orqali moderatorlarga murojaat qilishingiz mumkin</strong>.
        Sizning so‘rovingiz tekshirilib, iloji boricha tezroq amalga oshiriladi.
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">7. Bog‘lanish</h2>
      <p>
        Agar sizda ushbu maxfiylik siyosati bo‘yicha savollar bo‘lsa yoki o‘chirish/tuzatish so‘rovlarini yubormoqchi
        bo‘lsangiz, quyidagi manzil orqali biz bilan bog‘laning:
      </p>
      <p className="mt-2">
        <strong>Telegram orqali:</strong>{" "}
        <a
          href="https://t.me/Fird4v5"
          className="text-blue-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          @Fird4v5
        </a>
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-blue-500 mt-6 mb-2">📌 Eslatma</h2>
      <p>
        Ushbu siyosat vaqti-vaqti bilan yangilanishi mumkin. Yangilanishlar ushbu sahifa orqali e’lon qilinadi.
        Foydalanishda davom etganingiz ushbu siyosatga rozilik bildirganingizni anglatadi.
      </p>

      <hr className="my-6" />
    </div>
  );
}
