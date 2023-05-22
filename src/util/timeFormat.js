const moment = require('moment');

const formatMilisseconds = (miliseconds) => moment.utc(miliseconds).format('HH:mm:ss:SSS');

module.exports = formatMilisseconds;