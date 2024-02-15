const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "Permet de connaître la latence du bot et de l'API Discord.",
    permission: "Aucune",
    dm: true,
    options: [],

    async run(bot, message) {
        await message.reply(`Latence API Discord : \`${bot.ws.ping}ms\`\nLatence Utilisateur : \`${Date.now() - message.createdTimestamp}ms\``)
    }
}