const Discord = require('discord.js');  // interface with discord
const winston = require('winston');  // event logging

const client = new Discord.Client();
const ergastRequest = require('./ergastRequest.js'); // Ergast is a Formula 1 statistics database, all the calls to that API are in this file
const utils = require('./utils.js'); // Importing functions to keep this file size as small as possible
const auth = require('./auth.json'); // File with the bot token, kept seperate so that it won't find its way into the repo

const prefix = '&'; // the message prefix for all robottas commands


// Set up the logger with two transports: one for info and one for errors
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


// Display a message when the bot fires up
client.on('ready', () => {
    logger.info('Robottas initialized.');
});


// Interpret messages, act accordingly
client.on('message', message => {
    if (message.content.startsWith(prefix)) {
        let command = message.content.substring(1).split(' '); // array of commands

        switch(command[0]) {
            case 'help':
                message.channel.send('```Currently supported commands: \n' +
                    'help - Print a list of the currently supported commands.' + '\n' +
                    'ping - Verify that Robottas is functional.' + '\n' +
                    'race ...  - Print the date, time, and location of the next F1 race.' + '\n' +
                    '\t' + 'next - Date and time of next race' + '\n' +
                    '\t' + 'last - Displays information from last race + '+ '\n' + 
                    '\t' + 'last detailed - Displays detailed information (Wall of text!)```');
            break;

            case 'ping':
                message.channel.send(message.author + ' Minimal Talking!');
            break;

            case 'race':
                if (command[1] === 'next') {
                    ergastRequest.nextRace().then((result) => {
                        let cd = utils.msConvert(result.raceDate - Date.now());
                        let dateAndTime = utils.formatDate(result.raceDate);
                        message.channel.send(
                            '```Race: ' + result.raceName + '\n' +
                            'Date: ' + dateAndTime.day + '\n' +
                            'Time: ' + dateAndTime.time + '\n' +
                            'Countdown: ' + cd.days + 'D : ' + cd.hours + 'H : ' + cd.minutes + 'M : ' + cd.seconds + 'S : ' + cd.milliseconds + 'Ms```'
                        )
                    });
                    logger.info('Call - http://ergast.com/api/f1/current/next.json');
                } else if (command[1] === 'last' && command[2] !== 'detailed') {
                    ergastRequest.lastRace().then((result) => {
                        let standings = '';

                        for (d in result.drivers) {
                            let driver = result.drivers[d].givenName + ' ' + result.drivers[d].familyName;
                            
                            let time = result.times[d];
                            let position = 1 + Number(d);

                            standings += position.toString().padEnd(2) + ': ' + driver.padEnd(20) + time + '\n';
                        }

                        message.channel.send(
                            '```Race: ' + result.raceName + '\n' + standings + '```'
                        )
                    });
                    logger.info('Call - http://ergast.com/api/f1/current/last.json');
                } else if (command[1] === 'last' && command[2] === 'detailed') {
                    
                }
            break;
            
            default:
                message.reply("Your command was not understood.");
        }
    }
});

client.login(auth.token);