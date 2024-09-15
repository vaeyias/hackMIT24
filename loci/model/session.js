const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sessionSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    expires_at: {
        type: Date,
        required: true
    }
},
{ _id: false });
  
// if exists, don't create again
const Session = mongoose.models.Session || model('Session', sessionSchema);
export default Session;