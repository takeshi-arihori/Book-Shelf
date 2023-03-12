import express from "express";
// // 飛んできたJSONをチェック
import { body } from "express-validator";
import { requestErrorHandler } from "../helpers/helper.mjs";
import { getAllBooks, getBookById, registBook, updateBook, deleteBook } from "../controllers/books.mjs";

// Routerを取得
const router = express.Router();


// 本の一覧を取得
router.get(
  '/',
  requestErrorHandler(getAllBooks)
);

// id検索
router.get(
  '/:id',
  requestErrorHandler(getBookById)
);

// POST
// 飛んできたタイトルの値が空でないか(1文字以上あるか)
router.post(
  '/',
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('comment').notEmpty(),
  body('rating').notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(registBook)
);

// validator.js
// https://github.com/validatorjs/validator.js

// 更新
router.patch(
  '/:id',
  body('title').optional().notEmpty(),
  body('description').optional().notEmpty(),
  body('comment').optional().notEmpty(),
  body('rating').optional().notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(updateBook)
);

// 削除
router.delete(
  '/:id',
  requestErrorHandler(deleteBook)
);

export default router;