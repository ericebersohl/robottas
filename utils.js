let utils = {
    msConvert: (ms) => {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        return {
            days: days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
            milliseconds: ms % 1000
        }
    },
    formatDate: (date) => {
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let day = months[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear();
        let hours = date.getHours() > 9 ? '' + date.getHours() : '0' + date.getHours();
        let mins = date.getMinutes() > 9 ? '' + date.getMinutes() : '0' + date.getMinutes();

        return {
            day: day,
            time: hours + ':' + mins
        };
    }
};

module.exports = utils;