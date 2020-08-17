const { default: Axios } = require("axios");
const Discord = require("discord.js");

function getActorByID(message, args) {
    let color = Math.floor(Math.random() * 16777215).toString(16);
  
    Axios.get("https://api.themoviedb.org/3/person/" + args[0], {
      params: {
        api_key: "6d48337cf81398c13b598048ae81c942",
      },
    }).then(
      (response) => {
        let actor = response.data;
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#" + color)
          .setTitle(actor.name)
          .setThumbnail(
            actor.profile_path !== null
              ? "https://image.tmdb.org/t/p/w500" + actor.profile_path
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhLJpjNWUbfgLTQqQHZQvty9w4iKHoPkpbHg&usqp=CAU"
          )
          .addFields(
            { name: "Also Known as", value: actor.also_known_as },
            {
              name: "Birthday",
              value: actor.birthday,
              inline: true,
            },
            { name: "Place of birth", value: actor.place_of_birth, inline: true },
            { name: "Popularity", value: actor.popularity, inline: true }
          )
          .setTimestamp();
  
        message.channel.send(exampleEmbed);
      },
      (error) => {
        console.log(error);
        message.channel.send(
          "Invalid command usage or invalid actor id. Type !help for more info."
        );
      }
    );
  }

module.exports = {
  name: "actor",
  description: "Random movie!",
  execute(message, args) {
    getActorByID(message, args);
  },
};
