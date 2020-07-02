const fs = require('fs');
const Discord = require('discord.js');
var mysql = require("mysql");
var prefix = "&"
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.commands = new Discord.Collection();

var con = mysql.createPool({
    host: "sql.server260631.nazwa.pl",
    user: "server260631_Marketing",
    password: "Fikimiki9",
    database: "server260631_Marketing",
    debug: false,
    charset: "utf8mb4",
    port: 3306,
    connectTimeout: 60 * 60 * 100000,
  });

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[--:--]: Status [ERROR 404]: File Not Found. Folder 'commands' is empty.");
    }
    jsfile.forEach((f) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props)
    })
    
    console.log(`Ładowanie ${jsfile.length} komend. Prosze czekac...`);
    
    jsfile.forEach((f, i) => {
        require("./commands/" + f);
        console.log(`» ${i + 1}. ${f} został pomyślnie załadowany!`);
    });
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if (!command) return;
    command.run(client,message,args,con)
});

client.on("ready", () => {
    console.log("BOT JEST GOTOWY DO EKSPLOTACJI!")
    client.user.setActivity("&pomoc")

    //Wysyłanie reklam

    var i = 0;
  var channelDB;
  function myLoop() {
    setTimeout(function() {
      con.query(`SELECT * FROM Kanaly ORDER BY RAND() LIMIT 1;`, function(
        err,
        rows
      ) {
        if (err) throw err;
        if (!rows.length) {
          myLoop();
          return;
        }

        channelDB = rows[0].Kanal_ID;
      });
      con.query(`SELECT * FROM Reklamy where Zatwierdz = 0`, async function(
        err,
        rows
      ) {
        if (err) throw err;

        // if(!channel_2){
        //   myLoop()
        //   return
        //
        //  }else
        if (!rows.length) {
          myLoop();
          return;
        }
        //  if(i >= rows.length){
        //   i = 0;
        //   myLoop()
        // }

        //await Promise.all(client.channels.filter(c => c.id === rows[i].channel).map(c => c.send(`\`ID Reklamy:${rows[i].IDR}\n============\`\n\n`+rows[i].Reklama)))

        // console.log(rows[0].channel)

        if (!client.channels.cache.has(channelDB)) {
          myLoop();
          return;
        }
        if (!channelDB) {
          myLoop();
          return;
        }
        if (!rows[i].IDR) {
          myLoop();
          return;
        }
        if (!rows[i].Reklama) {
          myLoop();
          return;
        }
        var Wyslano_L = parseInt(rows[i].Wyslano_L);
        Wyslano_L++;

        await con.query(`Select * from Reklamy`, function(err, rows) {});
        await con.query(
          `UPDATE Reklamy SET Wyslano_L = '${Wyslano_L}' WHERE IDDS = '${rows[i].IDDS}'`,
          function(err, result, fields) {
            if (err) throw err;
            console.log(result);
          }
        );

        client.channels.cache
          .get(`${channelDB}`)
          .send(
            `**ID:** \`${rows[i].IDDS}\` **Nr.** \`${rows[i].IDR}\`\n\n\n` +
              rows[i].Reklama
          );
        i++;
        if (i < rows.length) {
          myLoop();
          Wyslano_L = 0;
        }
        if (i >= rows.length) {
          i = 0;
          Wyslano_L = 0;
          myLoop();
        }
      });
    }, 15000);
  }

  myLoop();

 })

client.login("Njg4MzEyODYxOTI3Mjc2NTU0.XuXUng.fddFirQeBRzAL9D07LTw6D2VOnk")