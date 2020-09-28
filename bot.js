//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Invite  https://discordapp.com/oauth2/authorize?client_id=686622063280128000&permissions=68608&scope=bot            //
//  Made by  @Pomdre#0449                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const request = require("request");
const country = require('countryjs');

//Setings
const prefix = '!';
const corona = prefix + "corona"
const korona = prefix + "korona"
const covid = prefix + "covid-19"
const kaaraana = prefix + "kåråna"

let currentStatus = null;
let commands = [corona, korona, covid, kaaraana]
//test
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
    var url = "https://redutv-api.vg.no/corona/v1/sheets/norway-table-overview?region=county"
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
          "\n**Smittede i Norge totalt:**\n" + obj.totals.confirmed + " eller " + ((obj.totals.confirmed/country.population('NO'))*100).toFixed(2) + "%" +
          "\n**Nye tilfeller i dag:**\n" + obj.totals.changes.newToday + 
          "\n**Nye tilfeller i dag vs i går:**\n" + obj.totals.changes.newToday + "/" + obj.totals.changes.newYesterday +
          "\n**Bekreftete tilfeller per tusen innbygger:**\n" + (obj.totals.confirmed/country.population('NO')*1000).toFixed(2) + 
          "\n**Døde i Norge totalt:**\n" + obj.totals.dead + " eller " + ((obj.totals.dead/country.population('NO'))*100).toFixed(4) + "%" +
          "\n**Døde i dag / i går:**\n" + obj.totals.changes.deathsToday + "/" + obj.totals.changes.deathsYesterday +
          "\n**FHI sier det er flere smittede i Norge enn tallene viser. Mørketallene kan være store, fordi mange ikke testes.**\n",
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

//Get token from settings
client.login(settings.token);