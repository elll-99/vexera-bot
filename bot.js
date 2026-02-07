const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const token = process.env.BOT_TOKEN;
const web_link = "https://vexera-bot-6m89.onrender.com"; // Bura öz Render linkini yaz

const bot = new TelegramBot(token, { polling: true });
const app = express();

// Render-in pulsuz qalması və çarxın görünməsi üçün bu hissə vacibdir
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda aktivdir`);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Vexora Bot-a xoş gəldiniz! Aşağıdakı düymə ilə çarxı fırladın:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎡 Bonus Spin", web_app: { url: web_link } }]
      ]
    }
  });
});

console.log("Vexora Bot aktivdir...");
