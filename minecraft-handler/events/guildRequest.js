const commandHandler = require('../commandHandler');

async function run(message, bot) { 
    const args = message.split(` `);

    commandHandler.weight(args[0], bot, "oc");
}

module.exports = {
    run : run
}