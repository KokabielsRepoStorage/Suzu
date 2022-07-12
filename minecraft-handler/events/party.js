const config = require('./config.json')
const fs = require('fs');

async function run(message, bot) {
    const args = message.split(` `);
    if(config.inParty == false) { 
        bot.chat(`/p accept ${args[1]}`);
        config.inParty = true;
        updateJson(config.queue, config.inParty);
        return;
    }

    config.queue.push(args[1]);


    updateJson(config.queue, config.inParty);

    return bot.chat(`/msg ${args[1]} the bot is already a party, you have been added to queue`);
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