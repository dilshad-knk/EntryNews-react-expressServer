// getting-started.js
import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    createdAt: Date,
  });

  const User = mongoose.model('User', userSchema); //can pass 3rd parameter to pass exact collection name

  export default User