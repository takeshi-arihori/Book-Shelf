import mongoose from "mongoose";
import { Schema } from "mongoose";
const passportLocalMongoose = require('passport-local-mongoose');

// 認証機能途中
// 下記インストール済み
// "passport": "^0.6.0",
// "passport-local": "^1.0.0",
// "passport-local-mongoose": "^7.1.2",
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(passportLocalMongoose);

export default userSchema;