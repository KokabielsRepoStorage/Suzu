const unmute = require('./unmute');
const muted = require('./muted')
const party = require('./party');
const disband = require('./disband');
const guildJoin = require('./guildJoin');
const guildRequest = require('./guildRequest');
const partyJoin = require('./partyJoin');
const cataEnter = require('./cataEnter');

module.exports = {
    unmute : async function run(message, passthrough, bot, channel) {
        unmute.run(message, bot);
    },

    muted : async function run(message, bot) { 
        muted.run(message, bot);
    },

    party : async function run(message, passthrough, bot, channel) {
        party.run(message, passthrough, bot, channel);
    },

    disband : async function run(message, bot) {
        disband.run(message, bot);
    },

    guildJoin : async function run(message, bot) {
        guildJoin.run(message, bot);
    },

    guildRequest : async function run(message, bot) {
        guildRequest.run(message, bot);
    },

    partyJoin : async function run(message, bot) {
        partyJoin.run(message, bot);
    },

    cataEnter : async function run(message, bot) {
        cataEnter.run(message, bot);
    }
}