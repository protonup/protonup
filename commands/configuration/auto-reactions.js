const Discord = require('discord.js');
const ms = require('ms');
const AutoResponders = require('../../database/models/AutoReactions');
const { parse } = require("twemoji-parser");


module.exports = {
        name: 'auto-reactions',
        description: 'Setup the auto reactions system.',
        aliases: ['reactions-auto', 'auto-react', 'autoreactions'],
        guildOnly: true,
        cat: 'configuration',
        permissions: ['MANAGE_GUILD'],
        botpermissions: ["SEND_MESSAGES", "EMBED_LINKS", ],
        async execute(message, args, client) {
            const prompts = await message.translate("REACTIONS_PROMPTS")
            const ID = message.member.id;
            const lang = await message.translate("AUTO_REACTIONS")
            if (!args.length) {


                const ticketDB = await AutoResponders.find({ serverID: message.guild.id })
                let tip = await message.translate("DASHBOARD")

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))

                .setColor("#F0B02F")
                    .setTitle(`${message.guild.settings.lang === "fr" ? "Réactions automatiques":"Auto reactions"}`)
                    .setDescription(`${tip}\n${message.guild.premium ? lang.has :lang.not}`)
                    .addField(`Triggers (${ticketDB.length}/${message.guild.premium ? "8":"3"})`, `${ticketDB.length > 0  ? `${ticketDB.map(t=>`\`${t.id}\`\n **Reaction**: ${t.message_reaction === "every"? `${message.guild.settings.lang === "fr" ? "Tous les messages":"Every message"}`:t.message_reaction}\n**${lang.channel}:** ${t.channelID === "all" ? `${message.guild.settings.lang === "fr" ? "Tous les salon":"Every channel"}`: `<#${t.channelID}>`} `).join("\n")}`: lang.no}`)
            .addField(`${message.guild.settings.lang === "fr" ? "`📜` Utilisation":"`📜` Use"}`, lang.use.replace("{prefix}",message.guild.settings.prefix).replace("{prefix}",message.guild.settings.prefix))
     

        .setThumbnail(url = message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))

        .setFooter(message.client.footer, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))


        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).then((m) => {
            if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return;
            if (!message.channel.permissionsFor(message.guild.me).has("ADD_REACTIONS")) return;
            m.react("✅")

            const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const collector = message.createReactionCollector({ filter, time: 1000000 });
            collector.on('collect', r => m.delete());
            collector.on('end', collected => m.reactions.removeAll());




        });


      return;
    }
if(args[0].toLowerCase() === "create"){
    const ticketDB = await AutoResponders.find({ serverID: message.guild.id })

    if(ticketDB.length === 3 && !message.guild.premium) return message.errorMessage(lang.max)
    const response = await getResponses(message)
                    if (!response || response.cancelled) return message.client.log ? console.log(`Command ${message.content} | Cancelled`) : null


   

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                                var string_length = 10;
                                var randomstring = '';

                                for (var x = 0; x < string_length; x++) {

                                    var letterOrNumber = Math.floor(Math.random() * 2);
                                    if (letterOrNumber == 0) {
                                        var newNum = Math.floor(Math.random() * 9);
                                        randomstring += newNum;
                                    } else {
                                        var rnum = Math.floor(Math.random() * chars.length);
                                        randomstring += chars.substring(rnum, rnum + 1);
                                    }

                                }
                                   const uniqID = randomstring;
    const verynew = new AutoResponders({
        serverID: `${message.guild.id}`,
        channelID: `${response.channel}` ,
        message_reaction: `${response.message_reaction}`,
        id: `${uniqID}`,
        reaction: `${response.emoji}`,
    }).save();
    message.succesMessage(lang.ok.replace("{id}",uniqID));

}else if(args[0].toLowerCase() === "delete" && args.slice(1).join("")){
    let ID = args.slice(1).join("");
let chekexeist = await AutoResponders.findOne({id:ID , serverID: message.guild.id})
if(!chekexeist) return message.errorMessage(`${message.guild.settings.lang === "fr" ? `je n'ai trouvé aucune réaction automatique avec pour id \`${ID}\``:`I did not find any automatic reaction with id $${ID}\``}`)
let de = await AutoResponders.findOneAndDelete({id:ID , serverID: message.guild.id})
return message.succesMessage(`${message.guild.settings.lang === "fr" ? "Réaction automatique supprimée avec succès.":"Automatic reaction succesfully deleted."}`)


}else{
    

  
    const ticketDB = await AutoResponders.find({ serverID: message.guild.id })
                let tip = await message.translate("DASHBOARD")

                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 512 }))

                .setColor("#F0B02F")
                    .setTitle(`${message.guild.settings.lang === "fr" ? "Réactions automatiques":"Auto reactions"}`)
                    .setDescription(`${tip}\n${message.guild.premium ? lang.has :lang.not}`)
                    .addField(`Triggers (${ticketDB.length}/${message.guild.premium ? "8":"3"})`, `${ticketDB.length > 0  ? `${ticketDB.map(t=>`\`${t.id}\`\n **Reaction**: ${t.message_reaction === "every"? `${message.guild.settings.lang === "fr" ? "Tous les messages":"Every message"}`:t.message_reaction}\n**${lang.channel}:** ${t.channelID === "all" ? `${message.guild.settings.lang === "fr" ? "Tous les salon":"Every channel"}`: `<#${t.channelID}>`} `).join("\n")}`: lang.no}`)
            .addField(`${message.guild.settings.lang === "fr" ? "`📜` Utilisation":"`📜` Use"}`, lang.use.replace("{prefix}",message.guild.settings.prefix).replace("{prefix}",message.guild.settings.prefix))
     

        .setThumbnail(url = message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))

        .setFooter(message.client.footer, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))


message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).then((m) => {
if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return;
if (!message.channel.permissionsFor(message.guild.me).has("ADD_REACTIONS")) return;
m.react("✅")

const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
const collector = message.createReactionCollector({ filter, time: 1000000 });
collector.on('collect', r => m.delete());
collector.on('end', collected => m.reactions.removeAll());




});



return;


}
    async function getResponses(message) {
        const validTime = /^\d+(s|m|h|d)$/;
        const validNumber = /^\d+/;
        const responses = {}

        let can = await message.translate("CAN_CANCEL")
        for (let i = 0; i < prompts.length; i++) {
            await message.mainMessageT(`${prompts[i]}\n\n${can}`);
            const filter = m => m.author.id === ID;
            const response =  await message.channel.awaitMessages({ filter, max: 1,})
            const { content } = response.first();
            const m = response.first();
            if (content.toLowerCase() === "cancel") {
                let okk = await message.translate("CANCELED")
                responses.cancelled = true;

message.channel.send(`**${okk}**`)
                return responses;

                break;
            }
            if (i === 0) {
             if(content.toLowerCase() === "all"){
                responses.channel = "all";

             }else{
                let channel = m.mentions.channels.first() || message.guild.channels.cache.get(content) || message.guild.channels.cache.filter(m => m.type === "GUILD_TEXT" && m.name.toLowerCase().includes(content.toLowerCase())).first();
                    if (channel && channel.type === 'GUILD_TEXT' && channel.guild.id === message.guild.id) {
                    if (!channel.viewable||!channel.permissionsFor(message.guild.me).has('SEND_MESSAGES') || !channel.permissionsFor(message.guild.me).has('EMBED_LINKS') ) {
                        let a = await message.translate("CHANNEL_PERMS")
                        return m.errorMessage(a)
                        break;
                    }
                    responses.channel = channel.id;
                } else {
                    let errorChannel = await message.translate("ERROR_CHANNEL")
                    return m.errorMessage(errorChannel)
                    break;
                }
             }

            }
            if (i === 1) {
                if (content.length > 400 || content.length < 1) {
                    let numberErr = await message.translate("MESSAGE_ERROR")
                    return m.errorMessage(numberErr.replace("{amount}", "1").replace("{range}", "400"))
                    break;
                } else {
                    responses.message_reaction = content;
                }

            }
            if (i === 2) {
                let customemoji = Discord.Util.parseEmoji(content);
                if (customemoji.id) {
                   responses.emoji = content
                } else {
                    let CheckEmoji = parse(content, { assetType: "png" });
                    if (!CheckEmoji[0]) {
                        const lange = await message.translate("ROLEREACT")
                        return m.errorMessage(lange.emojiErr)
                        break;
                    }
                    responses.emoji = content;

                }
            }

        }
        return responses;
    }
},
};