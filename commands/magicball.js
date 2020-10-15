const { default: Axios } = require("axios");
const Discord = require("discord.js");
const fs = require('fs');
const configPath = '../config.json'
const config = require(configPath);
const replies = ['As I see it, yes','Ask again later','Better not tell you now','Cannot predict now','Concentrate and ask again','Don’t count on it','It is certain','It is decidedly so','Most likely','My reply is no','My sources say no','Outlook good','Outlook not so good','Reply hazy try again','Signs point to yes','Very doubtful','Without a doubt','Yes','Yes, definitely','You may rely on it']

function magicball(message, args) {
    let number = Math.floor(Math.random() * 20);

    message.channel.send(replies[number]);
}

module.exports = {
  name: "magicball",
  description: "Predict something",
  execute(message, args) {
    magicball(message, args);
  },
};
