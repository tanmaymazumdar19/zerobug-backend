const Admin = require('../models/admin');
const { verify } = require('../utils/argon');
const JWT = require('../utils/jwt')

const jwt = new JWT();

class AdminService {
  async login(email, password) {
    if(!email) {
      const error = new Error('email must be provided');
      error.statusCode = 400;
      throw error;
    }

    if(!password) {
      const error = new Error('password must be provided');
      error.statusCode = 400;
      throw error;
    }

    const admin = await Admin.findOne({
      email
    });

    if(!admin) {
      const error = new Error('incorrect email');
      error.statusCode = 401;
      throw error;
    }
    
    if(!await verify(admin?.password, password)) {
      const error = new Error('incorrect password');
      error.statusCode = 401;
      throw error;
    }

    const authToken = await jwt.generateAuthToken({email: admin?.email});

    return {
      authToken
    };
  }
}

module.exports = AdminService;