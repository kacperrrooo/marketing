const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    if (!args.length) {
        message.channel.send("> ❌ **Musisz podać treść błędu!**");
        return;
      }
      if (
        message.author.id == "694238217385279538" ||
        message.author.id == "602849479355269130" ||
        message.author.id == "637592175659712532" ||
        message.author.id == "700658462656561215"
      ) {
        message.author.send(
          "<a:false:702810788980588654> **Ten serwer został zablokowany!**"
        );
        return;
      }
      const bug = new Discord.MessageEmbed()
        .setTitle("Zgłoszono błąd do administracji!")
        .setThumbnail(message.author.avatarURL())
        .setDescription(
          "Dziękujemy za zgłąszanie błędu naszego bota do administracji! Jeśli nasi programiści będą potrzebowali więcej informacji dot. błędu skontaktują się z tobą. Jeśli chcesz mieć bezpośredni kontakt z administracją dołącz na [**serwer support**](https://discord.gg/veR9UrF)"
        )
        .addField(
          "Szczegóły błędu",
          `⏰ **Zgłaszający**: ${message.author.tag} \nID: ${message.author.id} \n\n🧭 **Serwer**: ${message.guild.name} \n**ID**: ${message.guild.id} \n\n✏️ **Treść**: ${args2} \n\n 📅 **Data**: ${today}`
        )
        .addField(
          "Wszelkie trollowanie przez tą komendę będzie surowo karane",
          "\u200B"
        )
        .setFooter(
          "Komenda została wywołana przez: " +
            message.author.tag +
            " | ID: " +
            message.author.id,
          message.author.avatarURL()
        );
      const bugADM = new Discord.MessageEmbed()
        .setTitle("Zgłoszono błąd!")
        .setThumbnail(message.author.avatarURL())
        .addField(
          "Szczegóły błędu",
          `⏰ **Zgłaszający**: ${message.author.tag} \nID: ${message.author.id} \n\n🧭 **Serwer**: ${message.guild.name} \n**ID**: ${message.guild.id} \n\n✏️ **Treść**: ${args2} \n\n 📅 **Data**: ${today}`
        )
        .setFooter("Moduł reportowania bug'ów w Marketing");
      message.channel.send(bug);
  
      client.channels.cache.get("706063492867948565").send(bugADM);
      cooldownDelay = 15;
    
}

module.exports.help = {
    name: "bug"
}