const { default: Axios } = require("axios");
const Discord = require("discord.js");

function getMalProfile(message, args) {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  if (args.length !== 0) {
    Axios.get("https://api.jikan.moe/v3/user/" + args[0], {}).then(
      (response) => {
        let user = response.data;
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("#" + color)
          .setTitle(user.username)
          .setURL(user.url)
          .setThumbnail(
            user.image_url !== null
              ? user.image_url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhLJpjNWUbfgLTQqQHZQvty9w4iKHoPkpbHg&usqp=CAU"
          )
          .setAuthor(
            'Profile',
            user.image_url !== null
              ? user.image_url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhLJpjNWUbfgLTQqQHZQvty9w4iKHoPkpbHg&usqp=CAU",
            user.url
          )
          .addFields(
            { name: "User ID", value: user.user_id, inline: true},
            {
              name: "Gender",
              value: user.gender !== null ? user.gender : "null",
              inline: true,
            },
            {
              name: "Birthday",
              value:
                user.birthday !== null ? user.birthday.split("T")[0] : "null",
              inline: true,
            },
            {
              name: "Location",
              value: user.location !== null ? user.location : "null",
              inline: true,
            }
          );

          color = Math.floor(Math.random() * 16777215).toString(16);
        const animeStats = new Discord.MessageEmbed()
          .setColor("#" + color)
          .setTitle(`Anime Stats`)
          .addFields(
            { name: "Days watched", value: user.anime_stats.days_watched, inline: true },
            {
              name: "Mean Score",
              value: user.anime_stats.mean_score,
              inline: true,
            },
            {
              name: "Watching",
              value: user.anime_stats.watching,
              inline: true,
            },
            {
              name: "Completed",
              value: user.anime_stats.completed,
              inline: true,
            },
            {
              name: "On Hold",
              value: user.anime_stats.on_hold,
              inline: true,
            },
            {
              name: "Dropped",
              value: user.anime_stats.dropped,
              inline: true,
            },
            {
              name: "Plan to watch",
              value: user.anime_stats.plan_to_watch,
              inline: true,
            },
            {
              name: "Total",
              value: user.anime_stats.total_entries,
              inline: true,
            },
            {
              name: "Rewatched",
              value: user.anime_stats.rewatched,
              inline: true,
            }
          );

          color = Math.floor(Math.random() * 16777215).toString(16);
          const mangaStats = new Discord.MessageEmbed()
            .setColor("#" + color)
            .setTitle(`Manga Stats`)
            .addFields(
              { name: "Days read", value: user.manga_stats.days_read, inline: true },
              {
                name: "Mean Score",
                value: user.manga_stats.mean_score,
                inline: true,
              },
              {
                name: "Reading",
                value: user.manga_stats.reading,
                inline: true,
              },
              {
                name: "Completed",
                value: user.manga_stats.completed,
                inline: true,
              },
              {
                name: "On Hold",
                value: user.manga_stats.on_hold,
                inline: true,
              },
              {
                name: "Dropped",
                value: user.manga_stats.dropped,
                inline: true,
              },
              {
                name: "Plan to read",
                value: user.manga_stats.plan_to_read,
                inline: true,
              },
              {
                name: "Total",
                value: user.manga_stats.total_entries,
                inline: true,
              },
              {
                name: "Reread",
                value: user.manga_stats.reread,
                inline: true,
              },
              {
                name: "Chapters Read",
                value: user.manga_stats.chapters_read,
                inline: true,
              },
              {
                name: "Volumes Read",
                value: user.manga_stats.volumes_read,
                inline: true,
              }
            )
            .setTimestamp();

        message.channel.send(exampleEmbed);
        message.channel.send(animeStats);
        message.channel.send(mangaStats);
      },
      (error) => {
        console.log(error);
        message.channel.send(
          "Invalid command usage or invalid username. Type !help for more info."
        );
      }
    );
  } else {
    message.channel.send(
      "Invalid command usage or invalid username. Type !help for more info."
    );
  }
}

module.exports = {
  name: "malp",
  description: "MyAnimeList Profile",
  execute(message, args) {
    getMalProfile(message, args);
  },
};
