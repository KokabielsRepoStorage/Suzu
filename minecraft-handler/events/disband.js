const config = require("./config.json");
const fs = require('fs');

async function run(message, bot) { 
    config.inParty = false;

    bot.chat(`/p ${config.queue[0]}`);
    updateJson(config.queue, config.inParty);
}


function updateJson(queue, inParty) {
    
    
    const json = JSON.parse(fs.readFileSync('./minecraft-handler/events/config.json', 'utf8'));
    json.queue = queue;
    json.inParty = inParty;
    fs.writeFileSync('./minecraft-handler/events/config.json', JSON.stringify(json, null, 2));
}

module.exports = {
    run : run
}