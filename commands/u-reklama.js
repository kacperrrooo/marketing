const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    //Argument 2
    let args2 = args.slice(1).join(" ");

    //Operacje, w datach
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
  
    today = mm + "-" + dd + "-" + yyyy;

//Operacje z bazą danych
    function Insert() {
        var sqlI = `Insert into Reklamy (IDDS, Reklama, DataDodania) values ('${message.guild.id}', '${args2}', '${today}')`;
        var sql = `SELECT * from Reklamy where IDDS = ${message.guild.id}`;
        //console.log(`${message.guild.id}, ${args}, ${today}`)
        con.query(sql, function(err, row) {
          if (err) throw err;
    
          return;
        });
        con.query(
          `Insert into Reklamy (IDDS, Reklama, DataDodania, Zatwierdz) values (?, ?, ?, ?)`,
          [message.guild.id, args2, today, "2"],
          function(err) {
            if (err) {
              con.query(
                `UPDATE Reklamy SET Reklama = ? where IDDS = ?`,
                [args2, message.guild.id],
                function(err) {
                  con.query(
                    `UPDATE Reklamy SET Zatwierdz = ? where IDDS = ?`,
                    ["2", message.guild.id],
                    function(err) {}
                  );
                  if (err) throw err;
                  console.log(`Updated ${message.guild.name} Ad!`);
                }
              );
              return;
            }
          }
        );
    
        message.react("688694803420282890");
        message.channel.send("> 📯 **Ustawiono reklamę!**");
      }
//Ustawianie, i sprawdzanie reklamy
    await con.query(
        `SELECT * from Kanaly where IDDS = ${message.guild.id}`,
        function(err, rows) {
          if (err) throw err;
          if (rows.length) {
            if (
              message.author.id == "694238217385279538" ||
              message.author.id == "602849479355269130" ||
              message.author.id == " 637592175659712532" ||
              message.author.id == "700658462656561215"
            ) {
              message.author.send(
                "<a:false:702810788980588654> **Ten serwer został zablokowany!**"
              );
              return;
            }
            if (!args.length) {
              return message.channel.send(
                ":eye: **Prawidłowe użycie komendy:** ``&r/reklama reklama_serwera``"
              );
            }
            if (message.mentions.everyone) {
              return message.channel.send(
                ":eye: **Prosimy o ustawianie reklam bez pingów!**"
              );
            }
            var regex = /discord.gg/;
            
            var str = args2;
            var result = regex.test(str);
            console.log(result);
            
  
            if (!message.member.hasPermission("ADMINISTRATOR")) {
              const Permisje = new Discord.MessageEmbed()
                .setDescription(
                  "<a:false:702810788980588654> **Potrzebujesz permisji** `ADMINISTRATOR` **żeby to zrobić!**"
                )
                .setColor("#FF0000");
  
              return message.channel.send(Permisje);
            }
            if (result == false) {
              const NoLink = new Discord.MessageEmbed()
                .setDescription(
                  "<a:false:702810788980588654> **Reklama nie posiada linku do serwera!**"
                )
                .setColor("#FF0000");
              return message.channel.send(NoLink);
            }
            console.log(args2.length);
            if (args2.length >= 45) {
              const SprEmbed = new Discord.MessageEmbed()
                .setTitle("Nowa reklama!")
                .setDescription(
                  `\n\`Serwer:\` ${message.guild.name}\n\n\`Autor:\` ${message.member.user} | **${message.member.user.tag}**\n\n\`Reklama:\` ` +
                    " ```" +
                    `${args2}` +
                    "```" +
                    `\n\n\`Komendy:\`\n\n ` +
                    "```" +
                    `z&odrzuc ${message.guild.id} [powod]\nz&ztw ${message.guild.id}` +
                    "```"
                )
                .setColor("#FFFF");
              client.channels.cache.get("714039546739687455").send(SprEmbed);
              Insert();
              cooldownDelay = 20;
            } else {
              // console.log("XD")
              const NoLetter = new Discord.MessageEmbed()
                .setDescription(
                  "<a:false:702810788980588654> **Reklama musi mieć co najmniej** __`45`__ **znaków!**"
                )
                .setColor("#FF0000");
              return message.channel.send(NoLetter);
            }
          } else {
            message.channel.send(
              "> <:NotAllowed:680780614219202565>  **Musisz najpierw ustawić kanał do reklam! Zrób to za pomocą komendy** ``&u #wzmianka-kanału-do-reklam``"
            );
  
            return;
          }
        }
      );
}

module.exports.help = {
    name: "reklama",
    aliases: ['r'],
}