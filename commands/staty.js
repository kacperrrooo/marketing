const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async(client, message, args,con) =>{
    //Zmienne
    var Reklama_Skf = "";
    var IS_Tr_R_bool = false;
    var ReklamaStatus = "";
    var channel;
    var Ilosc_Reklam = "";
    var wstep = "";
//Łączenie z bazą
    con.query(
      `SELECT * from Kanaly where IDDS = ${message.guild.id}`,
      async function(err, rows) {
        if (!rows.length) {
          channel = "<a:false:702810788980588654> Brak kanału do reklam";
        } else {
          wstep = "<a:true:702810851995942922> **Kanał reklam ustawiony na**";
          channel = client.channels.cache.get(rows[0].Kanal_ID);
        }
//Pobieranie...
        await con.query(
          `SELECT * from Reklamy where IDDS = ${message.guild.id}`,
          function(err, rows) {
            if (!rows.length) {
              IS_Tr_R_bool = false;
              Reklama_Skf =
                "> <a:false:702810788980588654> *Brak ustawionej reklamy*";
            } else {
              IS_Tr_R_bool = true;
              Reklama_Skf =
                "> <a:true:702810851995942922>  Reklama jest ustawiona";
              Ilosc_Reklam = rows[0].Wyslano_L;
              if (rows[0].Zatwierdz == 0) {
                ReklamaStatus = `> <a:true:702810851995942922> **Reklama jest zatwierdzona, i jest wysyłana w cyklu ** *"RANDEOX V1.2"*`;
              } else if (rows[0].Zatwierdz == 1) {
                ReklamaStatus =
                  "> <a:false:702810788980588654>  **Reklama została odrzucona, ustaw jeszcze raz prawidłową reklamę**";
              } else if (rows[0].Zatwierdz == 2) {
                ReklamaStatus =
                  "> <a:LoadingBar:712727482322780170> **Reklama jest w kolejce do zatwierdzenia**";
              }
            }
//Tworzenie embeda statów
            const staty_embed = new Discord.MessageEmbed()
              .setAuthor(
                "Statystyki serwer'a",
                "http://server260631.nazwa.pl/Kolorowy_GIF.gif"
              )
              .setDescription(
                `> ${wstep} *${channel}*\n\n ${Reklama_Skf}\n\n${ReklamaStatus}`
              )
              .setColor("#00FF00")
              .setFooter(
                "Komenda została wywołana przez: " +
                  message.author.tag +
                  " | ID: " +
                  message.author.id,
                message.author.avatarURL()
              );

            message.channel.send(staty_embed);
           
          }
        );
      }
    );
}

module.exports.help = {
    name: "staty"
}