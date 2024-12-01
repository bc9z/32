const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

// إعداد البوت
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const TOKEN = 'MTIxNzg1NDgyNTI1NDA5NzAwNg.GMh3Et.XDI4OjOcIgx4ZyUAXqWAshsdwLG2tHvwKjBPYw';  // استبدل هذا بتوكن البوت الخاص بك
const LOG_FILE = './logs/logs.json'; // ملف السجلات

// عندما يكون البوت جاهزًا
client.once('ready', () => {
    console.log('Bot is ready!');
});

// عند انضمام عضو جديد للسيرفر
client.on('guildMemberAdd', member => {
    const logData = {
        user: member.user.tag,
        id: member.user.id,
        joinedAt: new Date().toISOString(),
        guild: member.guild.name,
        guildId: member.guild.id
    };

    // قراءة السجلات السابقة
    fs.readFile(LOG_FILE, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const logs = JSON.parse(data);
        logs.push(logData);

        // كتابة السجلات إلى الملف
        fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Error writing log file:', err);
            }
        });
    });
});

// تسجيل الدخول للبوت
client.login(TOKEN);
