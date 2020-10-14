const { default: Axios } = require("axios");
const Discord = require("discord.js");

  function getGenresIDs(message) {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    Axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: "6d48337cf81398c13b598048ae81c942",
      },
    }).then(
      (response) => {
        let movie = response.data;
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#" + color)
          .setDescription(
            "Use these IDs with movie search command. Type **!help movie** for more info."
          )
          .setTitle("📄 Genres IDs")
          .setTimestamp();
  
        response.data.genres.map((e) =>
          exampleEmbed.addFields({ name: e.name, value: e.id, inline: true })
        );
        message.channel.send(exampleEmbed);
      },
      (error) => {
        console.log(error);
        message.channel.send("Invalid command usage. Type !help for more info.");
      }
    );
  }

module.exports = {
  name: "genres",
  description: "Genres List!",
  execute(message, args) {
    getGenresIDs(message);
  },
};
