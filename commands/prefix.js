const { default: Axios } = require("axios");
const Discord = require("discord.js");
const fs = require('fs');
const configPath = './config.json'
const config = require(configPath);

function setPrefix(message, args) {
    config.prefix = args[0];

    fs.writeFile(configPath, JSON.stringify(config), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
});
}

module.exports = {
  name: "setprefix",
  description: "Change global bot prefix",
  execute(message, args) {
    setPrefix(message, args);
  },
};
