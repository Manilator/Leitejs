const { default: Axios } = require("axios");
const Discord = require("discord.js");

function searchActors(message) {
    message.content = message.content.split("'").join('"');
    let infos = message.content.split('"');
    console.log(infos);
    let color = Math.floor(Math.random() * 16777215).toString(16);
  
    Axios.get("https://api.themoviedb.org/3/search/person", {
      params: {
        api_key: "6d48337cf81398c13b598048ae81c942",
        query: infos[1],
        page: 1,
      },
    }).then(
      (response) => {
        let actors = response.data.results;
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#" + color)
          .setDescription(
            "Use these IDs with movie search command. Type **!help movie** for more info."
          )
          .setTitle("📄 Actors IDs")
          .setTimestamp();
  
        actors.map((e) =>
          exampleEmbed.addFields({ name: e.name, value: e.id, inline: true })
        );
        exampleEmbed.addField("\u200B", "**!actor ID** for more detailed info.");
        message.channel.send(exampleEmbed);
      },
      (error) => {
        console.log(error);
        message.channel.send("Invalid command usage. Type !help for more info.");
      }
    );
  }

module.exports = {
  name: "actors",
  description: "Random movie!",
  execute(message, args) {
    searchActors(message);
  },
};
