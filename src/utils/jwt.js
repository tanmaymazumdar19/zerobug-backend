require("dotenv").config();
const jwt = require('jsonwebtoken');

class JSONWebToken {
  secret;
  expiresIn;

  constructor() {
    this.secret = process.env["JWT_SERCERT_KEY"];
    this.expiresIn = process.env["JWT_EXPIRES_IN"];
  }


  async generateAuthToken(payload) {
    return jwt.sign(payload, this.secret, {expiresIn: this.expiresIn});  
  }
}

module.exports = JSONWebToken;