const { default: Axios } = require("axios");
const Discord = require("discord.js");
const fs = require('fs');
const configPath = '../config.json'
const config = require(configPath);

function setPrefix(message, args) {
    config.prefix = args[0];

    fs.writeFile('./config.json', JSON.stringify(config), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(config));
    message.channel.send('Changed global prefix to ' + args[0]);
});
}

module.exports = {
  name: "setprefix",
  description: "Change global bot prefix",
  execute(message, args) {
    setPrefix(message, args);
  },
};
