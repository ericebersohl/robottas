const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

const prefix = '&';

client.on('ready', () => {
    console.log('It worked, yo');
});

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        var command = message.content.substring(1);

        switch(command) {
            case 'ping':
                message.channel.send('pong!');
            break;
            
            default:
                message.reply("Your command was not understood.");
        }
    }
});

client.login(auth.token);