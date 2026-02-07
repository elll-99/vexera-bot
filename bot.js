require('dotenv').config(); // 'r' hərfi kiçik olmalıdır
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Bura sənin Mini App linkin gələcək (hələlik nümunə qoyuruq)
const web_link ="https://vexera-bot.onrender.com"; 

bot.start((ctx) => {
    ctx.reply(`Xoş gəldin Vexora dünyasına, ${ctx.from.first_name}! 🚀`, 
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎡 BONUS SPIN', web_link)], // WebApp düyməsi rəngli pəncərə açır
            [Markup.button.callback('👥 REFERRAL', 'ref')],
            [Markup.button.callback('📊 DASHBOARD', 'dash'), Markup.button.callback('⚙️ SETTINGS', 'settings')]
        ])
    );
});

bot.action('ref', (ctx) => ctx.reply('👥 Referal linkin: t.me/Vexora_official_bot?start=' + ctx.from.id));
bot.action('dash', (ctx) => ctx.answerCbQuery('📊 Statistika tezliklə əlavə olunacaq!'));

bot.launch();
console.log("✅ Vexora Bot aktivdir!");// Dashboard düyməsi üçün reaksiya
bot.action('dash', (ctx) => {
    const username = ctx.from.first_name;
    const stats = `📊 *Vexora İstifadəçi Paneli* \n\n` +
                  `👤 İstifadəçi: *${username}* \n` +
                  `💰 Balans: *0 VEX* \n` +
                  `👥 Dəvətlər: *0* \n` +
                  `📅 Qoşulma: *${new Date().toLocaleDateString()}*`;
    
    ctx.replyWithMarkdownV2(stats.replace(/\./g, '\\.')); 
});

// Settings düyməsi üçün reaksiya
bot.action('settings', (ctx) => {
    ctx.reply('⚙️ Parametrlər menyusu:\n\n🔔 Bildirişlər: ✅\n🌍 Dil: Azərbaycan\n🛡️ Hesab Təhlükəsizliyi: Yüksək');

});
