import express from "express";

// Routerを取得
const router = express.Router();

// /api/booksのPath
router.get('/', (req, res) => {
  // 本の一覧を返す
  res.send('/api/books');
});

export default router;