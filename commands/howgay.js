const { default: Axios } = require("axios");
const Discord = require("discord.js");
const fs = require('fs');
const dataPath = '../data/howgay.json'
const data = require(dataPath);

function howGay(message, args) {
    let user = '';
    let mention = '';
    try {
        user = message.mentions.users.first().id;
        mention = args[0] + ' is';
    } catch(err) {
        user = message.author.id;
        mention = 'You are'
    }
    let percentage = data[user];
    if(percentage !== undefined) {
        message.channel.send(`${mention} ${percentage}% gay.`)
    } else {
        data[user] = Math.floor(Math.random() * 100);
        percentage = data[user];
        fs.writeFile('./data/howgay.json', JSON.stringify(data), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
            message.channel.send(`${mention} ${percentage}% gay.`);
        });
    }
    /*
    fs.writeFile('./data/howgay.json', JSON.stringify(config), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(config));
    message.channel.send('Changed global prefix to ' + args[0]);
});
*/
}

module.exports = {
  name: "howgay",
  description: "How much gay",
  execute(message, args) {
    howGay(message, args);
  },
};
