import express from "express";
import env from "dotenv";
env.config();

import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.port || 8080;

// JSONを受け取る
app.use(express.json());

// API
app.use('/api', apiRoutes);

app.use(function (req, res) {
  res.status(404).json({ msg: "Page Not Found" });
})

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
})