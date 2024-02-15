const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Bannir un membre du serveur.",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à bannir",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison du ban",
            required: false
        }
    ],

    async run(bot, message, args) {
        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Il n'y a pas de membre à bannir.")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie."

            if(message.user.id === user.id) return message.reply("Vous ne pouvez pas vous bannir vous-même.")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire du serveur.")
            if(member && !member.bannable) return message.reply("Vous ne pouvez pas bannir ce membre.")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas bannir une personne hiérarchiquement égale ou supérieure à vous.")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Le membre que vous avez renseigné est déjà banni.")

            try {await user.send(`**Vous avez été banni du serveur ${message.guild.name}**\n⚠️ CE BANNISSEMENT EST DÉFINITIF ⚠️\n\nAuteur du ban: ${message.user.tag}\n\nRaison: ${reason}`)} catch(err) {}
            
            await message.reply(`${message.user} a banni ${user.tag}\n\nRaison: ${reason}`)

            await message.guild.bans.create(user.id, {reason: reason})
        } catch (err) {
            return message.reply("Il n'y a pas de membre à bannir.")
        }
    }
}