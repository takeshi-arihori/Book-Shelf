import express from "express";
import Book from "../models/book.mjs";

// Routerを取得
const router = express.Router();

// 本の一覧を取得
router.get('/', async (req, res) => {
  // 降順で取得
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
  res.send('/api/books');
});

// id検索
router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  const book = await Book.find({ _id });
  res.json(book);
});

// 削除
router.delete('/:id', async (req, res) => {
  const _id = req.params.id;
  await Book.deleteOne({ _id });
  res.json({ "msg": "Delete succeeded." });
});

// POST
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  const newBook = await book.save();
  res.json(newBook);
});

// Update
router.patch('/:id', async (req, res) => {
  const { title, description, comment, rating } = req.body;
  const _id =req.params.id;
  const book = await Book.findById(_id);
  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  if (rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
});

export default router;