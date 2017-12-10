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
    }
};

module.exports = ergastRequest;