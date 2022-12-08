const bcrypt = require('bcrypt');
const SALT_ROUND = 10;

const hashPW = async password => await bcrypt.hash(password, SALT_ROUND);

const isPwMatch = async (password, sPassword) => await bcrypt.compare(password, sPassword);

module.exports = {hashPW, isPwMatch};