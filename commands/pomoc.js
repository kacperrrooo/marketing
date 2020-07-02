const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    const exampleEmbed = new Discord.MessageEmbed()
  .setTitle("<:MarketingLogo:688694803420282890> __**MARKETING**__")
  .addField(":dividers: Wersja bota:", "2.3.5", true)
  .addField(
    ":abacus: Serwer support",
    "[Kliknij żeby dołączyć](https://discord.gg/6F4KSDk)",
    true
  )
  .addField(
    ":robot: Link do zaproszenia bota",
    "[Kliknij żeby dodać](https://discordapp.com/oauth2/authorize?client_id=688312861927276554&permissions=2147483127&scope=bot)",
    false
  )
  .addField(":brain: Developerzy bota", "Mondonno#6652 | dsonyy#1895", true)
  .addField(
    ":pushpin: Dodatkowe informacje",
    "Marketing to bot reklamowy nowej generacji, z różnymi dodatkowymi funkcjami i komendami moderacyjnymi! Jeśli szukasz bota który zjednoczy inne boty reklamowe, dorze trafiłeś! Dołącz do [serwera support](https://discord.gg/6F4KSDk) aby dowiedzieć się więcej!"
  )
  .setFooter("© by Mondonno#6652 2020");
    const embed_simple = new Discord.MessageEmbed()
    .setTitle(
      "<a:Zweryfikowane:688397020624453701> Wysłano prywatną wiadomość"
    )
    .setFooter(
      "Komenda została wywołana przez: " +
        message.author.tag +
        " | ID: " +
        message.author.id,
      message.author.avatarURL()
    );

  const embed_commands = new Discord.MessageEmbed()
    .setTitle("<:MarketingLogo:688694803420282890> __**MARKETING**__")
    .setDescription(
      ":speech_balloon: Lista komend do bota **Marketing** \n\n``&r/&reklama [treść reklamy] - Ustawia reklame``  __**`(co 20 sek.)`**__" +
        "\n``&u/&ustaw #kanał - Ustawia kanał z reklamami``  __**`(co 15 sek.)`**__" +
        "\n``&jak - Poradnik dodania serwera do listy Marketingu``  __**`(co 5 sek.)`**__" +
        "\n``&zapros - Link ze swoim zaproszeniem do bota`` __**`(co 5 sek.)`**__\n" +
        "``&bug - Zgłasza błąd do administracji``  __**`(co 15 sek.)`**__\n" +
        "``&staty - Pokazuje statystyki serwera, kanał reklam, i czy reklama jest zaakceptowana``  __**`(co 5 sek.)`**__\n" +
        "``&wyswietl - Pokazuje reklamę serwera``  __**`(co 5 sek.)`**__"
    )
    .setFooter("© by Mondonno#6652 2020");

  message.channel.send(embed_simple);
  message.author.send(exampleEmbed);
  message.author.send(embed_commands);
}

module.exports.help = {
    name: "pomoc"
}