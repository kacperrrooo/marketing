const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    var IFItIS = "";
    await con.query(
      `SELECT * from Reklamy where IDDS = ${message.guild.id}`,
      function(err, rows) {
        if (!rows.length) {
          const wyw = new Discord.MessageEmbed()
            .setDescription(
              "<a:false:702810788980588654> **Brak ustawionej reklamy**"
            )
            .setColor("#FF0000");

          message.channel.send(wyw);
        } else {
          const wyw = new Discord.MessageEmbed()
            .setTitle(`__*ZAWARTOŚĆ REKLAMY TEGO SERWERA*__ `)
            // .setAuthor(
            //   `ZAWARTOŚĆ REKLAMY TEGO SERWERA`,
            //   "https://cdn.discordapp.com/attachments/688391374252670986/718548216647254146/staty-google.gif"
            // )
            .setDescription(` \`\`\`${rows[0].Reklama}\`\`\` `)
            .setColor("#00FF00");
          message.channel.send(wyw);
          cooldownDelay = 5;
        }
      }
    );
}

module.exports.help = {
    name: "wyswietl"
}