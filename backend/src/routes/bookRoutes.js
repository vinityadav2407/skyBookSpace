import express from 'express';
import cloudinary from '../lib/cloudinary.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    // Validation
    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload image to Cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(image);

    // Create new book
    const newBook = new Book({
      title,
      caption,
      rating,
      image: cloudinaryRes.secure_url, // FIXED
      user: req.user?._id, // optional (if auth middleware is used)
    });

    // Save to DB
    await newBook.save();

    res.status(201).json(newBook);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;