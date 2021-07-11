const { Client } = require('discord.js');

class UserFeedback {
  /**
   * @type {string}
   */
  username = '';

  /**
   * @type {string[]}
   */
  content = [];

  /**
   * @param {string} username
   */
  constructor(username) {
    this.username = username;
  }
}

class DiscordBot {
  // fake database
  db = {};

  client = new Client();

  constructor() {
    this.setupMessageListener();
    this.init();
  }

  init() {
    this.client.login(process.env.BOT_TOKEN);
    this.client.on('ready', () => {
      console.log(`${this.client.user.tag} is ready!`);
    });
  }

  setupMessageListener() {
    // set up listener for message events
    this.client.on('message', (message) => {
      const id = message.author.id;
      const feedback = this.db[id];

      // check if a new user has joined the server
      // check if we haven't already started gathering data for this user so we don't ask the same prompt again
      if (message.type === 'GUILD_MEMBER_JOIN' && !feedback) {
        this.db[id] = new UserFeedback(message.author.username);

        // prompt user for feedback
        message.author.send(
          'Hello there, please take a moment to tell us how you found out about us?'
        );
      }

      if (
        message.channel.type === 'dm' && // check if message is on dm channel
        message.author.id !== this.client.user.id && // check if author isn't the bot client
        feedback && // check if new user has a feedback log setup
        feedback.content.length < 3 // put a cap on how many responses to record
      ) {
        feedback.content.push(message.content);
      }
    });
  }
}

module.exports = { DiscordBot };
