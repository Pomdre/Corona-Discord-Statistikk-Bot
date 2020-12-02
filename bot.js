//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Invite  https://discordapp.com/oauth2/authorize?client_id=686622063280128000&permissions=68608&scope=bot            //
//  Made by  @Pomdre#0449                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const args = require('yargs').argv;
const request = require("request");
const country = require('countryjs');

//Setings
const prefix = '!';
const corona = prefix + "corona"
const korona = prefix + "korona"
const covid = prefix + "covid-19"
const kaaraana = prefix + "kåråna"

let currentStatus = null;
let commands = [corona, korona, covid, kaaraana, '!korona info']

//On ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Serving ${client.guilds.cache.size} servers`);
  setInterval(() => {
    if (currentStatus === null || ++currentStatus === commands.length) {
      currentStatus = 0;
    }
    client.user.setActivity(commands[currentStatus]); //Set activity
  }, 15e3);
});

//Just don't know why but i added a ping option
client.on('message', msg => {
    if (msg.content.toLowerCase() === corona + " ping" || msg.content.toLowerCase() === korona + " ping" || msg.content.toLowerCase() === covid + " ping" || msg.content.toLowerCase() === kaaraana + " ping") {
    msg.reply('Pong!');
  }
});

//Info command
client.on('message', msg => {
    if (msg.content.toLocaleLowerCase() === corona + " info" || msg.content.toLowerCase() === korona + " info" || msg.content.toLowerCase() === covid + " info" || msg.content.toLowerCase() === kaaraana + " info") {
      msg.reply(`Er med i ${client.guilds.cache.size} server(e)!\n Inviter meg: https://discordapp.com/oauth2/authorize?client_id=686622063280128000&permissions=68608&scope=bot\n Kildekoden min: https://github.com/Pomdre/Corona-Discord-Statistikk-Bot`);
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === corona || msg.content.toLowerCase() === korona || msg.content.toLowerCase() === covid || msg.content.toLowerCase() === kaaraana || msg.content.toLowerCase() === corona + " vg" || msg.content.toLowerCase() === korona + " vg" || msg.content.toLowerCase() === covid + " vg" || msg.content.toLowerCase() === kaaraana + " vg") {
    var url = "https://redutv-api.vg.no/corona/v1/areas/country/key"
    request({
      url: url,
      json: true
  }, 
function (error, response, body) {
      if (!error && response.statusCode === 200) {
          var string = JSON.stringify(body);
          var obj = JSON.parse(string);
          const embednoreway =
{
  //Make it embed and send it
      "embed": {
          "title": "Korona/Covid-19 statistikk i Norge\nData fra vg:",
          "color": 0x66c255,
          "description": 
          "\n**Smittede i Norge totalt:**\n" + obj.items[1].numbers[0].value + " eller " + ((obj.items[1].numbers[0].value/country.population('NO'))*100).toFixed(2) + "%" +
          "\n**Nye tilfeller i går:**\n" + obj.items[1].numbers[1].value + 
        //  "\n**Nye tilfeller i dag vs i går:**\n" + (obj.items[1].numbers[0].value-obj.items[1].numbers[1].value) + "/" + obj.items[1].numbers[1].value +
          "\n**Bekreftete tilfeller per tusen innbygger:**\n" + (obj.items[1].numbers[0].value/country.population('NO')*1000).toFixed(2) +
          "\n**Bekreftete tilfeller per 100k innbygger sist 14 dager:**\n" + obj.items[1].numbers[2].value +
          "\n**Døde i Norge totalt:**\n" + obj.items[0].numbers[0].value + " eller " + ((obj.items[0].numbers[0].value/country.population('NO'))*100).toFixed(4) + "%" +
          "\n**Døde i dag:**\n" + obj.items[0].numbers[1].value +// "/" + obj.totals.changes.deathsYesterday +
          "\n**Testete foregående uke:**\n" + obj.items[2].numbers[0].value +
          "\n**Testete siste uke:**\n" + obj.items[2].numbers[1].value +
          "\n**Positive tester foregående uke:**\n" + obj.items[3].numbers[0].value + "%" +
          "\n**Positive siste uke:**\n" + obj.items[3].numbers[1].value + "%" +
          "\n**Innlagte på sykehus i dag / i går:**\n" + obj.items[5].numbers[1].value + "/" + obj.items[5].numbers[0].value +
          "\n**Intensiv i dag / i går:**\n" + obj.items[6].numbers[1].value + "/" + obj.items[6].numbers[0].value +
          "\n**Respirator i dag / i går:**\n" + obj.items[7].numbers[1].value + "/" + obj.items[7].numbers[0].value +
          "\n**Oppdatert:**\n" + obj.meta.updated + "",
          "footer": {
          "icon_url": "https://www.nextcloud.pomdre.net/index.php/apps/files_sharing/publicpreview/CAzpPzLHsrY2fxP?x=3840&y=1422&a=true&file=Pomdre%2520logo%2520Brukes%2520n%25C3%25A5.png&scalingup=0",
          "text": "Laget av @Pomdre#0449"
          }
      }
};
          msg.reply(embednoreway);
      }
  })
  }
});

//Get token from input
client.login(args.token);