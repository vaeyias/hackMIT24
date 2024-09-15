const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const palaceSchema = new Schema({
    name: String,
    ObjectId: Schema.Types.ObjectId,
    icon: String,
    items: [
        {id: String, name:String, px: 0, py: 0, pz: 0, visibility:false, rx:0, ry:0, rz:0, text:String},
    ] 
});
  
// if exists, don't create again
const Palace = mongoose.models.Palace || model('Palace', sessionSchema);
export default Palace;