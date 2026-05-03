import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // FIXED
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // FIXED
      ref: 'User',
    },
  },
  { timestamps: true } // FIXED
);


const Book = mongoose.model('Book', bookSchema);

export default Book;