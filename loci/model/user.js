const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    id: String, 
    palaces: [Schema.Types.ObjectId]
  });
  
// if exists, don't create again
const User = mongoose.models.User || model('User', userSchema);
export default User;