const Discord = require("discord.js");
const fs = require("fs")
const moment = require("moment")

let config = require("./config.json")
let package = require("./package.json")


const client = new Discord.Client();

client.on("ready", async () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.users.get(config.DevID).send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setStatus("online")
});
setInterval(async function() { 

    var random = [`on ${client.guilds.size} servers`,`with ${client.users.size} members!`,`with ${client.users.get(config.DevID).tag}`,`${config.prefix}help`,`version ${package.version}`] 
    let status = random[Math.floor(Math.random() * random.length)] 

    client.user.setActivity(status, {type: "PLAYING"}) //PLAYING, STREAMING, LISTENING, WATCHING
}, 30000) 


//Login
client.login(process.env.BOT_TOKEN)
client.on('message', message => {


  //VARS
  var args = message.content.slice(config.prefix).trim().split(" ")
  var command = args.shift()


  //KICK COMMAND
  if(command == `${config.prefix}kick`) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
    
        let member = message.mentions.members.first() 
  
        if(!member) 
  
          return message.reply(`Please enter a user!`); 

        if(!member.kickable) 
  
          return message.reply("Unable to kick this user."); 
  
        let reason = args.slice(2).join(' '); 
  
        if(!reason) return message.reply(`Enter a reason!`) 
  
        if(member.user.id == config.DevID) return message.reply(`Can't kick the Dev!`)
  
        await = member.kick(reason)
    
        return message.reply(`**${member.user.username}**#${member.user.discriminator} got kicked because of: **${reason}**`);
  
        } else {
          message.channel.send(`You need Kick Permissions. ${message.author}`)
        } 
}

   //BAN COMMAND
   if(command == `${config.prefix}ban`) {
    if(message.member.hasPermission("BAN_MEMBERS")) {
        let member = message.mentions.members.first() 
  
        if(!member) 

          return message.reply(`Please enter a user!`);
  
        if(!member.bannable) 
  
          return message.reply("Unable to ban this user."); 
    
  
        let reason = args.slice(2).join(' ');
  
        if(!reason) return message.reply(`Enter a reason!`) 
  
        if(member.user.id == config.DevID) return message.reply(`Can't ban the Dev!`) 
  
        await = member.ban(reason)
    
        return message.reply(`**${member.user.username}**#${member.user.discriminator} got banned because of: **${reason}**`); 
        } else {
          message.channel.send(`You need Ban Permissions. ${message.author}`) 
        } 
}

  //HELP COMMAND
  if(command == `${config.prefix}help`) {
   
    var embed = new Discord.RichEmbed()

      .setColor(0xc5ca09)
      .setTitle(`${client.user.username}'s Commands`)
      .addField(`**__Moderation__**`,"`kick`,`ban`", true)
      // .addField(`**__ka__**`," soon more^^", false)
      .addField(`**__Other__**`,"`ping`,`avatar`,`invite`,`servers`,`user`", true)
      .addField(`**__Dev__**`,"`uptime`,`restart`,`eval`")

    message.channel.send(embed);
  }

  //PING COMMAND
  if(command == `${config.prefix}ping`) {
    message.channel.send(`Pong! ${Math.round(client.ping)}ms`);
  }

  //UPTIME COMMAND
  if(message.content == `${config.prefix}uptime`) {
    if(message.author.id == config.DevID || message.author.id == "402483602094555138") {
      let t = new Date(client.uptime) 
      
      let days = t.getUTCDate()-1;
  
      let minutes = t.getUTCMinutes();
      let hours = t.getUTCHours();
  
  
      let seconds = t.getUTCSeconds();
  
  
      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`; 
  
      message.channel.send(uptime)
    } else {
      message.reply(`Only the Dev can use this!`)
    }
  }


  //RESTART COMMAND
  if(command == `${config.prefix}restart`) {
    if(message.author.id == config.DevID || message.author.id == "402483602094555138") {
      let restartchannel = message.channel

      restartchannel.send(`Restart in progress.`) 
      client.destroy() 
      .then(client.login(process.env.BOT_TOKEN).then(async () => restartchannel.send(`${message.author}, Restarted!`))) 
    } else {
      message.reply(`Only the Dev can use this!`)
    }
  }

   //Eval
   if(command == `${config.prefix}eval`) {
    if(message.author.id == config.DevID || message.author.id == "402483602094555138") {
        let command = args.join(" ");
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          } 
         try {
          let code = args.join(" ");
          let evaled = eval(command);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }              
    } else {
        message.channel.send(`${message.author}, You can't use this command!`)
    } 
} 

  //AVATAR COMMAND
  if(command == `${config.prefix}avatar`) {
    const target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member

    var AvEmbed = new Discord.RichEmbed()

    .setColor(target.highestRole.hexColor || 0x0e5ca3)
    .setTitle(`Avatar: ${target.user.username}`)
    .setImage(target.user.displayAvatarURL)
    .setDescription(`[Avatar Link](${target.user.displayAvatarURL})`)

    message.channel.send(AvEmbed)

} 

  //INVITE COMMAND
  if(command == `${config.prefix}invite`) {
    var embed = new Discord.RichEmbed()

    .setColor(0x0acdfe)
    .setTitle(`Invite ${client.user.username}!`)
    .setDescription(`[Just click here!](https://discordapp.com/oauth2/authorize?client_id=504710565369741322&permissions=2117598711&redirect_uri0=&&scope=bot)`)

    message.channel.send(embed)
  }

  //SERVERS COMMAND
  if(command == `${config.prefix}servers`) {
    var SEmbed = new Discord.RichEmbed()

    .setColor(message.guild.member(client.user.id).highestRole.hexColor || 0xff000e)
    .setTitle(`All servers where I'm on.`)
    .setDescription(`**${client.guilds.size}** Servers: \n \n${client.guilds.map(servers => servers).join(",\n")}`)

    message.channel.send(SEmbed)
  }

  //USER COMMAND
  if(command == `${config.prefix}user`) {

    const target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member

    var userI = new Discord.RichEmbed()

    .setColor(target.highestRole.hexColor || 0x000000)
    .setTitle(`Info about ${target.user.username}`)
    .addField(`Name + Tag`,`${target.user.username}#${target.user.discriminator}`)

    if(target.user.username != target.displayName) {
        userI.addField(`Nickname`, `${target.displayName}`)
      } else {
          userI.addField(`Nickname`, `-`)
      }

        userI.addField(`ID`,`${target.id}`)
        userI.addField(`Status`,`${config.StatusTypings[target.user.presence.status]}`)
        .setTimestamp()

        userI.addField(`Roles`,`${target.roles.map(role => role).splice(1).join(" | ") || `-`}`)

      if(target.user.presence.game) {
          userI.addField(`Activity`,`${config.PlayingTypings[target.user.presence.game.type]} **${target.user.presence.game.name}**`)
      } else {
          userI.addField(`Activity`,`~`)
      }

      userI.addField(`Account created at`,`${moment(target.user.createdAt).format("DD.MM.YYYY")}`)

        userI.setThumbnail(target.user.displayAvatarURL)

        message.channel.send(userI)
  }

});