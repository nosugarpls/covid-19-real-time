const uuid = require('uuid').v4;

const sessions = {};

const isValidUsername = function( username ) {
  if(!username) {
    return false;
  }
  const cleanUsername = username.replace(/[^a-zA-Z0-9_-]/g, '');
  if(!username === cleanUsername 
    || !cleanUsername 
    || cleanUsername.toLowerCase() === 'dog') {
    return false;
  }
  return true;
};

const create = function({ username }) {
  if(!username) {
    return { error: 'username-required' };
  }
  if(!isValidUsername(username)) {
    return { error: 'username-invalid' };
  }
  const sid = uuid(); 
  sessions[sid] = username;
  return { sid };
};

const remove = function(sid) {
  delete sessions[sid];
};

const isValid = function(sid) {
  return sessions[sid];
};

module.exports = {
  details: sessions,
  create,
  remove,
  isValid,
};