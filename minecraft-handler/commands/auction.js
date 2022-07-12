const axios = require('axios');
const list = require('../requirements/auction_item_ids.json');
const generate_items = require('../requirements/generateItems.js');


async function run (item, bot) {
    console.log("Running auction");
    await generate_items.run();
    
    for ( i = 0 ; i < list.items.length; i++)
    {
        var name = list.items[i].name;
        name = name.toLowerCase();

        if(name.includes(item)) {
            return bot.chat(`/gc Lowest price for ${list.items[i].name} is ${seperator(list.items[i].price)}`);
        }

    }

    return bot.chat(`/gc Could not find ${item}`);
}

module.exports = {
    run : run
}

function seperator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}