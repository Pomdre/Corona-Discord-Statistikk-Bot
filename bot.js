//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Inevneter meg   https://discordapp.com/oauth2/authorize?client_id=686622063280128000&permissions=68608&scope=bot    //
//  Laget av @Pomdre#0449                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var request = require("request")

var url = "https://www.vg.no/spesial/2020/corona-viruset/data/norway-region-data/"
//Todays date
function today() {
  var today = new Date(); 
  var dd = today.getDate(); 
  var mm = today.getMonth()+1; 
  //January is 0! 
  var yyyy = today.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  if(mm<10){mm='0'+mm} 
  return yyyy+'-'+mm+'-'+dd;
}

//Yesterday
function yesterday() {
    //Todays date
    var today = new Date(); 
    var dd = today.getDate()-1; 
    var mm = today.getMonth()+1; 
    //January is 0! 
    var yyyy = today.getFullYear(); 
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm} 
    return yyyy+'-'+mm+'-'+dd;
}

var prefix = "!corona"

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + ' ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === prefix) {
      request({
        url: url,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            var string = JSON.stringify(body);
            var obj = JSON.parse(string);
            const embednoreway =
{
        "embed": {
            "title": "Corona/Covid 19 statistikk i Norge",
            "color": 0x66c255,
            "description": 
            "\n**Smittede i Norge totalt:**\n" + obj.metadata.confirmed.total + " eller " + ((obj.metadata.confirmed.total/obj.metadata.population)*100).toFixed(2) + "%" +
            "\n**Nye tilfeller i dag:**\n" + obj.metadata.confirmed.newToday + 
            "**\nBekreftete tilfeller per tusen innbygger:**\n" + obj.metadata.confirmed.per1kCapita + 
            "\n**I dag vs i går totalt:**\n" + obj.timeseries.total.confirmed[today()] + "/" + obj.timeseries.total.confirmed[yesterday()] +
            "\n**Nye tilfeller i dag vs i går:**\n" + obj.metadata.confirmed.newToday + "/" + obj.metadata.confirmed.newYesterday +
            "\n**Døde i Norge totalt:**\n" + obj.metadata.dead.total,
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

client.login(settings.token);