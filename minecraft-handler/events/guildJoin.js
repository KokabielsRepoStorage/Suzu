async function run(message, bot) { 
    const args = message.split(` `);

    return bot.chat(`/gc Welcome to the guild ${args[0]}, do /g discord for the discord!`)
}

module.exports = {
    run : run
}