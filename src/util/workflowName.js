// This gets the name of the current working directory and removes any preceding path
module.exports = process.cwd().replace(/\/.*\//, '');
