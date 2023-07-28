const jwt = require('jsonwebtoken');
const AdminService = require('../../services/admin.service');

const adminService = new AdminService();

async function adminAuthMiddleware(req, res, next) {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error('Unauthorized. Missing token.');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1]; // Remove 'Bearer ' from the Authorization header

    try {
      const payload = await jwt.verify(token, process.env.JWT_SERCERT_KEY);
      
      // Check if user is an admin
      await adminService.getAdminByEmail(payload?.email);

      // Token is valid, add the user payload to the request object
      req.user = payload;

      // Proceed to the next middleware
      next();
    } catch (err) {
      // Token verification failed or admin not found
      const error = new Error('Invalid or expired token.');
      error.statusCode = 403;
      throw error;
    }
  } catch(err) {
    next(err)
  }
}

module.exports = adminAuthMiddleware;