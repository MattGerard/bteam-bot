/*
  A discord bot - bteam helper bot
*/
//https://discordapp.com/api/oauth2/authorize?client_id=xxxxxxxxxxx&permissions=268774464&scope=bot
const _ = require('lodash');
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

require('dotenv').config();

const roleCMD = require('./commands/role');
const rolesCMD = require('./commands/roles');

// The token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;
//client id of the bot to put a maker against other roles.
const clientId = process.env.DISCORD_CLIENT_ID;

// bot is ready - do it!
client.on('ready', () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${
      client.guilds.size
    } guilds.`
  );
  client.user.setGame(`on ${client.guilds.size} servers`);
});

const prefix = '!';

//Ready Messages
client.on('message', msg => {
  const prefix = '!';
  // Exit and stop if prefix is not there  // Ignore bots.
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (msg.channel.type === 'dm') return; //Ignore all DM's

  //handle args into commands
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  //set command
  const command = args.shift().toLowerCase();

  //Role command
  if (command === 'role' && msg.channel.name === 'your-roles') {
    roleCMD(client, msg, args);
  }
  //client.user.setGame(`on ${client.guilds.size} servers`);
  //List roles
  if (command === 'roles' && msg.channel.name === 'your-roles') {
    rolesCMD(client, msg, args);
  }
});

//Login the bot
client.login(token);

//ERROR HANDLING
// client.on('error', e => console.error(e));
// client.on('warn', e => console.warn(e));
// client.on('debug', e => console.info(e));
