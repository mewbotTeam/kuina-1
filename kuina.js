const Discord = require("discord.js");
const fs = require("fs")

let Config = require("./config.json")

const client = new Discord.Client();

client.on("ready", async () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.users.get(Config.DevID).send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setStatus("online")
});
setInterval(async function() { //Ein Interval ist eine Funktion die etwas in einer bestimmten Zeit ausführt, sei es der Status oder z.B ein Spam Command xD

    var random = [`${client.guilds.size} servers`,`${client.users.size} members!`,`with ${client.users.get(Config.DevID).tag}`,`${Config.prefix}help`] //Hier legen wir fest, zwischen was der Bot wechseln soll. Dazu immer [] nutzen.
    let status = random[Math.floor(Math.random() * random.length)] //Hier lassen wir die angegebenen Status Typen wechseln. Das ganze "Random"

    client.user.setActivity(status, {type: "PLAYING"}) //PLAYING, STREAMING, LISTENING, WATCHING
}, 30000) //Hier kannstdu in Millisekunden angeben, in welcher Zeit der Bot wechseln soll.


//Login
client.login(process.env.BOT_TOKEN)

client.on('message', message => {


  //VARS
  var args = message.content.slice(Config.prefix.length).trim().split(" ")



  //KICK COMMAND
  if(message.content.startsWith(`${Config.prefix}kick`)) {
      if(message.member.hasPermission("KICK_MEMBERS")) { //Hier checken wir die Rechte vom User, der den Befehl ausführt.
    
        let member = message.mentions.members.first() //Hier legen wir fest, wer der User sein soll, der gekickt werden soll, indem wir ihn mention, also pingen bzw. markieren.
  
        if(!member) //Falls bei einem if ein ! ist, ist es das gegenteil von einem if, also falls etwas "nicht" eintrifft. Also, falls kein User gepingt wird, senden wir dem Autor eine Nachricht, das er etwas vergessen hat.
                    //Bei einem if(!) solltest du immer ein "return" nutzen. Ist einfacher und erspart dir einige Klammern "{}"
  
          return message.reply(`Please enter a user!`); //Nachricht die der Autor bekommt.
  
        if(!member.kickable) //Hier checken wir, ob der Bot überhaupt Rechte hat, den User zu kicken, seien es Kick Rechte die im Fehlen, oder der User hat eine höhere Postion als der Bot, kann alles sein.
  
          return message.reply("Unable  to kick this user."); //Nachricht die der Autor bekommt.
    
  
        let reason = args.slice(2).join(' '); //Hier legen wir einen Grund fest, wieso der jeweilige User gekickt werden soll.
  
        if(!reason) return message.reply(`Enter a reason!`) //Falls kein Grund angegeben ist, wird der Autor drauf hingewiesen.
  
        if(member.user.id == Config.DevID) return message.reply(`Can't kick the Dev!`) //Hier kannst einen so gennanten "Schutz" einbauen, z.B falls der User der gebannt werden soll "DEINE" ID hat, das der Bot sich dann weigert dich zu kicken. 
  
        await = member.kick(reason)
    
        return message.reply(`**${member.user.username}**#${member.user.discriminator} got kicked because of: **${reason}**`); //Bestätigung das der User erfolgreich gekickt wurde.
  
        } else {
          message.channel.send(`You need Kick Permissions. ${message.author}`) //Hier bekommt der Autor der Nachricht einen "Error" das er die angeforderten Rechte nicht hat.
        } 
}

   //BAN COMMAND
   if(message.content.startsWith(`${Config.prefix}ban`)) {
      if(message.member.hasPermission("BAN_MEMBERS")) { //Hier checken wir die Rechte vom User, der den Befehl ausführt.
    
        let member = message.mentions.members.first() //Hier legen wir fest, wer der User sein soll, der gebannt werden soll, indem wir ihn mention, also pingen bzw. markieren.
  
        if(!member) //Falls bei einem if ein ! ist, ist es das gegenteil von einem if, also falls etwas "nicht" eintrifft. Also, falls kein User gepingt wird, senden wir dem Autor eine Nachricht, das er etwas vergessen hat.
                    //Bei einem if(!) solltest du immer ein "return" nutzen. Ist einfacher und erspart dir einige Klammern "{}"
  
          return message.reply(`Please enter a user!`); //Nachricht die der Autor bekommt.
  
        if(!member.bannable) //Hier checken wir, ob der Bot überhaupt Rechte hat, den User zu bannen, seien es Ban Rechte die im Fehlen, oder der User hat eine höhere Postion als der Bot, kann alles sein.
  
          return message.reply("Unable to ban this user."); //Nachricht die der Autor bekommt.
    
  
        let reason = args.slice(2).join(' '); //Hier legen wir einen Grund fest, wieso der jeweilige User gebannt werden soll.
  
        if(!reason) return message.reply(`Enter a reason!`) //Falls kein Grund angegeben ist, wird der Autor drauf hingewiesen.
  
        if(member.user.id == Config.DevID) return message.reply(`Can't ban the Dev!`) //Hier kannst einen so gennanten "Schutz" einbauen, z.B falls der User der gebannt werden soll "DEINE" ID hat, das der Bot sich dann weigert dich zu kicken. 
  
        await = member.ban(reason)
    
        return message.reply(`**${member.user.username}**#${member.user.discriminator} got banned because of: **${reason}**`); //Bestätigung das der User erfolgreich gebannt wurde.
  
        } else {
          message.channel.send(`You need Ban Permissions. ${message.author}`) //Hier bekommt der Autor der Nachricht einen "Error" das er die angeforderten Rechte nicht hat.
        } 
}

  //HELP COMMAND
  if(message.content == `${Config.prefix}help`) {
   
    var embed = new Discord.RichEmbed()

      .setColor(0xc5ca09)
      .setTitle(`${client.user.username}'s Commands`)
      .addField(`**__Moderation__**`,"`kick`,`ban`", true)
      // .addField(`**__ka__**`," soon more^^", false)
      .addField(`**__Other__**`,"`ping`,`avatar`,`invite`,`uptime`", true)

    message.channel.send(embed);
  }

  //PING COMMAND
  if(message.content == `${Config.prefix}ping`) {
    message.channel.send(`Pong! ${Math.round(client.ping)}ms`);
  }

  //UPTIME COMMAND
  if(message.content == `${Config.prefix}uptime`) {
    if(message.author.id == Config.DevID) {
      let t = new Date(client.uptime)

      let months = t.getUTCMonth();
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

  //AVATAR COMMAND
  if(message.content == `${Config.prefix}avatar`) {
    message.reply(message.author.displayAvatarURL);
  }

  //INVITE COMMAND
  if(message.content == `${Config.prefix}invite`) {
    var embed = new Discord.RichEmbed()

    .setColor(0x0acdfe)
    .setTitle(`Invite ${client.user.username}!`)
    .setDescription(`[Just click here!](https://discordapp.com/oauth2/authorize?client_id=504710565369741322&permissions=2117598711&redirect_uri0=&&scope=bot)`)

    message.channel.send(embed)
  }

});





