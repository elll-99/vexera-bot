const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// Tokeni Render-dən götürürük
const token = process.env.BOT_TOKEN;
const app = express();

// 1. BU HİSSƏ ÇARXIN AÇILMASI ÜÇÜNDÜR
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. PORT AYARI (Render üçün vacibdir)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

// 3. TELEGRAM BOT AYARI
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🚀 Vexora Bot Hazırdır! \n\nAşağıdakı düyməyə basaraq çarxı fırlada bilərsiniz:", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "🎡 Bonus Spin",
                    web_app: { url: "https://vexera-bot-6m89.onrender.com" } 
                }]
            ]
        }
    });
});
