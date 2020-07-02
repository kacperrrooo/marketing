const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
     //Operacje, w datach
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, "0");
     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
     var yyyy = today.getFullYear();
   
     today = mm + "-" + dd + "-" + yyyy;
     //Reszta
    let channel_2;
    if (!args.length) {
        message.channel.send(
          ":eye: **Prawidłowe użycie komendy:** ``&u/ustaw #wzmianka-kanału-do-reklam``"
        );
        return;
      }
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        var Permisje = new Discord.MessageEmbed()
          .setDescription(
            "<a:false:702810788980588654> **Potrzebujesz permisji** `ADMINISTRATOR` **żeby to zrobić!**"
          )
          .setColor("#FF0000");
  
        return message.channel.send(Permisje);
      }
      author = message.author.tag;
      let channel_l = message.mentions.channels.first();
      authorID = message.author.id;
      const embed = new Discord.MessageEmbed()
        .setTitle(`:bar_chart: **Ustawiono kanał reklam**`)
        .setDescription(`*Ustawiono kanał reklam na* ${channel_l}`)
        .setFooter(
          "Komenda została wywołana przez: " + author + " | ID: " + authorID,
          message.author.avatarURL()
        );
      // con.query(`SELECT * FROM Kanaly where IDDS = ?`,[message.guild.id] ,function(err,rows){
      //    if(!rows.length){
      //    return message.channel.send(':eye: **Prawidłowe użycie komendy:** ``&u/ustaw #wzmianka-kanału-do-reklam``');
  
      //   }
  
      // })
  
      channel_2 = channel_l;
      //  con.query(`Insert into Kanaly (IDDS, Kanal_ID, DataDodania) values (?, ?, ?)`,[message.guild.id, args2, today], function(err){
      //   console.log('hi');
      //   if(err){
      console.log("XXXXX");
      con.query(
        `Insert into Kanaly(IDDS, Kanal_ID, Data_Dodania) values (?, ?, ?)`,
        [message.guild.id, channel_2.id, today],
        function(err) {
          console.log("Run!");
          if (err) {
            con.query(
              `UPDATE Kanaly SET Kanal_ID = ${channel_2.id} where IDDS = ${message.guild.id}`,
              function(err, result) {
                if (err) throw err;
                message.react("688694803420282890");
              }
            );
            return;
          }
        }
      );
      console.log("XXXXX22222");
      channel_l.createInvite({ maxAge: 0 }).then(invite => {
        //  message.channel.send(`***Testowy link do tego serwera*** *#TESTY-NOWYCH-FUNKCJI* https://discord.gg/${invite.code}`)
        con.query(
          `UPDATE Kanaly SET Invite_Code = '${invite.code}' where IDDS = ${message.guild.id}`,
          function(err, result) {
            if (err) throw err;
          }
        );
      });
      message.channel.send(embed);
}

module.exports.help = {
    name: "ustaw",
    aliases: ['u'],
}