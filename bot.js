const botconfig = require("./package.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} er online!test`);
  bot.user.setActivity("FiveM");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){
    //!kick feature til Discord

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Kunne ikke finde brugeren.");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Du har ikke adgang til dette.");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Den person kan ikke blive smidt ud!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked Bruger:", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked Af:", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked Fra:", message.channel)
    .addField("Tid:", message.createdAt)
    .addField("Reason:", kReason);

    let kickChannel = message.guild.channels.find(`name`, "reports");
    if(!kickChannel) return message.channel.send("Kunne ikke finde kanalen.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);


    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Kunne ikke finde brugeren.");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_USERS")) return message.channel.send("Du har ikke adgang til dette.");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Den person kan ikke blive smidt ud!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned Bruger:", `${bUser} with ID ${bUser.id}`)
    .addField("Banned Af:", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned Fra:", message.channel)
    .addField("Tid:", message.createdAt)
    .addField("Grund:", bReason);

    let banchannel = message.guild.channels.find(`name`, "reports");
    if(!banchannel) return message.channel.send("Kunne ikke finde kanalen.");

    message.guild.member(bUser).ban(bReason);
    banchannel.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}report`){

    //!report feature til discord

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Kunne ikke finde brugeren.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Rapporteringer")
    .setColor("#15f153")
    .addField("Rapporterede bruger:", `${rUser} med ID ${rUser.id}`)
    .addField("Rapporteret af:", `${message.author} med ID: ${message.author.id}`)
    .addField("Kanal:", message.channel)
    .addField("Tid:", message.createdAt)
    .addField("Grund:", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Kunne ikke finde rapporteringkanalen.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(message.content.toLowerCase() === `${prefix}ping`){
    return message.channel.send("Pong");
  } else if(message.content.toLowerCase() === `${prefix}apply`){
    return message.channel.send("Hvis du vil ansøge, kan du ansøge i en af følgende:");
  } else if(message.content.toLowerCase() === `${prefix}help`){
    return message.channel.send("Hvis du skal have hjælp på discord, kan du gå i et #support-rum eller bruge #discord-regler");
  } else {
    return;
  }


});

bot.login(process.env.BOT_TOKEN);
