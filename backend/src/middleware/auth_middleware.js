import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

const protectAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Format: "Bearer token"
    const actualToken = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;

    // Verify token
    const decodedToken = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Get user from DB (excluding password)
    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protectAuth;