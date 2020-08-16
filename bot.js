const Discord = require("discord.js");
const { default: Axios } = require("axios");

const client = new Discord.Client();

const prefix = "!";

function getMoviesByGenre(message) {
  let infos = message.content.split(' ');
  console.log(infos)

  Axios.get("https://api.themoviedb.org/3/discover/movie", {
    params: {
      api_key: "6d48337cf81398c13b598048ae81c942",
      sort_by: "popularity.desc",
      with_genres: infos[1],
      page: 1,
    },
  }).then(
    (response) => {
    let page = Math.floor(Math.random() * response.data.total_pages) + 1;
    Axios.get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: "6d48337cf81398c13b598048ae81c942",
          sort_by: "popularity.desc",
          with_genres: infos[1],
          page: page,
        },
      }).then(
        (response) => {
          movie = response.data.results[Math.floor(Math.random() * 20) + 1];
          getMoviebyID(message, movie.id);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
}

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
    }
  );
}

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
      movie = response.data.results[Math.floor(Math.random() * 20) + 1];
      getMoviebyID(message, movie.id);
    },
    (error) => {
      console.log(error);
    }
  );
}

client.on("ready", () => {
  console.log("Bot started.");
  client.user.setActivity("with milk 🥛", { type: "PLAYING" });
});

client.on("message", (message) => {
  if (message.author.id !== "596314120857452544") {
    let valid = message.content.split(" ");

    if (valid[0] === prefix + "ping") {
      message.reply("pong");
    }

    if (valid[0] === prefix + "help") {
      message.channel.send("test");
    }

    if (valid[0] === prefix + "movie") {
      getRandomMovie(message);
    }

    if (valid[0] === prefix + "imdb") {
      let msg = message.content.split(" ");
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
              "Invalid movie command usage. Type !help movie."
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
    }

    if (valid[0] === prefix + "genres") {
      getGenresIDs(message);
    }

    if (valid[0] === prefix + "movieg") {
      getMoviesByGenre(message);
    }
  }
});

// THIS  MUST  BE  THIS  WAY

// client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot

client.login("NTk2MzE0MTIwODU3NDUyNTQ0.XR3uzQ.NcT9HqA7YE7vvoAhLFUxEi3N0v8");
