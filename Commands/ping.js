const Discord = require("discord.js")

module.exports = {
    name: "ping",

    async run(bot, message) {
        await message.reply(`Latence API Discord : \`${bot.ws.ping}ms\``)
    }
}