import mongoose from "mongoose";
import env from "dotenv";
env.config();

// mongooseに接続するための処理
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

