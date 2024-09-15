const { mongodbkey } = require('./config.json');

const mongoose = require('mongoose');

const connect = async function(){await mongoose.connect("mongodb+srv://jocelynz4890:" + mongodbkey + "@loci.xmsie.mongodb.net/");}
module.exports = { connect };