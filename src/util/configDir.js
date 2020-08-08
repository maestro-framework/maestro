const os = require('os');
const homedir = os.homedir();
const configDir = '.maestro';

module.exports = `${homedir}/${configDir}`;
