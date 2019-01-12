const Discord = require("discord.js"),
      bot = new Discord.Client(),
      fs = require("fs"),
Config = require("./config.json")

const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);


  // Create a new webhook
const hook = new Discord.WebhookClient('webhookID', 'WebhookToken');

// Send a message using the webhook
hook.send('Ich bin jetze am leben!^^')

client.on('message', message => {
  // Ignore messages that aren't from a gui (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('->kick')) {
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});


client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('->ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});



client.on('message', message => {
  
  if (message.content === '->help') {
   
    var embed = new Discord.RichEmbed()

      .setColor(0xFFEE58)

      .setTitle('kuina´s Commands')

      .addField(`**__Moderation__**`,"`kick`,`ban`",true)

      .addField(`**__ka__**`," soon more^^",false)

      .addField(`**__Sonstiges__**`,"`ping`,`avatar`",true)

    message.channel.send(embed);
  }
});


// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === '->ping') {
    // Send "pong" to the same channel
    message.channel.send(`Pong! ${Math.round(client.ping)}ms`);
  }
});

client.on('message', message => {

  if (message.content === '->avatar') {

    message.reply(message.author.avatarURL);
  }
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
if(message.content.indexOf(config.prefix) !== 0) return}); 

client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 

  // Example of changing the bot's playing game to something useful. `client.user` is what the

  // docs refer to as the "ClientUser".

  client.user.setActivity(`on ${client.guilds.size} servers`);

});
