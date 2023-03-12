import { body, validationResult } from "express-validator";
import Book from "../models/book.mjs";

// 全件検索
async function getAllBooks(req, res) {
  // 降順で取得
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
}

// ID検索
async function getBookById(req, res) {
  const _id = req.params.id;
  const book = await Book.find({ _id });

  if (book === null) return res.status(404).json({ msg: 'Page Not Found' })
  res.json(book);
}

// POST
async function registBook(req, res) {
  // erorrが発生した場合
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    // そのまま返却すると200番台になるため、statusコードに400
    return res.status(400).json(errs);
  }
  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
};

// 更新
async function updateBook(req, res) {
  // erorrが発生した場合
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    // そのまま返却すると200番台になるため、statusコードに400
    return res.status(400).json(errs);
  }
  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);
  if (book === null) return res.status(404).json({ msg: 'Page Not Found' })

  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  if (rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
}

// 削除
async function deleteBook(req, res) {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });

  if (deletedCount === 0) return res.status(404).json({ msg: 'Target Book Not Found' })
  res.json({ "msg": "Delete succeeded." });
}

export {
  getAllBooks,
  getBookById,
  registBook,
  updateBook,
  deleteBook
};