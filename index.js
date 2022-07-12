const { Client, Collection } = require('discord.js');
const config = require("./config.json");
const mongo = require('mongoose');
const mineflayer = require('mineflayer');
const inDb = require('./indb');
const guild = require('./schema/guild');
const generateImage = require('./generateImage');
const messageHandler = require("./minecraft-handler/messageHandler.js");

const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', "GUILD_VOICE_STATES"],
});

mongo.connect('mongodb+srv://{username}:{password}@database.sgj6x.mongodb.net/myFirstDatabase', {
    keepAlive: true,
})

mongo.connection.on('connected', () => {
    console.log('Connected to database');
});

//Gobal Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json');

//Initialize the bot
require("./handler/index")(client);

client.login(client.config.token);

// Creating mineflayer bot
var options = {
    //Version
    version: "1.16.4",
    //Server
    host: "hypixel.net",
    //username
    username: process.env.EMAIL || config.EMAIL,
    //password
    password: process.env.PASSWORD || config.PASSWORD,
    //Authentication method
    auth: "microsoft"
}

const bot = mineflayer.createBot(options);

//Bot login
bot.on('login', async () => {
    console.log(`Logged in as ${bot.username}!`);
    require('./minecraft-handler/requirements/generateItems.js').run();
});

//When the bot is kicked
bot.on('kicked', (err) => {
    console.log(err);
})

//when the bot gets an error
bot.on('error', (err) => {
    console.log(err);
})

//When the bot stops
bot.on('end', () => {
    try {
        bot = mineflayer.createBot(options);
        return true;
    } catch (error) {
        console.log("Error: " + error);
        return false;
    }
});

bot.on('message', async (msg) => {
    const channel = client.channels.cache.get("878026030877663262");
    messageHandler.run(msg, bot, true, channel);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.channel.id != "878026030877663262") return;

    if (message.toString() > 100 - 1 - message.author.username.length);

    console.log(message.content);

    return bot.chat(`/gc ${message.author.username} : ${message.content}`);
});

client.on('guildMemberAdd', async (member) => {

    const response = await inDb.guild(member.guild.id);

    if (!response) {
        guild.setup(member, true);
    }

    if (!response.welcomeChannel) {
        return;
    }

    const dim = {
        height: response.welcomeImageHeight,
        width: response.welcomeImageWidth,
        marigin: response.welcomeImageMarigin
    }

    const av = {
        size: response.welcomeImageAvatarSize,
        x: response.welcomeImageAvatarX,
        y: response.welcomeImageAvatarY
    }

    const attachment = await generateImage(member, response.welcomeImage, av, dim);

    const channel = client.channels.cache.get("978090207217876993"); //response.welcomeChannel

    channel.send(
        {
            files: [attachment],
            content: `Welcome to the server ${member.user}!`
        });
});

module.exports = client;
