import express from "express";
import Book from "../models/book.mjs";

// Routerを取得
const router = express.Router();

// /api/booksのPath
router.get('/', async (req, res) => {
  // 本の一覧を取得
  const books = await Book.find();
  res.json(books);
  res.send('/api/books');
});

export default router;