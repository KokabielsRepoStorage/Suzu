const networth = require('./commands/networth');
const thing = require('./commands/bitches');
const weight = require('./commands/weight');
const parsifal = require('./commands/parsifal');
const auction = require('./commands/auction');

module.exports = {
    networth: async function(username, bot) {
        try {
            networth.run(username, bot);
        } catch(err) {
            bot.chat('/gc There was an error!');
        }
    },

    thing: async function(username, bot) {
        try {
            thing.run(username, bot);
        } catch(err) {
            cbot.chat('/gc There was an error!');
        }
    },

    weight: async function(username, bot, chat) {
        try {
            weight.run(username, bot, chat);
        } catch(err) {
            bot.chat('/gc There was an error!');
        }
     },

    parsifal : async function(username, bot, chat) {
        try {
            parsifal.run(username, bot, chat);
        } catch(err) {
            bot.chat('/gc There was an error!');
        }
    },

    auction : async function (item, bot) {
        auction.run(item, bot);
    }
}