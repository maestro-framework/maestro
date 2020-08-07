const cwd = process.cwd();
const cwdBasename = cwd.replace(/\/.*\//, "");
const cleanedCwdBasename = cwdBasename.replace(/\W/g, "-");

module.exports = cleanedCwdBasename;
