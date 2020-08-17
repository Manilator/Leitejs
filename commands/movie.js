const { default: Axios } = require("axios");
const Discord = require("discord.js");

function getRandomMovie(message) {
  let page = Math.floor(Math.random() * 500) + 1;

  Axios.get("https://api.themoviedb.org/3/discover/movie", {
    params: {
      api_key: "6d48337cf81398c13b598048ae81c942",
      sort_by: "popularity.desc",
      page: page,
    },
  }).then(
    (response) => {
      movie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length) + 1
        ];
      getMoviebyID(message, movie.id);
    },
    (error) => {
      console.log(error);
    }
  );
}

function getMoviebyID(message, id) {
  let color = Math.floor(Math.random() * 16777215).toString(16);

  Axios.get("https://api.themoviedb.org/3/movie/" + id, {
    params: {
      api_key: "6d48337cf81398c13b598048ae81c942",
    },
  }).then(
    (response) => {
      let movie = response.data;
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#" + color)
        .setTitle("🎬 " + movie.title)
        .setURL("https://imdb.com/title/")
        .setThumbnail(
          movie.poster_path !== null
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhLJpjNWUbfgLTQqQHZQvty9w4iKHoPkpbHg&usqp=CAU"
        )
        .addFields(
          { name: "Overview", value: movie.overview },
          {
            name: "Genre",
            value: movie.genres.map((e) => e.name),
            inline: true,
          },
          { name: "Length", value: movie.runtime + " min", inline: true },
          { name: "Released", value: movie.release_date, inline: true },
          { name: "Rating", value: movie.vote_average, inline: true },
          { name: "Votes", value: movie.vote_count, inline: true }
        )
        .setTimestamp();

      message.channel.send(exampleEmbed);
    },
    (error) => {
      console.log(error);
      message.channel.send("Invalid command usage. Type !help for more info.");
    }
  );
}

module.exports = {
  name: "movie",
  description: "Random movie!",
  execute(message, args) {
    getRandomMovie(message);
  },
};
