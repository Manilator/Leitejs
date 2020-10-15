const fs = require("fs");
const Discord = require("discord.js");
const { default: Axios } = require("axios");
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const prefix = config.prefix;

client.on("ready", () => {
  console.log("Bot started.");
  client.user.setActivity("with milk 🥛", { type: "PLAYING" });
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(args)

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
    }
});

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
