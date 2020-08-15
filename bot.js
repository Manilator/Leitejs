const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!'
 

client.on('ready', () => {

    console.log('Bot started.');

});

 

client.on('message', message => {

    if (message.content === prefix + 'ping') {

       message.reply('pong');

    }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot