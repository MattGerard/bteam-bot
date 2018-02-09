/*
  A discord bot - Game Master for Will
*/
const _ = require('lodash');
// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
const sql = require('sqlite');
require('dotenv').config();

sql.open('./score.sqlite');

// The token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_TOKEN;
//client id of the bot to put a maker against other roles.
const clientId = process.env.DISCORD_CLIENT_ID;
function findGameChannel() {
  //find the discord channels you want to update, name your channel hll-kickstarter, or whatever - needs to be here.
  const channel = client.channels.find('name', 'will-the-calling');
  // const message = 'Do you want to play a game?';
  // channel.send(message);
}

// bot is ready - do it!
client.on('ready', () => {
  findGameChannel();
});

const prefix = '!';

//Ready Messages
client.on('message', msg => {
  const prefix = '!';
  // Exit and stop if prefix is not there
  if (!msg.content.startsWith(prefix)) return;
  if (msg.author.bot) return; // Ignore bots.
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
    let [roleName] = args;
    if (!roleName) return;
    const role = roles.find('name', roleName);
    if (!role) {
      const err = `${roleName} role does not exist! `;
      msg.reply(err);
    }

    if (role && userRoles.has(role.id)) {
      msg.member
        .removeRole(role)
        .then(() => {
          const message = `${roleName} role has been removed!`;
          msg.reply(message);
        })
        .catch(console.error);
    } else {
      msg.member
        .addRole(role)
        .then(() => {
          const message = `has been added to ${roleName} role!`;
          msg.reply(message);
        })
        .catch(console.error);
    }

    // Check if they have one of many roles
    // if(message.member.roles.some(r=>["Dev", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
    //   // has one of the roles
    // } else {
    //   // has none of the roles
    // }
    // console.log(msg.content[])
  }

  //List roles
  if (command === 'roles') {
    const filteredRoles = roles.filter(r => {
      if (role && role.position && r.position < role.position) {
        return r;
      }
    });

    let rolesAvailable = '';
    filteredRoles.forEach(r => {
      rolesAvailable += r.name + ': ' + r.members.size + ' Members  \n';
    });

    msg.channel.send(`\`\`\`css
Roles Available:
${rolesAvailable}
    \`\`\``);
  }

  if (msg.content.startsWith(prefix + 'Start Campaign')) {
    msg.channel.send('Lets begin!');
  }

  if (msg.content.startsWith(prefix + 'PURGETHEMALL')) {
    async function purge() {
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

      const fetched = await msg.channel.fetchMessages({limit: 100}); // This grabs the last number(args) of messages in the channel.
      // Deleting the messages
      msg.channel.bulkDelete(fetched).catch(error => msg.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
    }

    // We want to make sure we call the function whenever the purge command is run.
    purge(); // Make sure this is inside the if(msg.startsWith)
  }

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
