require('dotenv').config();
const express = require('express');
const { DiscordBot } = require('./DiscordBot');

const app = express();
const bot = new DiscordBot();
const PORT = 3000;

app.get('/feedback', (req, res) => {
  // an endpoint to view feedback using fake database
  res.send(bot.db);
});

app.listen(PORT, () => {
  console.log('app is listening on port: ', PORT);
});
