const Discord = require('discord.js');
const winston = require('winston');

const client = new Discord.Client();
const ergastRequest = require('./ergastRequest.js');
const auth = require('./auth.json');

const prefix = '&';

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name: 'info',
            filename: 'robottas.info.log',
            level: 'info',
        }),
        new (winston.transports.File)({
            name: 'error',
            filename: 'robottas.error.log',
            level: 'error',
        })
    ]
});

client.on('ready', () => {
    logger.info('Robottas initialized.');
});

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        let command = message.content.substring(1);

        switch(command) {
            case 'ping':
                message.channel.send('pong!');
            break;

            case 'race':
                message.channel.send(ergastRequest.next());
            break;
            
            default:
                message.reply("Your command was not understood.");
        }
    }
});

client.login(auth.token);