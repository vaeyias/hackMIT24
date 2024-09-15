const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const palaceSchema = new Schema({
    name: String,
    ObjectId: Schema.Types.ObjectId,
    icon: String,
    items: [
        {id: String, x: 0, y: 0, z: 0, visibility:false},
    ] 
});
  
// if exists, don't create again
const Palace = mongoose.models.Palace || model('Palace', sessionSchema);
export default Palace;