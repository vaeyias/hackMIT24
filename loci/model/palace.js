const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const palaceSchema = new Schema({
    items: [
        {id: String, x: number, y: number, z: number, visibility:false},
    ] 
},
{ _id: false });
  
// if exists, don't create again
const Palace = mongoose.models.Palace || model('Palace', sessionSchema);
export default Palace;