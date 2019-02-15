const Discord = require("discord.js"),
      client = new Discord.Client(),
      fs = require("fs"),
Config = require("./config.json")

const client = new Discord.Client();

let config = require("./config.json")
let package = require("./package.json")



client.on("ready", async () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.users.get(config.OwnerID).send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setStatus("online")
});
setInterval(async function() { 

    var random = [`on ${client.guilds.size} servers`,`with ${client.users.size} members!`,`with ${client.users.get(config.OwnerID).tag}`,`${config.prefix}help`,`version ${package.version}`] 
    let status = random[Math.floor(Math.random() * random.length)] 

    client.user.setActivity(status, {type: "PLAYING"}) //PLAYING, STREAMING, LISTENING, WATCHING
}, 30000) 


//Login
client.login(process.env.BOT_TOKEN)
client.on('message', message => {


  //VARS
  var args = message.content.slice(config.prefix).trim().split(" ")
  var command = args.shift()

   //HELP COMMAND
   if(command == `${config.prefix}help`) {
   
    var embed = new Discord.RichEmbed()

      .setColor(0xc5ca09)
      .setTitle(`${client.user.username}'s Commands`)
      .addField(`**__Information__**`,"`bot`,`servers`,`ping`", true)
      .addField(`**__Moderation__**`,"`kick`,`ban`", true)
      .addField(`**__Other__**`,"`avatar`,`invite`", false)
      .addField(`**__Dev__**`,"`uptime`,`restart`,`eval`",false)

    message.channel.send(embed);
  }

  //PING COMMAND
  if(command == `${config.prefix}ping`) {
    message.channel.send(`Pong! **${Math.round(client.ping)}**ms`);
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
    .setTitle(`Invites!`)
    .setDescription(`[Click here to invite me!](https://discordapp.com/oauth2/authorize?client_id=504710565369741322&permissions=2117598711&redirect_uri0=&&scope=bot) \nJoin my Support Server [here](https://discord.gg/KKG2VP4)`)

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

    //BOT COMMAND
    if(command == `${config.prefix}bot`) {
      let t = new Date(client.uptime)

      let days = t.getUTCDate()-1;

      let minutes = t.getUTCMinutes();
      let hours = t.getUTCHours();


      let seconds = t.getUTCSeconds();


      let uptime = `**${days}**d, **${hours}**h, **${minutes}**m, **${seconds}**s`;

    var infoEmbed = new Discord.RichEmbed()

    .setColor(message.guild.member(client.user.id).highestRole.color || 0xc5ca09)
    .setAuthor(`Informations about ${client.user.username}`)
    .setDescription(`My prefix is **${config.prefix}**`)
    .addField(`Name + Tag`,`**${client.user.username}**#${client.user.discriminator}`,true)
    .addField(`ID`,`${client.user.id}`,true)
    .addField(`Dev`,`**${client.users.get(config.OwnerID).username}**#${client.users.get(config.OwnerID).discriminator}`, true)
    .addField("Ping",`Discord API: **${Math.round(client.ping)}**ms`, true)
    .addField(`Uptime`,`${uptime}`, true)
    .addField("Status",`${config.Usertypes[client.user.presence.status]}`,true)
    .addField("Created at",`**${moment(client.user.createdAt).format("DD.MM.YYYY")}**`,true)
    .setThumbnail(client.user.displayAvatarURL)

    message.channel.send(infoEmbed)
  }

  //KICK COMMAND
  if(command == `${config.prefix}kick`) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
    
        let member = message.mentions.members.first() 
  
        if(!member) 
  
          return message.reply(`Please enter a user!`); 

        if(!member.kickable) 
  
          return message.reply("Unable to kick this user."); 
  
        let reason = args.slice(1).join(' '); 
  
        if(!reason) return message.reply(`Enter a reason!`) 
  
        if(member.user.id == config.OwnerID) return message.reply(`Can't kick the Dev!`)
  
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
    
  
        let reason = args.slice(1).join(' ');
  
        if(!reason) return message.reply(`Enter a reason!`) 
  
        if(member.user.id == config.OwnerID) return message.reply(`Can't ban the Dev!`) 
  
        await = member.ban(reason)
    
        return message.reply(`**${member.user.username}**#${member.user.discriminator} got banned because of: **${reason}**`); 
        } else {
          message.channel.send(`You need Ban Permissions. ${message.author}`) 
        } 
  }


  //UPTIME COMMAND
  if(command == `${config.prefix}uptime`) {
    if(message.author.id == config.OwnerID || message.author.id == config.DevID) {
      let t = new Date(client.uptime) 
      
      let days = t.getUTCDate()-1;
  
      let minutes = t.getUTCMinutes();
      let hours = t.getUTCHours();
  
  
      let seconds = t.getUTCSeconds();
  
  
      let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`; 
  
      message.channel.send(uptime)
    } else {
      message.reply(`Only the Dev can use this!`)
    }
  }


  //RESTART COMMAND
  if(command == `${config.prefix}restart`) {
    if(message.author.id == config.OwnerID || message.author.id == config.DevID) {
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
    if(message.author.id == config.OwnerID || message.author.id == config.DevID) {
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


});
