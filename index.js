/*
  A discord bot - bteam helper bot
*/
const _ = require('lodash');
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
// const sql = require('sqlite');
require('dotenv').config();

import role from './commands/role';
import roles from './commands/roles';

// sql.open('./score.sqlite');

// The token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;
//client id of the bot to put a maker against other roles.
const clientId = process.env.DISCORD_CLIENT_ID;
// function findGameChannel() {
//   //find the discord channels you want to update, name your channel hll-kickstarter, or whatever - needs to be here.
//   const channel = client.channels.find('name', 'will-the-calling');
//   // const message = 'Do you want to play a game?';
//   // channel.send(message);
// }

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
  // const cliennnnntmember = client.users.get(clientId);

  //various const used below
  const guild = msg.guild;
  const guildMembers = msg.guild.members;
  const roles = msg.guild.roles;
  const userRoles = msg.member.roles;
  const role = roles.find('name', 'Winston');
  //handle args into commands
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  //set command
  const command = args.shift().toLowerCase();

  //Role command
  if (command === 'role') {
    role(client, msg, args);
  }
  //client.user.setGame(`on ${client.guilds.size} servers`);
  //List roles
  if (command === 'roles') {
    roles(client, msg, args);
  }

  // if (msg.content.startsWith(prefix + 'Start Campaign')) {
  //   msg.channel.send('Lets begin!');
  // }

  // if (msg.content.startsWith(prefix + 'PURGETHEMALL')) {
  //   async function purge() {
  //     const fetched = await msg.channel.fetchMessages({limit: 100}); // This grabs the last number(args) of messages in the channel.
  //     // Deleting the messages
  //     msg.channel.bulkDelete(fetched).catch(error => msg.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
  //   }

  //   // We want to make sure we call the function whenever the purge command is run.
  //   purge(); // Make sure this is inside the if(msg.startsWith)
  // }

  //DELETEING MESSAGES NOTES:
  // Delete a message
  // msg
  //   .delete()
  //   .then(mssg => console.log(`Deleted message from ${mssg.author}`))
  //   .catch(console.error);

  // Get messages
  // msg.channel
  //   .fetchMessages({limit: 10})
  //   .then(messages => console.log(`Received ${messages.size} messages`))
  //   .catch(console.error);

  // sql
  //   .get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`)
  //   .then(row => {
  //     if (!row) {
  //       sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [
  //         message.author.id,
  //         1,
  //         0,
  //       ]);
  //     } else {
  //       let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
  //       if (curLevel > row.level) {
  //         row.level = curLevel;
  //         sql.run(
  //           `UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${
  //             message.author.id
  //           }`
  //         );
  //         message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
  //       }
  //     }
  //   })
  //   .catch(() => {
  //     console.error;
  //     sql
  //       .run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)')
  //       .then(() => {
  //         sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [
  //           message.author.id,
  //           1,
  //           0,
  //         ]);
  //       });
  //   });

  // if (!message.content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix

  // if (message.content.startsWith(prefix + 'level')) {
  //   sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
  //     if (!row) return message.reply('Your current level is 0');
  //     message.reply(`Your current level is ${row.level}`);
  //   });
  // } else if (message.content.startsWith(prefix + 'points')) {
  //   sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
  //     if (!row) return message.reply('Your current points is 0');
  //     message.reply(`Your current points is ${row.points}`);
  //   });
  // }
});

//Login the bot
client.login(token);

//ERROR HANDLING
// client.on('error', e => console.error(e));
// client.on('warn', e => console.warn(e));
// client.on('debug', e => console.info(e));
