import express from 'express';
import cloudinary from '../lib/cloudinary.js';
import User from '../models/User.js';
import Book from '../models/Book.js';
import protectAuth from '../middleware/auth_middleware.js';

const router = express.Router();

router.post('/', protectAuth, async (req, res) => {
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

// get all books with pagination
router.get('/', protectAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profileImage');

    const total = await Book.countDocuments();

    res.status(200).json({
      success: true,
      books,
      currentPage: page,
      limit,
      totalBooks: total,
      totalPages: Math.ceil(total / limit), // ✅ FIXED
    });

  } catch (error) {
    console.log('Error to get all Books',error)
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

//delete route
router.delete('/:id', protectAuth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check ownership
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // ✅ Delete image from Cloudinary (safe extraction)
    if (book.image && book.image.includes('cloudinary')) {
      try {
        const parts = book.image.split('/');
        const fileName = parts.slice(-2).join('/'); // handles folders
        const publicId = fileName.split('.')[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('Cloudinary delete error:', err.message);
      }
    }

    // ✅ Delete from DB
    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Book and image deleted successfully',
    });

  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

// current login user book recomendation
router.get('/user', protectAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      books,
      currentPage: page,
      totalBooks: total,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;