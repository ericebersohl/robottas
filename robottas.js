const Discord = require('discord.js');
const winston = require('winston');

const client = new Discord.Client();
const ergastRequest = require('./ergastRequest.js');
const utils = require('./utils.js');
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
            case 'help':
                message.channel.send('Currently supported commands: \n' +
                    'help - Print a list of the currently supported commands.' + '\n' +
                    'ping - Verify that Robottas is functional.' + '\n' +
                    'nextrace - Print the date, time, and location of the next F1 race.' + '\n');
            break;

            case 'ping':
                message.channel.send(message.author + ' Minimal Talking!');
            break;

            case 'nextrace':
                ergastRequest.nextRace().then((result) => {
                    let cd = utils.msConvert(result.raceDate - Date.now());
                    let dateAndTime = utils.formatDate(result.raceDate);
                    message.channel.send(
                        'Race: ' + result.raceName + '\n' +
                        'Date: ' + dateAndTime.day + '\n' +
                        'Time: ' + dateAndTime.time + '\n' +
                        'Countdown: ' + cd.days + 'D : ' + cd.hours + 'H : ' + cd.minutes + 'M : ' + cd.seconds + 'S : ' + cd.milliseconds + 'Ms'
                    )
                });
            break;
            
            default:
                message.reply("Your command was not understood.");
        }
    }
});

client.login(auth.token);