const { default: Axios } = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "imdb",
  description: "imdb!",
  execute(message, args) {
    message.content = message.content.split("'").join('"');
    let infos = message.content.split('"');
    let color = Math.floor(Math.random() * 16777215).toString(16);

    Axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "a880eb27",
        t: infos[1],
        y: infos[2],
      },
    }).then(
      (response) => {
        console.log(response.data);
        if (response.data.Response === "False") {
          message.channel.send(
            "Invalid command usage or movie not found. Type !help movie."
          );
        } else {
          let movie = response.data;
          const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#" + color)
            .setTitle("🎬 " + movie.Title)
            .setURL("https://imdb.com/title/" + movie.imdbID)
            .setThumbnail(movie.Poster)
            .addFields(
              { name: "Plot", value: movie.Plot },
              { name: "Genre", value: movie.Genre, inline: true },
              { name: "Length", value: movie.Runtime, inline: true },
              { name: "Released", value: movie.Released, inline: true },
              { name: "Rating", value: movie.imdbRating, inline: true },
              { name: "Votes", value: movie.imdbVotes, inline: true }
            )
            .setTimestamp();

          message.channel.send(exampleEmbed);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
