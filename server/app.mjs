import express from "express";
import env from "dotenv";
env.config();

import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";
import { ResultWithContext } from "express-validator/src/chain/context-runner-impl.js";

const app = express();
const port = process.env.port || 8080;

// JSONを受け取る
app.use(express.json());

// API
app.use('/api', apiRoutes);

app.use(function (err, req, res, next) {
  res.status(404).json({ msg: "Page Not Found" });
})

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: "不正なエラーが発生しました。" })
})

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
})