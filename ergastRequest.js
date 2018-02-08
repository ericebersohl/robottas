const fetch = require('node-fetch');

let ergastRequest = {
    nextRace: () => {
        return fetch('http://ergast.com/api/f1/current/next.json')
            .then((res) => { return res.json(); })
            .then((json) => {
                let path = json['MRData']['RaceTable']['Races'][0];
                return {
                    raceName: path['raceName'], 
                    raceDate: new Date(path['date'] + 'T' + path['time'])
                };
            }).catch((err) => {
                console.log(err);
            });
    },

    lastRace: () => {
        return fetch('http://ergast.com/api/f1/current/last/results.json')
            .then((res) => { return res.json(); })
            .then((json) => {
                let path = json['MRData']['RaceTable']['Races'][0];
                let drivers = [];
                let times = [];

                for (var i = 0; i < json['MRData']['RaceTable']['Races'][0]['Results'].length; i++) {
                    drivers[i] = path['Results'][i]['Driver'];

                    if (path['Results'][i]['Time']) {
                        times[i] = path['Results'][i]['Time']['time'];
                    } else {
                        times[i] = path['Results'][i]['status'];
                    }
                }
                
                return {
                    raceName: path['raceName'],
                    drivers: drivers,
                    times: times
                };
            }).catch((err) => {
                console.log(err);
            });
    }
};

module.exports = ergastRequest;