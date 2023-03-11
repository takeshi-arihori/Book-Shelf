import express from "express";
import apiRoutes from "./server/api-routes/index.mjs";
import env from "dotenv";
import "./server/helpers/db.mjs";
env.config();

const app = express();
const port = process.env.port || 8080;

// JSONを受け取る
app.use(express.json());

// API
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
})