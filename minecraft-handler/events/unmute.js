async function run(message,passthrough, bot, channel) {
    if(!channel) return new TypeError('Channel cannot be null');
    if(!passthrough) return TypeError('Passthrough cannot be null');

    channel.send(message);
}

module.exports = {
    run : run
}