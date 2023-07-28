const argon2 = require('argon2');

exports.encrypt = async (passowrd) => {
  return await argon2.hash(passowrd);
}

exports.verify = async (hashValue, passowrd) => {
  return await argon2.verify(hashValue, passowrd);
}