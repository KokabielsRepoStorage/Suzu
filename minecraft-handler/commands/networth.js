const mojangAPI = require('mojang-api');
const axios = require('axios');
const config = require('../../config.json');

async function run (username, bot) {
    
    console.log("Running networth");
    mojangAPI.nameToUuid(username, (err, res) => {
        if(err) {
            bot.chat(`/gc There was an error!`);
            return console.log(err);
        }

        networthCalculator(res[0].id, username, bot);
    })
}

const getActiveProfile = function(profiles, uuid) {
    return profiles.sort(
        (a, b) => 
            b.members[uuid].last_save - a.members[uuid].last_save)[0];
}


const networthCalculator = async function(uuid, username, bot) {
    const { data } = await axios.get(`https://api.hypixel.net/skyblock/profiles?key=${config.api_key}&uuid=${uuid}`);
    if(!data.profiles) return bot.chat(`/gc Error: Couldn't get profile data for this player`);
    const profiles = data.profiles;
    const activeProfile = getActiveProfile(profiles, uuid);
    const profile = activeProfile.members[uuid];
    profiles.banking = activeProfile.banking;
    var success = true;

    var success = true;
    var response = await axios.post('https://skyblock.acebot.xyz/api/networth/categories', { data: profile }).catch(err => {
        success = false;
    });

    if (!success) return bot.chat(`/gc Error: Couldn't get networth for this player. (Probably has inventory api disabled)`);
    var total = response.data.data.networth + response.data.data.bank + response.data.data.purse;
    total = Math.round(total);
    var total = seperator(total);
    return bot.chat(`/gc ${username} has a networth of ${total}`);
}

function seperator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

module.exports = {
    run : run
}