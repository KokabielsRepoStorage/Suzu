async function run(message, bot) { 
    if(message.includes('PuppyNuff')) { 
        return bot.chat('/g unmute PuppyNuff');
    }

    return bot.chat('/g unmute _Hakari');
}

module.exports = {
    run : run
}