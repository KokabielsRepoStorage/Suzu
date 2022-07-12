const axios = require("axios");

async function run() {
    const { data } = await axios.get('https://skyblock.acebot.xyz/api/auctions/all');

    itemArray = [];

    for(i = 0; i < data.data.length; i++) {
        itemArray.push({
            id : data.data[i].id,
            name : data.data[i].name,
            price : data.data[i].lowestBin
        })
    }

    updateJson(itemArray);

    await setTimeout(() => {
        run();
    }, 60000);
}

const fs = require('fs');

function updateJson(itemArray) {
    const json = JSON.parse(fs.readFileSync(`${process.cwd()}/minecraft-handler/requirements/auction_item_ids.json`, 'utf8'));
    json.items = itemArray;
    fs.writeFileSync(`${process.cwd()}/minecraft-handler/requirements/auction_item_ids.json`, JSON.stringify(json, null, 2));
}

module.exports = {
    run: run
}