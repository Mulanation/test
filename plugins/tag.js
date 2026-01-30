module.exports = {
    command: 'tag',
    execute: async (socket, msg, args, { prefix }) => {
        const from = msg.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        if (!isGroup) return socket.sendMessage(from, { text: "Sweetheart, tags only work in groups. Let's not get lonely. 😉" });

        const metadata = await socket.groupMetadata(from);
        const participants = metadata.participants;
        const sender = msg.key.participant || msg.key.remoteJid;
        const isAdmin = participants.find(p => p.id === sender)?.admin !== null;

        if (!isAdmin) return socket.sendMessage(from, { text: "You aren't an admin, darling. You can't just shout at everyone! 🎀" });

        const action = args[0]?.toLowerCase();
        const text = args.slice(1).join(' ') || "Natty Xmd is calling you! ✨";

        try {
            switch (action) {
                case 'hidetag':
                    // Sends a message that tags everyone invisibly
                    await socket.sendMessage(from, { 
                        text: text, 
                        mentions: participants.map(p => p.id) 
                    });
                    break;

                case 'all':
                case 'tagall':
                    // A bold, visible tag list
                    let tagAll = `*📢 ATTENTION EVERYONE!* ✨\n\n*Message:* ${text}\n\n`;
                    participants.forEach(p => { tagAll += `🌸 @${p.id.split('@')[0]}\n`; });
                    await socket.sendMessage(from, { 
                        text: tagAll, 
                        mentions: participants.map(p => p.id) 
                    }, { quoted: msg });
                    break;

                case 'admins':
                case 'tagadmins':
                    const admins = participants.filter(p => p.admin !== null).map(p => p.id);
                    let adminList = `*👑 Calling All Admins!* ✨\n\n*Issue:* ${text}\n\n`;
                    admins.forEach(a => { adminList += `⭐ @${a.split('@')[0]}\n`; });
                    await socket.sendMessage(from, { 
                        text: adminList, 
                        mentions: admins 
                    }, { quoted: msg });
                    break;

                case 'owner':
                    const owner = participants.find(p => p.admin === 'superadmin')?.id || "Not found";
                    await socket.sendMessage(from, { 
                        text: `*Hey @${owner.split('@')[0]}!* 👑\n\n${text}`, 
                        mentions: [owner] 
                    }, { quoted: msg });
                    break;

                case 'random':
                    const randomUser = participants[Math.floor(Math.random() * participants.length)].id;
                    await socket.sendMessage(from, { 
                        text: `*Luck is in the air!* 🎲\n\nHey @${randomUser.split('@')[0]}, Natty has a crush on you... or maybe just a message: ${text}`, 
                        mentions: [randomUser] 
                    }, { quoted: msg });
                    break;

                case 'warn':
                    const warnUser = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                                   (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage ? msg.message.extendedTextMessage.contextInfo.participant : null);
                    if (!warnUser) return socket.sendMessage(from, { text: "Tag someone to warn them, love. ⚡" });
                    await socket.sendMessage(from, { 
                        text: `*⚠️ WARNING!* ⚠️\n\nHey @${warnUser.split('@')[0]}, behave yourself or I'll have to get mean. 💋`, 
                        mentions: [warnUser] 
                    }, { quoted: msg });
                    break;

                default:
                    await socket.sendMessage(from, { 
                        text: `*Natty Tag Guide* 📣\n\n${prefix}hidetag\n${prefix}tagall\n${prefix}tagadmins\n${prefix}tagowner\n${prefix}tagrandom\n${prefix}tagwarn` 
                    });
            }
        } catch (e) {
            console.error(e);
        }
    }
};
