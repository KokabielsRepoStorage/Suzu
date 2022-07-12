const client = require('../index');

const redirects = require('./events/redirects');

const commandHandler = require('./commandHandler');

const rankArray = ['[VIP]', '[VIP+]', "[MVP]", "[MVP+]", "[MVP++]", "[GM", "[ADMIN]", " [OWNER]", "[YOUTUBE]", "[MOJANG", "[EVENTS]", "[MCP]", "[PIG+++]"]; //I decided to leave the pig rank in to commerate technoblade after his passing.

const guildRankArray = ['[DOGGOS]', '[DOOGAN]', '[HUGEPP]', '[STAFF]', '[MOD]', '[GM]'];

const commandArray = [{
    name: "/ah",
    function : commandHandler.auction
}, {
    name : "/bitches",
    function : commandHandler.thing
}, { 
    name : "/networth",
    function : commandHandler.networth
},
{
    name : "/weight",
    function : commandHandler.weight
}, {
    name : "/parsifal",
    function : commandHandler.parsifal
}]

 const eventsArray = [//{
//     message : "has unmuted",
//     passthrough : true,
//     function : redirects.unmute
//     }, 
    {
        message : "has muted [MVP+] PuppyNuff",
        passthrough : false,
        function : redirects.muted
    }, {
        message : "has muted _Hakari",
        passthrough : false,
        function : redirects.muted
    }, {
        message : "has invited you to join their party",
        passthrough : false,
        function : redirects.party
        
    }, {
        message : "has requested to join the Guild!",
        passthrough : false,
        function : redirects.guildRequest
    }, {
        message : "joined the guild!",
        passthrough : false,
        function : redirects.guildJoin
    }, {
        message : "disbanded",
        passthrough : false,
        function : redirects.disband
    }, {
        message : "joined the party",
        passthrough : false,
        function : redirects.partyJoin
    }, {
        message : "entered The Catacombs",
        passthrough : false,
        function : redirects.cataEnter
    }];

async function run (message, bot, passthrough, messageChannel) { 
    message = message.toString();
    for(i = 0; i < eventsArray.length; i++){
        if(message.includes(eventsArray[i].message)) {
            if(eventsArray[i].passthrough) {
                return eventsArray[i].function(message, passthrough, bot, channel);
            } else if (!eventsArray[i].passthrough){
                return eventsArray[i].function(message, bot);
            }
        }
    }

    message = message.toString();
    
    if(!message.includes("Guild > ")) return false;
    console.log(message);

    if(!message) { 
        return new TypeError('Message is null or undefined');
    }

    if(!bot) {
        return new TypeError('Bot is null or undefined');
    }

    message = message.replace('Guild > ', "");
    message = message.replace(': ', "");

    for(i = 0; i < rankArray.length; i++) { 
        message = message.replace(rankArray[i] + " ", "");
    }

    for( i = 0; i < guildRankArray.length; i++) { 
        message = message.replace(guildRankArray[i], "");
    }

    const args = message.split(' ');
    const commandCheck = args[1];

    console.log(commandCheck);

    var username = args[2];

    if(username == null || username == undefined || args[0] == "_Hakari") username = args[0];

    var item = message.replace(args[0] + " ", ""); item = item.replace(args[1] + " ", "");

    if(args[1].startsWith('/')) { 
        for (i = 0; i < commandArray.length; i++) {
            console.log(commandArray[i].name);
            if(message.includes(commandArray[i].name)) {
                console.log("found the command!");
                if(commandArray[i].name == "/ah") {
                    return commandArray[i].function(item, bot, 'gc');
                }
                return commandArray[i].function(username, bot, 'gc');
            }
        }

        return bot.chat(`/gc Command not found!`);
    }

    console.log(message);

    if(passthrough == true) {
        if(!messageChannel) throw new Error('MessageChannel cannot be null');
        if(!message) return console.log(message);
        if(username == "_Hakari") return;
        console.log(username);
        console.log(message);
        return messageChannel.send(message);
    }
}

async function getRank(message) { 
    if(!message) { 
        return new SyntaxError(`Message is null or undefined`);
    }

    for(i = 0; i < rankArray.length; i++) { 
        if(message.includes(rankArray[i])) { 
            return rankArray[i];
        }
    }
}

module.exports = {
    run : run,
    getRank : getRank
}