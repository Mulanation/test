const fs = require('fs');
require('dotenv').config();

module.exports = {
    // --- BOT SETTINGS ---
    BOT_NAME: process.env.BOT_NAME || 'NATTY XMD',
    PREFIX: process.env.PREFIX || '.',
    OWNER_NAME: process.env.OWNER_NAME || 'Alpha The King',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '263776404156',
    
    // --- SESSION & DATABASE ---
    SESSION_ID: process.env.SESSION_ID || 'Natty_Session', // Name of your session folder
    DATABASE_URL: process.env.DATABASE_URL || './database/natty.db',
    
    // --- MENU & STYLING ---
    MENU_STYLE: process.env.MENU_STYLE || 'button', // Options: 'button', 'text', 'list'
    IMG_URL: 'https://i.pinimg.com/originals/db/6b/9f/db6b9f8753232049d97f6c38b2f9f8e4.jpg',
    
    // --- SOCIAL LINKS ---
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029Vb7ti7m9RZAW7APm7U29',
    GROUP_LINK: 'https://chat.whatsapp.com/your-group-link',
    
    // --- AUTO-STATUS & FEATURES ---
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS === 'true' || true,
    AUTO_BLOCK_PM: process.env.AUTO_BLOCK_PM === 'true' || false,
    REJECT_CALLS: process.env.REJECT_CALLS === 'true' || true,
};

// Auto-update notification for the console
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`| ⚙️ | Config.js Updated!`);
    delete require.cache[file];
    require(file);
});
