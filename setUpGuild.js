const mongoose = require('mongoose');

const client = require('../index.js');

const guildSchema = require('./schema/guild-schema');

module.exports = {
    setup : async function setupGuild (interaction, client) {
        
        const guildID = interaction.guild.id;

        const guild = client.guilds.cache.get(guildID);

        guild.members.fetch();

        var members = [];

        const testing = guild.members.cache.map(member => members.id);

        guild.members.cache.forEach(member => {
            members.push({
                member : [
                    member.id,
                    0
                ]
            });
        });

        const setupGuild = {
            guildID : interaction.guild.id,
            members : members
        }

        await new guildSchema(setupGuild).save();
    },

    update : async function updateGuild (guildID, members) {
        const guild = await guildSchema.findOneAndUpdate({
            guildID : guildID
        }, {
            
        });
    }
}