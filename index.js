const { GatewayIntentBits, Client, messageLink, ActivityType } = require("discord.js");
const axios = require("axios");
const moment = require('moment');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const gali = require("./data");

require("dotenv").config();

const token = process.env.APP_TOKEN;

client.on('ready', () => {
    const timestamp = moment().subtract(69, 'minutes').toISOString();
    client.user.setActivity('with your mom',{type: ActivityType.Playing,  timestamps: { start: timestamp }});
})
    

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    generateChatMessage(msg.content.toLocaleLowerCase()).then((message) => {
      msg.reply({
        content: message ?? "Error",
      });
    });
  }
});
client.login(token);

async function generateChatMessage(message) {
  switch (message) {
    case "!gali":
      const randomIndex = Math.floor(Math.random() * gali.length);
      return gali[randomIndex];

    default:
      return "Invalid selection.";
  }
}
