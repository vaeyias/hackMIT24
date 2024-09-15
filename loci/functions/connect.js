'use server';
import mongoose from "mongoose";

const connect = async function(){await mongoose.connect("mongodb+srv://jocelynz4890:" + process.env.mongodbkey + "@loci.xmsie.mongodb.net/");}
export default connect;