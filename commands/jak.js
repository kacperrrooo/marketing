const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    const embed = new Discord.MessageEmbed()
    .setTitle(":question: Jak skonfigurować bota?")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/688391374252670986/705065795213983844/jak.png"
    )
    .setDescription(
      "*Nasz bot jest bardzo prosty w użyciu, więc mozesz go skonfigurować w 3 niezbędnych korkach!*"
    )
    .addField(
      "1️⃣ Krok pierwszy",
      "Pierwszym krokiem jest ustawienie kanału na którym będą wysyłane reklamy innych serwerów. Aby to zrobić musisz napisać na `&u #wzmainka_kanału_do_reklam`"
    )
    .addField(
      "2️⃣ Krok drugi",
      "Napisz `&r treść_reklamy` by ustawić swoją reklamę"
    )
    .addField(
      "3️⃣  Krok trzeci",
      "Wpisz komendę `&staty` aby zobaczyć czy twoja reklama została zaakceptowana/odrzucona/ lub czeka na sprawdzenie"
    )
    .addField(
      "4️⃣ Krok czwarty",
      "W trzecim kroku możesz się cieszyć że pomyślnie skonfigurowałeś bota!\nJeśli chcesz pomóc innym rozpromowac serwery wpisz komendę `&zapros` i roześlij link znajomym!"
    )
    .addField(
      "Masz jakiś problem dot. bot'a?",
      "[Dołącz na serwer support!](https://discord.gg/6F4KSDk)"
    )
    .setColor("#009eff")
    .setFooter(
      "Komenda została wywołana przez: " +
        message.author.tag +
        " | ID: " +
        message.author.id,
      message.author.avatarURL()
    );
  message.channel.send(embed);
}

module.exports.help = {
    name: "jak"
}