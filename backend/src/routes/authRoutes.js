import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = userId => {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: '15d' });
};

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, profileImage } = req.body;

    // Check if any required data is missing
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Validate username
    if (username.trim().length < 3) {
      return res
        .status(400)
        .json({ message: 'Username must be at least 3 characters' });
    }

    // Validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if username already exists
    let existingUser = await User.findOne({ username: normalizedUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      profileImage: profileImage || '',
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
      message: 'Register Successful',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const loginValue = email.trim().toLowerCase();

    // Check user by email or username
    const user = await User.findOne({ email: loginValue }
    );

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;