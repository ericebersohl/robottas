const fetch = require('node-fetch');

let ergastRequest = {
    next: function(session) {
        fetch('http://ergast.com/api/f1/current/next.json')
            .then(function(res) {
                return res.json();
            }).then(function(json) {
                console.log(json['MRData']['RaceTable']);
            }).catch(function(err) {
                console.log(err);
            });
    }
};

module.exports = ergastRequest;