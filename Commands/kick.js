const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Expulser un membre du serveur.",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à expulser",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison de l'expulsion",
            required: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("membre")
        if(!user) return message.reply("Il n'y a pas de membre à bannir.")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Il n'y a pas de membre à bannir.")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie."

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous expulser vous-même.")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas expulser le propriétaire du serveur.")
        if(member && !member.kickable) return message.reply("Vous ne pouvez pas expulser ce membre.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas expulser une personne hiérarchiquement égale ou supérieure à vous.")

        try {await user.send(`**Vous avez été expulsé du serveur ${message.guild.name}**\n⚠️ CETTE EXPULSION N'EST PAS DÉFINITIVE ⚠️\n\nAuteur de l'expulsion: ${message.user.tag}\n\nRaison: ${reason}`)} catch(err) {}
        
        await message.reply(`${message.user} a expulsé ${user.tag}\n\nRaison: ${reason}`)

        await member.kick(reason)
    }
}